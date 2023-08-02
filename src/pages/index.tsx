import { barbearia } from "@/utils/data";
import { MediaQuery } from "@/utils/operators";
import {
  Avatar,
  Flex,
  Icon,
  Image,
  Input,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { MdArrowBack, MdMenu } from "react-icons/md";
import { GiMustache } from "react-icons/gi";

export default function Home() {
  const { mobile, desktop } = MediaQuery();

  const [step, setStep] = useState<"home" | "service">("home");

  function Header() {
    return (
      <Flex p="20px" w="100%">
        <Flex
          mx="auto"
          borderRadius={8}
          bg="#222"
          h="70px"
          w="100%"
          justify="space-between"
          px="20px"
          align="center"
        >
          <Flex align="center">
            {/* {mobile && (
              <Icon mr="10px" as={MdMenu} color="#FFF" fontSize="1.8rem" />
            )} */}
            <Text color="white" fontFamily="Poppins" fontSize="1.4rem">
              {barbearia.nomeFantasia}
            </Text>
          </Flex>
          {!mobile && (
            <Flex
              bg="#333"
              justify="center"
              align="center"
              borderRadius={8}
              h="40px"
              px="20px"
            >
              <Text
                color="#FFF"
                fontWeight={200}
                fontSize="1rem"
                fontFamily="Poppins"
              >
                Meus agendamentos
              </Text>
            </Flex>
          )}
        </Flex>
      </Flex>
    );
  }

  function Schedule() {
    return (
      <Flex pt="0px !important" p="20px" w="100%">
        <Flex w="100%" bg="#222" borderRadius={8} p="20px">
          <Text color="#FFF" fontFamily="Poppins" fontSize="1.4rem">
            Realizar novo agendamento
          </Text>
        </Flex>
      </Flex>
    );
  }

  function SelectService() {
    function Service({
      name,
      price,
      image,
    }: {
      name: string;
      price: number;
      image?: string;
    }) {
      return (
        <Flex
          cursor="pointer"
          boxShadow="rgba(0, 0, 0, 0.1) 0 0 10px"
          p="10px"
          borderRadius={20}
          justify="space-between"
          w="100%"
          align="center"
        >
          <Flex align="center">
            <Avatar name={name} borderRadius={20} mr="10px" />
            <Flex flexDir="column">
              <Text color="#000" fontFamily="Poppins" fontWeight="bold">
                {name}
              </Text>
              <Text
                color="#000"
                fontFamily="Poppins"
                fontSize="0.8rem"
                fontWeight="300"
              >
                {price.toLocaleString("pt-BR", {
                  currency: "BRL",
                  style: "currency",
                })}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      );
    }

    return (
      <SimpleGrid
        maxH="42vh"
        overflowY="scroll"
        gridGap="10px"
        columns={[1, 1, 2]}
        px="5px"
        py="10px"
        my="15px"
        mb="20px"
      >
        <Service name="Corte de cabelo" price={35} />
        <Service name="Barba" price={15} />
        <Service name="Corte + Barba" price={50} />
        <Service name="Penteado" price={15} />
        <Service name="Sobrancelha" price={15} />
        <Service name="Alisamento" price={15} />
        <Service name="Tratamento de barba" price={15} />
        <Service name="Micro-pigmentação" price={15} />
        <Service name="Corte Razor" price={15} />
      </SimpleGrid>
    );
  }

  const mobileHeight = step === "home" ? "60%" : "60%";

  return (
    <>
      {mobile ? (
        <Flex flexDir="column" bg="#FFF" h="100vh" w="100%">
          <Flex flexDir="column" bg="#111" h="100vh" w="100%" mx="auto">
            <Image
              bg="#000"
              opacity={0.6}
              h={mobile ? mobileHeight : "80vh"}
              w="100%"
              src="https://images.pexels.com/photos/1319458/pexels-photo-1319458.jpeg?cs=srgb&dl=pexels-nikolaos-dimou-1319458.jpg&fm=jpg"
              objectFit="cover"
            />
            <Flex
              p="20px"
              zIndex={2}
              flexDir="column"
              justify="space-between"
              mt="-20px"
              pt="20px"
              bg="#FFF"
              h="100%"
              borderTopRadius="20"
            >
              {step === "home" && (
                <>
                  <Flex flexDir="column">
                    <Icon
                      as={GiMustache}
                      color="#000"
                      fontSize="1.5rem"
                      mx="auto"
                    />
                    <Text
                      color="#000"
                      fontFamily="Poppins"
                      w="100%"
                      textAlign="center"
                      fontSize="1.4rem"
                      borderBottom="1px solid #DDD"
                      pb="20px"
                    >
                      {barbearia.nomeFantasia}
                    </Text>
                  </Flex>
                  <Flex flexDir="column">
                    <Text
                      style={{
                        marginTop: "20px",
                        color: "#000",
                        fontSize: mobile ? "2rem" : "2.6rem",
                        textAlign: "center",
                        width: "100%",
                      }}
                    >
                      Olá 👋
                    </Text>
                    <Text
                      style={{
                        color: "#333",
                        fontSize: mobile ? "1rem" : "1.3rem",
                        fontFamily: "Poppins",
                        fontWeight: 300,
                        textAlign: "center",
                        width: "100%",
                      }}
                    >
                      Pronto para agendar um horário?
                    </Text>
                  </Flex>
                  <Flex flexDir="column">
                    <Flex
                      onClick={() => setStep("service")}
                      cursor="pointer"
                      bg="#333"
                      justify="center"
                      align="center"
                      borderRadius={8}
                      h="40px"
                      px="20px"
                    >
                      <Text
                        color="#FFF"
                        fontWeight={200}
                        fontSize="1rem"
                        fontFamily="Poppins"
                      >
                        Novo agendamento
                      </Text>
                    </Flex>
                    <Flex
                      cursor="pointer"
                      mt="10px"
                      bg="transparent"
                      justify="center"
                      align="center"
                      borderRadius={8}
                      h="40px"
                      px="20px"
                    >
                      <Text
                        textDecorationLine="underline"
                        color="#333"
                        fontWeight={200}
                        fontSize="1rem"
                        fontFamily="Poppins"
                      >
                        Meus agendamentos
                      </Text>
                    </Flex>
                    <Text
                      borderTop="1px solid #EEE"
                      mt="20px"
                      pt="20px"
                      color="#333"
                      w="100%"
                      textAlign="center"
                      fontWeight={200}
                      fontSize="1rem"
                      fontFamily="Poppins"
                    >
                      Desenvolvido por B2B Apps Ltda
                    </Text>
                  </Flex>
                </>
              )}
              {step === "service" && (
                <Flex
                  zIndex={2}
                  flexDir="column"
                  h="100%"
                  justify="space-between"
                  bg="#FFF"
                  w="100%"
                  borderRadius="20"
                >
                  <Flex flexDir="column">
                    <Icon
                      cursor="pointer"
                      onClick={() => setStep("home")}
                      as={MdArrowBack}
                      color="#000"
                      fontSize="2rem"
                      mb="10px"
                    />
                    <Text
                      style={{
                        color: "#333",
                        fontSize: mobile ? "1rem" : "1.3rem",
                        fontFamily: "Poppins",
                        fontWeight: 300,
                      }}
                    >
                      Escolha uma opção
                    </Text>
                    <Input
                      mt="10px"
                      _active={{
                        border: "1px solid #BBB",
                        boxShadow: "none !important",
                        outline: "none !important",
                      }}
                      _focus={{
                        border: "1px solid #BBB",
                        boxShadow: "none !important",
                        outline: "none !important",
                      }}
                      _hover={{
                        border: "1px solid #BBB",
                        boxShadow: "none !important",
                        outline: "none !important",
                      }}
                      border="1px solid #BBB"
                      placeholder="Buscar"
                      color="#000"
                      w="100%"
                      h="45px"
                      borderRadius={10}
                    />
                  </Flex>
                  <SelectService />
                  <Flex flexDir="column">
                    <Flex
                      onClick={() => setStep("service")}
                      cursor="pointer"
                      bg="#333"
                      justify="center"
                      align="center"
                      borderRadius={8}
                      h="40px"
                    >
                      <Text
                        color="#FFF"
                        fontWeight={200}
                        fontSize="1rem"
                        fontFamily="Poppins"
                      >
                        Novo agendamento
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
              )}
            </Flex>
          </Flex>
        </Flex>
      ) : (
        <Flex flexDir="column" bg="#111" h="100vh" w="100%">
          <Flex flexDir="column" bg="#111" h="100vh" w="100%" mx="auto">
            <Image
              bg="#000"
              opacity={0.6}
              h="100vh"
              w="100%"
              src="https://images.pexels.com/photos/1319458/pexels-photo-1319458.jpeg?cs=srgb&dl=pexels-nikolaos-dimou-1319458.jpg&fm=jpg"
              objectFit="cover"
            />
            <Flex
              h="100vh"
              w="100%"
              justify="center"
              align="center"
              position="absolute"
            >
              {step === "home" && (
                <Flex
                  bg="#FFF"
                  flexDir="column"
                  w="100%"
                  p="20px"
                  borderRadius={20}
                  maxW={desktop ? "650px" : "500px"}
                >
                  <Flex flexDir="column">
                    <Icon
                      as={GiMustache}
                      color="#000"
                      fontSize="1.5rem"
                      mx="auto"
                    />
                    <Text
                      color="#000"
                      fontFamily="Poppins"
                      w="100%"
                      textAlign="center"
                      fontSize="1.4rem"
                      borderBottom="1px solid #DDD"
                      pb="20px"
                    >
                      {barbearia.nomeFantasia}
                    </Text>
                  </Flex>
                  <Flex my="40px" flexDir="column">
                    <Text
                      style={{
                        marginTop: "20px",
                        color: "#000",
                        fontSize: mobile ? "2rem" : "2.6rem",
                        textAlign: "center",
                        width: "100%",
                      }}
                    >
                      Olá 👋
                    </Text>
                    <Text
                      style={{
                        color: "#333",
                        fontSize: mobile ? "1rem" : "1.3rem",
                        fontFamily: "Poppins",
                        fontWeight: 300,
                        textAlign: "center",
                        width: "100%",
                      }}
                    >
                      Pronto para agendar um horário?
                    </Text>
                  </Flex>
                  <Flex flexDir="column">
                    <Flex
                      onClick={() => setStep("service")}
                      cursor="pointer"
                      bg="#333"
                      justify="center"
                      align="center"
                      borderRadius={8}
                      h="40px"
                      px="20px"
                    >
                      <Text
                        color="#FFF"
                        fontWeight={200}
                        fontSize="1rem"
                        fontFamily="Poppins"
                      >
                        Novo agendamento
                      </Text>
                    </Flex>
                    <Flex
                      cursor="pointer"
                      mt="10px"
                      bg="transparent"
                      justify="center"
                      align="center"
                      borderRadius={8}
                      h="40px"
                      px="20px"
                    >
                      <Text
                        textDecorationLine="underline"
                        color="#333"
                        fontWeight={200}
                        fontSize="1rem"
                        fontFamily="Poppins"
                      >
                        Meus agendamentos
                      </Text>
                    </Flex>
                    <Text
                      borderTop="1px solid #EEE"
                      mt="20px"
                      pt="20px"
                      color="#333"
                      w="100%"
                      textAlign="center"
                      fontWeight={200}
                      fontSize="1rem"
                      fontFamily="Poppins"
                    >
                      Desenvolvido por B2B Apps Ltda
                    </Text>
                  </Flex>
                </Flex>
              )}
              {step === "service" && (
                <Flex
                  p="20px"
                  zIndex={2}
                  flexDir="column"
                  justify="space-between"
                  mt="-20px"
                  pt="20px"
                  bg="#FFF"
                  minW={desktop ? "650px" : "500px"}
                  borderRadius="20"
                >
                  <Flex flexDir="column">
                    <Icon
                      cursor="pointer"
                      onClick={() => setStep("home")}
                      as={MdArrowBack}
                      color="#000"
                      fontSize="2rem"
                      mb="10px"
                    />
                    <Text
                      style={{
                        color: "#333",
                        fontSize: mobile ? "1rem" : "1.3rem",
                        fontFamily: "Poppins",
                        fontWeight: 300,
                      }}
                    >
                      Escolha uma opção
                    </Text>
                    <Input
                      mt="10px"
                      _active={{
                        border: "1px solid #BBB",
                        boxShadow: "none !important",
                        outline: "none !important",
                      }}
                      _focus={{
                        border: "1px solid #BBB",
                        boxShadow: "none !important",
                        outline: "none !important",
                      }}
                      _hover={{
                        border: "1px solid #BBB",
                        boxShadow: "none !important",
                        outline: "none !important",
                      }}
                      border="1px solid #BBB"
                      placeholder="Buscar"
                      color="#000"
                      w="100%"
                      h="45px"
                      borderRadius={10}
                    />
                    <SelectService />
                  </Flex>
                  <Flex flexDir="column">
                    <Flex
                      onClick={() => setStep("service")}
                      cursor="pointer"
                      bg="#333"
                      justify="center"
                      align="center"
                      borderRadius={8}
                      h="40px"
                      px="20px"
                    >
                      <Text
                        color="#FFF"
                        fontWeight={200}
                        fontSize="1rem"
                        fontFamily="Poppins"
                      >
                        Novo agendamento
                      </Text>
                    </Flex>
                    <Flex
                      cursor="pointer"
                      mt="10px"
                      bg="transparent"
                      justify="center"
                      align="center"
                      borderRadius={8}
                      h="40px"
                      px="20px"
                    >
                      <Text
                        textDecorationLine="underline"
                        color="#333"
                        fontWeight={200}
                        fontSize="1rem"
                        fontFamily="Poppins"
                      >
                        Meus agendamentos
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
              )}
            </Flex>
          </Flex>
        </Flex>
      )}
    </>
  );
}
