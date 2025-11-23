import { Injectable } from '@angular/core';
import {RepositoryService} from './repository.service';
import {ApiResponse} from '../models/api-response';
import {PagedResult} from '../models/paged-result';
import {AppointmentDto} from '../models/dto/appointment-dto';
import {AuthService} from './auth/auth.service';
import { getPaginationHttpParams } from '../util/object-util';


@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private _repository: RepositoryService,
              private _authService: AuthService) { }

  public createAppointment = (newAppointmentRequest: any) => {
    return this._repository.create<ApiResponse<any>>('appointment/create', newAppointmentRequest);
  }
  public updateAppointment = (id:number, updateAppointmentRequest: any) => {
    return this._repository.update<ApiResponse<any>>(`appointment/update/${id}`, updateAppointmentRequest);
  }

  public getPaginatedAppointments= (pageNo: number, pageSize: number) => {
    let apiEndPoint = this._authService.isAdmin ? 'appointment/admin/get-all-appointments' : 'appointment/customer/get-all-appointments';
    return this._repository.getData<PagedResult<AppointmentDto[]>>(apiEndPoint, getPaginationHttpParams(pageNo, pageSize));
  }
}
