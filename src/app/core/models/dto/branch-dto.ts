import {AddressDto} from './address-dto';

export interface BranchDto {
  id: string;
  name: string;
  physicalAddress: AddressDto;
  email: string;
  faxNo: string;
  landLine: string;
}
