import { barbearia } from "@/utils/data";
import { MediaQuery } from "@/utils/operators";
import {
  Avatar,
  Flex,
  Icon,
  Image,
  Input,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { MdArrowBack, MdFactCheck, MdMenu } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { GiMustache } from "react-icons/gi";
import { ServicesMock } from "@/utils/mocks";
import { ServiceType } from "@/types";

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
              h="50px"
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

  function SelectServices() {
    const [selectedServices, setSelectedServices] = useState<ServiceType[]>([]);

    function Service({
      id,
      name,
      price,
      image,
      duration,
    }: {
      id: string;
      name: string;
      price: number;
      duration: number;
      image: string | null;
    }) {
      return (
        <Flex
          onClick={() => {
            const service = selectedServices.find(
              (service) => service.name === name
            );

            if (service) {
              setSelectedServices(
                selectedServices.filter((service) => service.name !== name)
              );
            } else {
              setSelectedServices([
                ...selectedServices,
                {
                  id: id,
                  name,
                  price,
                  image,
                  duration,
                },
              ]);
            }
          }}
          cursor="pointer"
          boxShadow="rgba(0, 0, 0, 0.1) 0 0 10px"
          p="10px"
          borderRadius={10}
          justify="space-between"
          w="100%"
          align="center"
        >
          <Flex align="center">
            {image ? (
              <Stack position="relative" display="inline-block">
                <Image
                  objectFit="cover"
                  h="50px"
                  w="50px"
                  bg="#000"
                  src={String(image)}
                  borderRadius={10}
                  mr="10px"
                />
                {selectedServices.find((service) => service.name === name) && (
                  <Flex
                    bg="#000"
                    h="50px"
                    w="50px"
                    zIndex={2}
                    borderRadius={10}
                    justify="center"
                    align="center"
                    opacity={0.5}
                    position="absolute"
                    top="0"
                    left="0"
                  >
                    <Icon as={FaCheck} color="#FFF" fontSize="1.5rem" />
                  </Flex>
                )}
              </Stack>
            ) : (
              <Stack position="relative" display="inline-block">
                <Flex
                  justify="center"
                  align="center"
                  objectFit="cover"
                  h="50px"
                  bg="#EEE"
                  w="50px"
                  borderRadius={10}
                  mr="10px"
                >
                  <Text fontFamily="Poppins" fontSize="1rem" fontWeight={600}>
                    {/* renderizar a primeira letra da primeira palavra do name */}
                    {/* caso exista uma segunda palavra renderize a primeira letra da primeira palavra + a primeira letra da ultima palavra */}
                    {/* caso tenha 3 ou mais palavras preciso que renderize somente da primeira e da ultima  */}
                    {name.split(" ").length === 1
                      ? name.split(" ")[0].charAt(0)
                      : name.split(" ")[0].charAt(0) +
                        name.split(" ")[name.split(" ").length - 1].charAt(0)}
                  </Text>
                </Flex>
                {selectedServices.find((service) => service.name === name) && (
                  <Flex
                    bg="#000"
                    h="50px"
                    w="50px"
                    zIndex={2}
                    borderRadius={10}
                    justify="center"
                    align="center"
                    opacity={0.5}
                    position="absolute"
                    top="0"
                    left="0"
                  >
                    <Icon as={FaCheck} color="#FFF" fontSize="1.5rem" />
                  </Flex>
                )}
              </Stack>
            )}
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
        {ServicesMock.map((service, i) => {
          return (
            <Service
              key={i}
              id={service.id}
              image={service.image ? service.image : null}
              name={service.name}
              price={service.price}
              duration={service.duration}
            />
          );
        })}
      </SimpleGrid>
    );
  }

  const mobileHeight = step === "home" ? "70%" : "70%";

  return (
    <>
      {mobile ? (
        <Flex flexDir="column" bg="#FFF" h="100vh" w="100%">
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
              p="20px"
              zIndex={2}
              flexDir="column"
              justify="space-between"
              mt="-140px"
              pt="20px"
              bg="#FFF"
              pb={step === "home" ? "100px" : mobile ? "100px" : "20px"}
              h="fit-content"
              borderTopRadius="20"
            >
              {step === "home" && (
                <>
                  <Flex flexDir="column">
                    <Text
                      color="#000"
                      fontFamily="Poppins"
                      w="100%"
                      textAlign="center"
                      fontSize="2rem"
                      pb="5px"
                    >
                      💈
                    </Text>
                    <Text
                      color="#000"
                      fontFamily="Poppins"
                      w="100%"
                      textAlign="center"
                      fontSize="1.4rem"
                      pb="20px"
                    >
                      {barbearia.nomeFantasia}
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
                      h="50px"
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
                      h="50px"
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
                  <SelectServices />
                  <Flex flexDir="column">
                    <Flex
                      onClick={() => setStep("service")}
                      cursor="pointer"
                      bg="#333"
                      justify="center"
                      align="center"
                      borderRadius={8}
                      h="50px"
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
                    <Text
                      color="#000"
                      fontFamily="Poppins"
                      w="100%"
                      textAlign="center"
                      fontSize="2rem"
                      pb="5px"
                    >
                      💈
                    </Text>
                    <Text
                      color="#000"
                      fontFamily="Poppins"
                      w="100%"
                      textAlign="center"
                      fontSize="1.4rem"
                      pb="20px"
                    >
                      {barbearia.nomeFantasia}
                    </Text>
                  </Flex>

                  <Flex flexDir="column" mt="10px">
                    <Flex
                      onClick={() => setStep("service")}
                      cursor="pointer"
                      bg="#333"
                      justify="center"
                      align="center"
                      borderRadius={8}
                      h="50px"
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
                      h="50px"
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
                    <SelectServices />
                  </Flex>
                  <Flex flexDir="column">
                    <Flex
                      onClick={() => setStep("service")}
                      cursor="pointer"
                      bg="#333"
                      justify="center"
                      align="center"
                      borderRadius={8}
                      h="50px"
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
                      h="50px"
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
