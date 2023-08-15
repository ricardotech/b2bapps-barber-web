export type ColorRgba = {
  r: number;
  g: number;
  b: number;
  a: number;
};

export type ColorsType = {
  primary: ColorRgba;
  secondary: ColorRgba;
  filter_background: ColorRgba;
  color_background: ColorRgba;
  inactive_value: ColorRgba;
  inactive_background: ColorRgba;
};

export type ClientType = {
  logo: string | null;
  name: string;
  slogan: string | null;
  map_url: string | null;
};

export type UserType = {
  id: string;
  name: string;
  phone: string;
};

export type ServiceType = {
  id: string;
  name: string;
  price: number;
  duration: number;
  image: string | null;
};

export type BarberType = {
  id: string;
  name: string;
  rating: number;
  image: string | null;
};

export type MyScheduleType = {
  id: string;
  date: Date;
  barber: BarberType;
  services: ServiceType[];
  total: number;
  rating: number | null;
  status: "scheduled" | "canceled" | "done";
};

export enum SchedulingProcessEnum {
  SelectingServices,
  SelectingDateTime,
  SelectingBarber,
  Confirming,
}
