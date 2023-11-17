import { BadRequestException, HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateMedicationDTO } from './dto/create-medication.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import { UpdatePatchMedicationDTO } from './dto/update-patch-medication';
import { GetMedicationDTO } from './dto/get-medication.dto';
import { RxnormService } from 'src/rxnorm/rxnorm.service';
@Injectable()
export class MedicationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly rxNormService : RxnormService
    ) {}

    private readonly logger = new Logger()

  async create(
    {
      unitType,
      frequency,
      observation,
      stock,
      doses,
      until,
      name,
      rxid,
    }: CreateMedicationDTO,
    userId,
  ) {
    
    const dosesArrayDTO = [];
    const startDate = new Date();
    const endDate = new Date(until);

    const expectedRxnormMed = await this.rxNormService.getRxNormDrugName(rxid)
    console.log(expectedRxnormMed.idGroup.name)

    this.logger.debug(expectedRxnormMed)
    
    if(expectedRxnormMed?.idGroup?.name == undefined){
      throw new HttpException("Não foi encontrado medicamento com esse RXID", HttpStatus.PRECONDITION_FAILED, { cause: new Error("Não foi encontrado medicamento com esse RXID")})
    }

    while (startDate <= endDate) {
      doses.forEach((dose) => {
        const doseTime = new Date(dose.time);
        const time = startDate.setUTCHours(
          doseTime.getUTCHours(),
          doseTime.getUTCMinutes(),
          doseTime.getUTCSeconds(),
          doseTime.getUTCMilliseconds(),
        );

        dosesArrayDTO.push({
          quantity: dose.quantity,
          time,
          id: uuidv4(),
        });
      });
      startDate.setDate(startDate.getDate() + 1);
    }

    return await this.prisma.medication.create({
      data: {
        id: uuidv4(),
        unitType,
        frequency: frequency.toLocaleString(),
        observation,
        stock,
        pacientId: userId,
        name,
        drugName: expectedRxnormMed.idGroup.name,
        rxid,
        doses: {
          create: [
            ...dosesArrayDTO.map((dose) => {
              return {
                quantity: dose.quantity,
                time: new Date(dose.time),
                id: uuidv4(),
              };
            }),
          ],
        },
        directives: {
          create: [
            ...doses.map((dose) => {
              return {
                quantity: dose.quantity,
                time: new Date(dose.time),
                id: uuidv4(),
              };
            }),
          ],
        },
        until: new Date(until),
      },
    });
  }

  async exists(id: string) {
    const medication = await this.prisma.medication.findUnique({
      where: { id },
    });

    if (medication) return true;

    return false;
  }

  async getAll() {
    return await this.prisma.medication.findMany({
      include: {
        doses: true,
        pacient: true,
      },
    });
  }

  async deleteById(id: string) {
    const exists = await this.exists(id);
    if (!exists)
      throw new BadRequestException(`Medicação ${id} não encontrada`);

    return await this.prisma.medication.delete({
      where: {
        id,
      },
    });
  }

  async getByUserId(userId: string, getMedicationOptions: GetMedicationDTO) {
    const { isActive, date, name } = getMedicationOptions;

    return await this.prisma.medication.findMany({
      include: {
        directives: true,
        doses: true,
      },
      where: {
        pacientId: userId,
        name: {
          contains: name,
        },
        active: isActive == undefined ? undefined : isActive === 'true',
        AND: {
          until: {
            gte: date && new Date(date),
          },
          createdAt: {
            lte: date && new Date(date),
          },
        },
      },
    });
  }

  
  async getInteractions(userId: string) {

    const medicamentList =  await this.prisma.medication.findMany({
      where: {
        pacientId: userId,
      },
    });

    const rxNormIdList = medicamentList.map(medicament => medicament.rxid)

    const interactionList = await this.rxNormService.getRxNormDrugInteractionByList(rxNormIdList)
    
    const parsedInteractions = []



    interactionList.fullInteractionTypeGroup.forEach(fullInteractionType => fullInteractionType.fullInteractionType.forEach(interactionType => interactionType.interactionPair.forEach(pair => {
      if(parsedInteractions.filter(interaction => interaction.description == pair.description).length == 0) parsedInteractions.push({severity: pair.severity, description: pair.description})
    }))
      )


    return parsedInteractions
  }

  async update(id: string, data: UpdatePatchMedicationDTO) {
    const { name, frequency, observation, stock, unitType, until, active } =
      data;
    return await this.prisma.medication.update({
      data: { name, observation, stock, unitType, until, active },
      where: { id },
    });
  }
}
