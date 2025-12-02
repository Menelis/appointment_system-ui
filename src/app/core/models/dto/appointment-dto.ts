import {SlotDto} from './slot-dto';

export interface AppointmentDto {
  id: number;
  branch: any;
  user: any;
  appointmentDate: string;
  slot?: SlotDto,
  referenceNo: string;
  status: string
  description: string;
}
