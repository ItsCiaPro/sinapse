import { Injectable } from '@angular/core';
import { filtros } from '../../models/enums/filters';
import { documentStatus, documentType } from '../enums/document-enums';

@Injectable({
    providedIn: 'root'
})
export class Data {
    private readonly history = [

        {
            type: filtros.consulta,
            title: 'Avaliação de rotina',
            description: 'Dra. Camila Rocha - Clinica Vital',
            date: '12 Mar. 2026',
            isOpen: false,

            detail: [
                {
                    name: 'Localização',
                    content: 'Clinica Vital - Unidade Pinheiros',
                },
                {
                    name: 'Descrição',
                    content: 'Pressão arterial controlada. Manter medicação e retornar em 90 dias com exames de rotina.'
                }
            ],

            attatchments: [
                { title: 'avaliação-helena.pdf', type: 'pdf' }
            ],

        },

        {
            type: filtros.prescricao,
            title: 'Losartana 50mg - 1x/dia',
            description: 'Dra. Camila Rocha - 30 dias',
            date: '02 Fev. 2026',
            isOpen: false,

            detail: [
                {
                    name: 'Descrição',
                    content: 'Tomar pela manhã em jejum. Renovação sujeita a nova avaliação.'
                }
            ],

            attatchments: [
            ],

        },

        {
            type: filtros.cirurgia,
            title: 'Apendicectomia',
            description: 'Dra. Camila Rocha',
            date: '30 Out. 2026',
            isOpen: false,

            detail: [
                {
                    name: 'Cuidados Antes',
                    content: 'Jejum absoluto 8 horas antes'
                },
                {
                    name: 'Cuidados Após',
                    content: 'Evitar esforço físico, alimentação leve'
                },
                {
                    name: 'Prescrições',
                    content: 'Analgésicos e anti-inflamatórios'
                }
            ],

            attatchments: [
            ],

        },

    ];

    private readonly documents = [
        {
            documentType: documentType.HEALTH_INSURANCE,
            status: documentStatus.ACTIVE,
            issuer: {
                name: "Bradesco Saúde"
            },
            holder: {
                fullName: "Helena Duarte"
            },
            cardDetails: {
                cardNumber: "852.190.432109.008",
                planName: "Top Nacional R1",
                planType: "Particular",
                expirationDate: "2028-12",
                accommodations: "Apartamento"
            }
        },
        {
            documentType: documentType.SUS_CARD,
            status: documentStatus.ACTIVE,
            issuer: {
                name: "Ministério da Saúde"
            },
            holder: {
                fullName: "Helena Duarte",
                cns: "709204812340005"
            },
            cardDetails: {
                cardNumber: "709204812340005",
                planName: "Sistema Único de Saúde",
                planType: "Público",
                expirationDate: "Indeterminado",
                accommodations: "Enfermaria (SUS)"
            }
        },
        {
            documentType: documentType.DENTAL_PLAN,
            status: documentStatus.ACTIVE,
            issuer: {
                name: "Amil Dental"
            },
            holder: {
                fullName: "Helena Duarte"
            },
            cardDetails: {
                cardNumber: "981.234.567890.001",
                planName: "Dental Win Orto",
                planType: "Individual",
                expirationDate: "2027-06",
                accommodations: "Não Aplicável"
            }
        },
        {
            documentType: documentType.VACCINATION_CARD,
            status: documentStatus.ACTIVE,
            issuer: {
                name: "Secretaria Municipal de Saúde (ConecteSUS)"
            },
            holder: {
                fullName: "Helena Duarte"
            },
            cardDetails: {
                cardNumber: "123.456.789-00",
                planName: "Carteira Nacional de Vacinação",
                planType: "Público / Pessoal",
                expirationDate: "Indeterminado",
                accommodations: "Não Aplicável"
            }
        },
        {
            documentType: documentType.DONOR_CARD,
            status: documentStatus.ACTIVE,
            issuer: {
                name: "HEMOBA - Fundação Hemocentro"
            },
            holder: {
                fullName: "Helena Duarte"
            },
            cardDetails: {
                cardNumber: "DON-2026-99412",
                planName: "Doador Voluntário de Sangue (O+)",
                planType: "Voluntário",
                expirationDate: "Indeterminado",
                accommodations: "Não Aplicável"
            }
        }
    ];

    get getHistory() {
        return this.history;
    }

    get getDocuments() {
        return this.documents;
    }
}
