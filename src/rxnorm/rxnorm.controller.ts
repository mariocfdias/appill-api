import { Controller, Get, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { RxnormService } from "./rxnorm.service";

@ApiTags('RxNorm')
@ApiBearerAuth()
@Controller('rxnorm')
export class RxNormController {
  constructor(private readonly rxnormService: RxnormService) {}
  
  @Get('RxcuiByName')
  async getByName(@Query('name') name: string) {
    return this.rxnormService.getRxNormRxcuiByName(name);
  }

  @Get('DrugNameById')
  async getById(@Query('id') id: string) {
    return this.rxnormService.getRxNormDrugName(id);
  }

  @Get('DrugSpellingSugestionByName')
  async getSpellingSugestion(@Query('name') name: string) {
    return this.rxnormService.getRxNormSpellingSugestion(name);
  }

  @Get('DrugInteractionByRxId')
  async getDrugInteraction(@Query('rxid') id: string) {
    return this.rxnormService.getRxNormDrugInteraction(id);
  }

  
}