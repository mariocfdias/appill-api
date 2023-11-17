export interface DrugInteractionDto {
    nlmDisclaimer: string
    interactionTypeGroup: InteractionTypeGroup[]
  }
  
  export interface InteractionTypeGroup {
    sourceDisclaimer: string
    sourceName: string
    interactionType: InteractionType[]
  }
  
  export interface InteractionType {
    comment: string
    minConceptItem: MinConceptItem
    interactionPair: InteractionPair[]
  }
  
  export interface MinConceptItem {
    rxcui: string
    name: string
    tty: string
  }
  
  export interface InteractionPair {
    interactionConcept: InteractionConcept[]
    severity: string
    description: string
  }
  
  export interface InteractionConcept {
    minConceptItem: MinConceptItem2
    sourceConceptItem: SourceConceptItem
  }
  
  export interface MinConceptItem2 {
    rxcui: string
    name: string
    tty: string
  }
  
  export interface SourceConceptItem {
    id: string
    name: string
    url: string
  }
  