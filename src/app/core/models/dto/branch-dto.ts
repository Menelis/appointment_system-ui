import {CityDto} from './city-dto';
import {ProvinceDto} from './province-dto';

export interface BranchDto {
  id: number;
  name: string;
  streetNo: string;
  addressLine1: string;
  addressLine2: string;
  city: CityDto;
  province: ProvinceDto;
  postalCode: string;
  email: string;
  faxNo: string;
  landLine: string
}
