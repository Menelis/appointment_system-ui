import { SlotDto } from './slot-dto';
import {UserSummary} from '../user-summary';
import {BranchSummary} from '../branch-summary';

export interface AppointmentDto {
  id: string;
  branch: any;
  user: any;
  appointmentDate: string;
  slot?: SlotDto;
  userSummary?: UserSummary;
  branchSummary?: BranchSummary;
  referenceNo: string;
  status: string;
  description: string;
}
