import { Inject, Injectable, Logger } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { Cache } from 'cache-manager';
import { RxNormMedicationInterface } from './dto/RxNormMedicationInterface';
import { DrugInteractionInterface } from './dto/medical-interaction-rxnorm-info.dto';
import { DrugInteractionDto } from './dto/rxnorm-drug-interaction.dto';

@Injectable()
export class RxnormService {
    
    constructor(
        private readonly httpService: HttpService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        ) {}

        private readonly logger = new Logger(RxnormService.name)

        async getRxNormRxcuiByName (name : String): Promise<any> {

            const key = `rxnorm-getRxNormRxcuiByName-${name}`
            const url = `https://rxnav.nlm.nih.gov/REST/rxcui.json?name=${name}&search=1`

            const cachedValue = await this.cacheManager.get(key);

            if(cachedValue){
                this.logger.log(`GET FROM CACHE ${key} : ${cachedValue}`)
                return cachedValue
            }


            const response = await lastValueFrom(this.httpService.get(url))

            if(response.status == 200){
                await this.cacheManager.set(key, response.data);
            }

            console.log(response.data)

            return response.data
        }

        async getRxNormSpellingSugestion(actualText: String) : Promise<any> {

            const key = `rxnorm-getRxNormSpellingSugestion-${actualText}`

            const url = `https://rxnav.nlm.nih.gov/REST/spellingsuggestions?name=${actualText}`

            
            const cachedValue = await this.cacheManager.get(key);

            if(cachedValue){
                this.logger.log(`GET FROM CACHE ${key} : ${cachedValue}`)
                return cachedValue
            }


            const response = await lastValueFrom(this.httpService.get(url))

            
            if(response.status == 200){
                await this.cacheManager.set(key, response.data);
            }

            console.log(response.data)

            return response.data
        } 

        async getRxNormDrugInteraction (rxnormId: String): Promise<any> {

            const key = `rxnorm-getRxNormDrugInteraction-${rxnormId}`

            const url = `https://rxnav.nlm.nih.gov/REST/interaction/interaction.json?rxcui=${rxnormId}&sources=DrugBank`

            
            const cachedValue = await this.cacheManager.get(key);

            if(cachedValue){
                this.logger.log(`GET FROM CACHE ${key} : ${cachedValue}`)
                return cachedValue
            }



            const response = await lastValueFrom(this.httpService.get(url))


            const medicalInteractions : DrugInteractionDto = response.data

            const interactonArray = []


            medicalInteractions.interactionTypeGroup.forEach(fullTypeGroup => fullTypeGroup.interactionType.forEach(interactionType => interactionType.interactionPair.forEach(pair =>  {
                interactonArray.push({
                    description: pair.description,
                    severity: pair.severity
                })
            })))

            
            if(response.status == 200){
                await this.cacheManager.set(key, interactonArray);
            }

            return interactonArray
        }

        async getRxNormDrugInteractionByList (rxnormIdList : String[]): Promise<DrugInteractionInterface> {

            const key = `rxnorm-getRxNormDrugInteractionByList-${rxnormIdList.reduce((acc, val) => acc + `+${val}`)}`
       
            const url = `https://rxnav.nlm.nih.gov/REST/interaction/list.json?rxcuis=${rxnormIdList.reduce((acc, val) => acc + `+${val}`)}`

            
            const cachedValue = await this.cacheManager.get(key);

            if(cachedValue){
                this.logger.log(`GET FROM CACHE ${key} : ${cachedValue}`)
                return cachedValue
            }

            const response = await lastValueFrom(this.httpService.get(url))

            if(response.status == 200){
                await this.cacheManager.set(key, response.data);
            }

            console.log(response.data)

            return response.data
        }

        async getRxNormDrugName (rxcui : String): Promise<RxNormMedicationInterface> {

            const key = `rxnorm-getRxNormDrugName-${rxcui}`
            const url = `https://rxnav.nlm.nih.gov/REST/rxcui/${rxcui}`
            
            const cachedValue = await this.cacheManager.get(key);

            if(cachedValue){
                this.logger.log(`GET FROM CACHE ${key} : ${cachedValue}`)
                return cachedValue
            }



            const response = await lastValueFrom(this.httpService.get(url))

            
            if(response.status == 200){
                await this.cacheManager.set(key, response.data);
            }

            console.log(response.data)

            return response.data
        }

}
