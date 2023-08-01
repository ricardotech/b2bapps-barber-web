import { barbearia } from "@/utils/data";
import { MediaQuery } from "@/utils/operators";
import { Flex, Icon, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { MdMenu } from "react-icons/md";

export default function Home() {
  const { mobile, desktop } = MediaQuery();

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

  return (
    <>
      {mobile ? (
        <Flex flexDir="column" bg="#FFF" h="100vh" w="100%">
          <Flex flexDir="column" bg="#111" h="100vh" w="100%" mx="auto">
            <Image
              bg="#000"
              opacity={0.6}
              h={mobile ? "100%" : "80vh"}
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
              <Flex flexDir="column">
                <Text
                  style={{
                    color: "#000",
                    fontSize: mobile ? "2rem" : "2.6rem",
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
                  }}
                >
                  Pronto para agendar um horário?
                </Text>
              </Flex>
              <Flex flexDir="column">
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
                    Iniciar agendamento
                  </Text>
                </Flex>
                <Flex
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
              <Flex
                p="20px"
                zIndex={2}
                flexDir="column"
                justify="space-between"
                mt="-20px"
                pt="20px"
                bg="#FFF"
                minW={desktop ? "650px" : "500px"}
                h="50%"
                borderRadius="20"
              >
                <Flex flexDir="column">
                  <Text
                    style={{
                      color: "#000",
                      fontSize: mobile ? "2rem" : "2.6rem",
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
                    }}
                  >
                    Pronto para agendar um horário?
                  </Text>
                </Flex>
                <Flex flexDir="column">
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
                      Iniciar agendamento
                    </Text>
                  </Flex>
                  <Flex
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
            </Flex>
          </Flex>
        </Flex>
      )}
    </>
  );
}
