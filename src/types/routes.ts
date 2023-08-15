import { BarberType, ServiceType } from ".";

export type RoutesParamList = {
  Home: undefined;
  Schedule: undefined;
  Shop: undefined;
  Profile: undefined;
};

export type HomeParamList = {
  HomeScreen: undefined;
  ScheduleCreateHome: { item: ServiceType | BarberType };
};

export type ScheduleParamList = {
  ScheduleList: undefined;
  ScheduleDetail: { id: string };
  ScheduleCreate: undefined;
};
