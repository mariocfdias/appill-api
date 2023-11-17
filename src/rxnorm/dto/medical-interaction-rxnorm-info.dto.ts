export interface DrugInteractionInterface {
    nlmDisclaimer: string
    fullInteractionTypeGroup: FullInteractionTypeGroup[]
  }
  
  export interface FullInteractionTypeGroup {
    sourceDisclaimer: string
    sourceName: string
    fullInteractionType: FullInteractionType[]
  }
  
  export interface FullInteractionType {
    comment: string
    minConcept: MinConcept[]
    interactionPair: InteractionPair[]
  }
  
  export interface MinConcept {
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
    minConceptItem: MinConceptItem
    sourceConceptItem: SourceConceptItem
  }
  
  export interface MinConceptItem {
    rxcui: string
    name: string
    tty: string
  }
  
  export interface SourceConceptItem {
    id: string
    name: string
    url: string
  }
  