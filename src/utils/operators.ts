import { ServiceType } from "@/types";
import React from "react";
import { useMediaQuery } from "react-responsive";

export function MediaQuery(): {
  mobile: boolean;
  tablet: boolean;
  desktop: boolean;
} {
  const [mobile, setMobile] = React.useState<boolean>(false);
  const [tablet, setTablet] = React.useState<boolean>(false);
  const [desktop, setDesktop] = React.useState<boolean>(false);

  const a = useMediaQuery({ query: "(min-width: 1224px)" });
  const b = useMediaQuery({
    query: "(min-width: 600px) and (max-width: 1224px)",
  });
  const c = useMediaQuery({ query: "(max-width: 600px)" });

  React.useEffect(() => {
    if (a) {
      setDesktop(true);
      setTablet(false);
      setMobile(false);
    }
    if (b) {
      setTablet(true);
      setMobile(false);
      setDesktop(false);
    }
    if (c) {
      setMobile(true);
      setDesktop(false);
      setTablet(false);
    }
  }, [a, b, c]);

  return { mobile, tablet, desktop };
}

export function removeAcentos(texto: string): string {
  const acentos: any = {
    a: "[àáâãäå]",
    ae: "æ",
    c: "ç",
    e: "[èéêë]",
    i: "[ìíîï]",
    n: "ñ",
    o: "[òóôõö]",
    oe: "œ",
    u: "[ùúûűü]",
    y: "[ýÿ]",
  };
  let resultado = texto;
  for (let letra in acentos) {
    const expressaoRegular = new RegExp(acentos[letra], "g");
    resultado = resultado.replace(expressaoRegular, letra);
  }
  return resultado;
}

export function pesquisarName(searchTerm: string, data: any[]): any[] {
  const lowerCaseSearchTerm = removeAcentos(searchTerm.toLowerCase()).trim();

  return data.filter((service) => {
    const lowerCaseNome = removeAcentos(String(service.name).toLowerCase());

    return lowerCaseNome.includes(lowerCaseSearchTerm);
  });
}

export const monthsOfTheYear = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];
export const fullMonthsOfTheYear = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

export const daysOfTheWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

export function generateAvailableDates(baseDates: Date[], occupiedDates: Date[]) {
  const availableDates = [];
  const openingTime = new Date("2023-08-15T07:00:00.000Z");
  const closingTime = new Date("2023-08-15T19:00:00.000Z");
  const interval = 30 * 60 * 1000; // Intervalo de 30 minutos em milissegundos

  for (let currentTime = openingTime; currentTime < closingTime; currentTime = new Date(currentTime.getTime() + interval)) {
    let isOccupied = false;

    // Verifica se o horário atual está ocupado
    for (const occupiedDate of occupiedDates) {
      if (currentTime.getTime() === occupiedDate.getTime()) {
        isOccupied = true;
        break;
      }
    }

    if (!isOccupied) {
      availableDates.push(new Date(currentTime));
    }
  }

  return availableDates;
}