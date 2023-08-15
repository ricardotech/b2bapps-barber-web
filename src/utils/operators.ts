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

export function pesquisarService(
  searchTerm: string,
  data: ServiceType[]
): ServiceType[] {
  const lowerCaseSearchTerm = removeAcentos(searchTerm.toLowerCase()).trim();

  return data.filter((service) => {
    const lowerCaseNome = removeAcentos(String(service.name).toLowerCase());

    return lowerCaseNome.includes(lowerCaseSearchTerm);
  });
}
