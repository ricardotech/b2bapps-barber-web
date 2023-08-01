export const barbearia: {
  _id: string;
  _id_gestor: string;
  plano: string;
  nome: string;
  nomeFantasia: string;
  documento: string;
  endereco: {
    cep: string;
    rua: string;
    numero: string;
    bairro: string;
    cidade: string;
    estado: string;
    _id: string;
  };
  logo: any;
  slogan: any;
  expediente: {
    dia: number;
    horarioInicio: string;
    horarioFim: string;
    _id: string;
  }[];
  sobre: string;
  contato: {
    telefone: string;
    email: string;
    whatsapp: any;
    facebook: any;
    instagram: any;
    _id: string;
  };
  status: boolean;
  __v: number;
} = {
  _id: "64c7ff9711625d4f5b10463e",
  _id_gestor: "64c3f588853b6c3384ae88d6",
  plano: "Barber_Pro",
  nome: "Barbearia de Teste nº 1",
  nomeFantasia: "Barbearia de Teste",
  documento: "00000000000",
  endereco: {
    cep: "00000000",
    rua: "Rua teste",
    numero: "S/N",
    bairro: "Centro",
    cidade: "Goiânia",
    estado: "GO",
    _id: "64c7ff9711625d4f5b10463f",
  },
  logo: null,
  slogan: null,
  expediente: [
    {
      dia: 1,
      horarioInicio: "2023-07-28T11:00:00.000Z",
      horarioFim: "2023-07-29T01:30:00.000Z",
      _id: "64c7ff9711625d4f5b104640",
    },
    {
      dia: 2,
      horarioInicio: "2023-07-28T11:00:00.000Z",
      horarioFim: "2023-07-29T01:30:00.000Z",
      _id: "64c7ff9711625d4f5b104641",
    },
  ],
  sobre: "Sobre qualquer para teste",
  contato: {
    telefone: "22222222222",
    email: "barbearia.teste@dominio.com",
    whatsapp: null,
    facebook: null,
    instagram: null,
    _id: "64c7ff9711625d4f5b104642",
  },
  status: true,
  __v: 0,
};
