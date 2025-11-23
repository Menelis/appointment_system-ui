export interface AppointmentRequest {
  id?:number; // This will not be passed on create on appointment
  branchId: number;
  slotId: number;
  description: string;
}
