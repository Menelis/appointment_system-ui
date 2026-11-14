import {ProvinceDto} from './province-dto';
import { CityDto } from './city-dto';

export interface AddressDto {
  addressLine1: string;
  addressLine2: string;
  suburb: string;
  province: ProvinceDto;
  city: CityDto;
  postalCode: string;
}
