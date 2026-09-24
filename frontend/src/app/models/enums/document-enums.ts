export enum documentStatus {
    ACTIVE= 'Ativo',
    EXPIRED= 'Expirado',
    PENDING= 'Pendente',
    CANCELLED= 'Cancelado',
}

export enum documentType {
    HEALTH_INSURANCE= 'Seguro de vida',
    SUS_CARD= 'Cartão SUS',
    DENTAL_PLAN= 'Plano Odontológico',
    VACCINATION_CARD= 'Cartão de Vacinação',
    DONOR_CARD= 'Carteira de Doador',
}

export enum documentTypeColor {
  'Seguro de vida' = '#2A9D8F',
  'Cartão SUS' = '#E76F51',
  'Plano Odontológico' = '#4EA8DE',
  'Cartão de Vacinação' = '#E9C46A',
  'Carteira de Doador' = '#D62828',
}