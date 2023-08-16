import { barbearia } from "@/utils/data";
import {
  MediaQuery,
  daysOfTheWeek,
  generateAvailableDates,
  monthsOfTheYear,
  pesquisarName,
} from "@/utils/operators";
import {
  Avatar,
  Flex,
  Icon,
  Image,
  Input,
  SimpleGrid,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";

import { MdArrowBack, MdFactCheck, MdMenu } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { GiMustache } from "react-icons/gi";
import {
  AvailableDaysMock,
  AvailableHoursMock,
  BarberMock,
  NotAvailableHoursMock,
  ServicesMock,
} from "@/utils/mocks";
import { BarberType, SchedulingProcessEnum, ServiceType } from "@/types";
import moment from "moment";

export default function Home() {
  const toast = useToast();
  const { mobile, desktop } = MediaQuery();

  const [step, setStep] = useState<"home" | "service" | "barber" | "date">(
    "home"
  );

  const [servicesPaginationPage, setServicesPaginationPage] = useState(1);

  const itemsPerPage = desktop ? 32 : 10;
  const startIndex = (servicesPaginationPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const [servicesResults, setServicesResults] = useState<ServiceType[]>([]);
  const [barbersResults, setBarbersResults] = useState<ServiceType[]>([]);
  const [serviceSearchTerm, setServiceSearchTerm] = useState<String>("");
  const [barberSearchTerm, setBarberSearchTerm] = useState<String>("");
  const paginatedServices = ServicesMock.slice(startIndex, endIndex);
  const paginatedBarbers = BarberMock.slice(startIndex, endIndex);

  const [selectedServices, setSelectedServices] = useState<ServiceType[]>([]);

  const [selectedBarber, setSelectedBarber] = useState<
    BarberType | undefined
  >();

  const [availableDays, setAvailableDays] = useState<Date[]>([]);
  const [availableHours, setAvailableHours] = useState<Date[]>([]);

  const currentDate = moment().startOf("day");

  const filteredAvailableDays = availableDays.filter((availableDay) => {
    const availableDayDate = moment(availableDay).startOf("day");

    return availableDayDate.isSameOrAfter(currentDate);
  });

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectCurrent, setSelectCurrent] = useState<SchedulingProcessEnum>();

  const [selectedDay, setSelectedDay] = useState<Date | null>(selectedDate);
  const [selectedHour, setSelectedHour] = useState<Date | null>(selectedDate);

  const [advance, setAdvance] = useState<boolean>(false);

  async function getAvailableDays() {
    setAvailableDays(AvailableDaysMock);
  }

  async function getAvailableHours() {
    // get all available hours for the selected day
    // we have an array of all the occupied hours
    // we must identify the day of the selected day
    // we must filter other occupied hours from this array
    // we must return the available hours (those that are not present in the occupied hours array)

    const occupiedHours = NotAvailableHoursMock.filter(
      (hour) =>
        moment(hour).format("DD/MM/YYYY") ===
        moment(selectedDay).format("DD/MM/YYYY")
    );

    console.log("oh", occupiedHours);

    const availableHours = AvailableHoursMock.filter(
      (hour) =>
        moment(hour).format("DD/MM/YYYY") ===
        moment(selectedDay).format("DD/MM/YYYY")
    );

    const filteredAvailableHours = availableHours.filter(
      (hour) => !occupiedHours.includes(hour)
    );

    setAvailableHours(filteredAvailableHours);
  }

  function handleAdvance() {
    const year = moment(selectedDay).format("YYYY");
    const month = moment(selectedDay).format("MM");
    const day = moment(selectedDay).format("DD");
    const hour = moment(selectedHour).format("HH");
    const minute = moment(selectedHour).format("mm");
    const date = new Date(
      Number(year),
      Number(month) - 1,
      Number(day),
      Number(hour),
      Number(minute)
    );
    setSelectedDate(date);
    setSelectCurrent(SchedulingProcessEnum.Confirming);
  }

  function handleBack() {
    setSelectedDate(null);
    setSelectCurrent(SchedulingProcessEnum.SelectingBarber);
  }

  useEffect(() => {
    selectedDay && getAvailableHours();
    !selectedDay && setSelectedHour(null);
  }, [selectedDay]);

  useEffect(() => {
    selectedDay && selectedHour ? setAdvance(true) : setAdvance(false);
  }, [selectedDay, selectedHour]);

  useEffect(() => {
    getAvailableDays();
  }, []);

  useEffect(() => {
    getAvailableHours();
  }, [selectedDate]);

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
        {serviceSearchTerm.length > 0 ? (
          servicesResults.length > 0 ? (
            servicesResults.map((service, i) => {
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
            })
          ) : (
            <Text color="#000" w="100%" minW="350px">
              Nenhum resultado "{serviceSearchTerm}"
            </Text>
          )
        ) : (
          paginatedServices.map((service, i) => {
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
          })
        )}
      </SimpleGrid>
    );
  }

  function SelectBarbers() {
    function Barber({
      id,
      name,
      image,
      rating,
    }: {
      id: string;
      name: string;
      rating: number;
      image: string | null;
    }) {
      return (
        <Flex
          onClick={() => {
            if (selectedBarber?.name === name) {
              setSelectedBarber(undefined);
            } else {
              setSelectedBarber({
                id,
                name,
                image,
                rating,
              });
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
                {selectedBarber?.name === name && (
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
                {selectedBarber?.name === name && (
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
                {rating}
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
        {barberSearchTerm.length > 0 ? (
          barbersResults.length > 0 ? (
            BarberMock.map((barber, i) => {
              return (
                <Barber
                  key={i}
                  id={barber.id}
                  image={barber.image ? barber.image : null}
                  name={barber.name}
                  rating={5}
                />
              );
            })
          ) : (
            <Text color="#000" w="100%" minW="350px">
              Nenhum resultado "{barberSearchTerm}"
            </Text>
          )
        ) : (
          paginatedBarbers.map((barber, i) => {
            return (
              <Barber
                key={i}
                id={barber.id}
                image={barber.image ? barber.image : null}
                name={barber.name}
                rating={barber.rating}
              />
            );
          })
        )}
      </SimpleGrid>
    );
  }

  function ItemHour({
    item,
    selectedHour,
    setSelectedHour,
  }: {
    item: Date;
    selectedHour: Date | null;
    setSelectedHour: React.Dispatch<React.SetStateAction<Date | null>>;
  }) {
    const selected =
      moment(selectedHour).format("HH:mm") === moment(item).format("HH:mm")
        ? true
        : false;
    const hour = moment(item).format("HH:mm");

    function handlePress() {
      selectedHour === item ? setSelectedHour(null) : setSelectedHour(item);
    }

    return (
      <Flex
        onClick={handlePress}
        style={{
          width: "calc(100vw - 70) / 4",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 5,
          backgroundColor: selected ? "blue" : "red",
          borderRadius: 10,
        }}
        px="10px"
        py="5px"
      >
        <Text
          style={{
            color: selected ? "blue" : "red",
            fontWeight: selected ? "bold" : "300",
          }}
        >
          {hour}
        </Text>
      </Flex>
    );
  }

  function ItemDay({
    item,
    index,
    availableDays,
    selectedDay,
    setSelectedDay,
  }: {
    item: Date;
    index: number;
    availableDays: Date[];
    selectedDay: Date | null;
    setSelectedDay: React.Dispatch<React.SetStateAction<Date | null>>;
  }) {
    const day = moment(item).format("DD");
    const month = moment(item).format("MM");
    const dayOfTheWeek = moment(item).format("d");

    const selected =
      moment(selectedDay).format("DD/MM/YYYY") ===
      moment(item).format("DD/MM/YYYY")
        ? true
        : false;

    function handleSelectDay() {
      selectedDay === item ? setSelectedDay(null) : setSelectedDay(item);
    }

    return (
      <Flex
        flexDir="column"
        mr="10px"
        style={{
          alignItems: "center",
          height: 80,
          gap: 3,
          marginRight: index === availableDays.length - 1 ? 20 : undefined,
        }}
      >
        <Text
          style={{
            color: selected ? "#000" : "#333",
            fontWeight: selected ? "bold" : "300",
            fontSize: 12,
          }}
        >
          {moment(item).format("MMM")}
        </Text>
        <Flex
          onClick={handleSelectDay}
          style={{
            height: 35,
            width: 35,
            borderRadius: 35,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: selected ? "#333" : "#F0F0F0",
          }}
        >
          <Text
            style={{
              color: selected ? "#FFF" : "#333",
              fontWeight: selected ? "bold" : "300",
            }}
          >
            {day}
          </Text>
        </Flex>
        <Text
          style={{
            color: selected ? "#000" : "#333",
            fontWeight: selected ? "bold" : "300",
            fontSize: 12,
          }}
        >
          {daysOfTheWeek[Number(dayOfTheWeek)]}
        </Text>
      </Flex>
    );
  }

  function renderItemHour({
    item,
    selectedHour,
    setSelectedHour,
  }: {
    item: Date;
    selectedHour: Date | null;
    setSelectedHour: React.Dispatch<React.SetStateAction<Date | null>>;
  }) {
    return (
      <ItemHour
        item={item}
        selectedHour={selectedHour}
        setSelectedHour={setSelectedHour}
      />
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
              src="/barbershop.jpg"
              objectFit="cover"
            />
            <Flex
              zIndex={2}
              flexDir="column"
              justify="space-between"
              mt={step === "home" ? "-140px" : "-220px"}
              pt="20px"
              bg="#FFF"
              pb={step === "home" ? "100px" : mobile ? "100px" : "20px"}
              h="fit-content"
              borderTopRadius="20"
            >
              {step === "home" && (
                <Flex flexDir="column" px="20px">
                  <Flex flexDir="column" p="20px">
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
                </Flex>
              )}
              {step === "service" && (
                <Flex
                  px="20px"
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
                      value={String(serviceSearchTerm)}
                      onChange={(e) => {
                        setServiceSearchTerm(e.target.value);
                        const res = pesquisarName(e.target.value, ServicesMock);
                        setServicesResults(res);
                      }}
                      color="#000"
                      w="100%"
                      h="45px"
                      borderRadius={10}
                    />
                  </Flex>
                  <SelectServices />
                  <Flex flexDir="column">
                    <Flex
                      onClick={() => {
                        if (selectedServices.length > 0) {
                          setStep("barber");
                        } else {
                          toast({
                            status: "error",
                            description: "Selecione um serviço",
                            position: "top",
                            duration: 2000,
                          });
                        }
                      }}
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
                        Próximo
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
              )}
              {step === "barber" && (
                <Flex
                  px="20px"
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
                      onClick={() => setStep("service")}
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
                      value={String(barberSearchTerm)}
                      onChange={(e) => {
                        setBarberSearchTerm(e.target.value);
                        const res = pesquisarName(e.target.value, BarberMock);
                        setBarbersResults(res);
                      }}
                      color="#000"
                      w="100%"
                      h="45px"
                      borderRadius={10}
                    />
                  </Flex>
                  <SelectBarbers />
                  <Flex flexDir="column">
                    <Flex
                      onClick={() => setStep("date")}
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
                        Escolher horário
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
              )}
              {step === "date" && (
                <Flex
                  zIndex={2}
                  flexDir="column"
                  h="100%"
                  justify="space-between"
                  bg="#FFF"
                  w="100%"
                  borderRadius="20"
                >
                  <Flex flexDir="column" px="20px">
                    <Icon
                      cursor="pointer"
                      onClick={() => setStep("barber")}
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
                      Escolha uma data
                    </Text>
                  </Flex>
                  {/*  create a map that iterate availableDays and return a text with the value that is a Data if the Data is equal or after the actual date  using next.js and chakra ui*/}
                  <Flex
                    px="20px"
                    py="20px"
                    pb="10px"
                    mb="10px"
                    align="center"
                    w="100%"
                    overflowX="scroll"
                  >
                    {filteredAvailableDays.map((availableDay, i) => {
                      return (
                        <ItemDay
                          key={i}
                          item={availableDay}
                          index={i}
                          availableDays={availableDays}
                          selectedDay={selectedDay}
                          setSelectedDay={setSelectedDay}
                        />
                      );
                    })}
                  </Flex>
                  <Flex flexDir="column" px="20px">
                    <Flex
                      onClick={() => setStep("date")}
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
                        Escolher horário
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
              src="/barbershop.jpg"
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
              {step === "barber" && (
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
                      onClick={() => setStep("service")}
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
                      value={String(barberSearchTerm)}
                      onChange={(e) => {
                        setBarberSearchTerm(e.target.value);
                        const res = pesquisarName(e.target.value, BarberMock);
                        setBarbersResults(res);
                      }}
                      color="#000"
                      w="100%"
                      h="45px"
                      borderRadius={10}
                    />
                  </Flex>
                  <SelectBarbers />
                  <Flex flexDir="column">
                    <Flex
                      onClick={() => setStep("date")}
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
                        Escolher horário
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
