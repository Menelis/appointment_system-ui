import { Injectable } from '@angular/core';
import { RepositoryService } from './repository.service';
import { ApiResponse } from '../models/api-response';
import { PagedResult } from '../models/paged-result';
import { AppointmentDto } from '../models/dto/appointment-dto';
import { getPaginationHttpParams } from '../util/object-util';
import { HttpParams } from '@angular/common/http';
import { AppConstants } from '../constants/app-constants';
import { ServiceResponseDto } from '../models/service-response-dto';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  constructor(private _repository: RepositoryService) {}

  public createAppointment = (newAppointmentRequest: any) => {
    return this._repository.create<ServiceResponseDto>(
      '/v1/appointments',
      newAppointmentRequest,
    );
  };
  public updateAppointment = (id: number, updateAppointmentRequest: any) => {
    return this._repository.update<ServiceResponseDto>(
      `/v1/appointments/${id}`,
      updateAppointmentRequest,
    );
  };

  public updateAppointmentStatus = (updateStatus: any) => {
    return this._repository.create<ServiceResponseDto>(
      '/v1/appointments/update-status',
      updateStatus,
    );
  };

  public getPaginatedAppointments = (
    pageNo: number,
    pageSize: number,
    searchTerm?: string,
  ) => {
    let httpParams: HttpParams = getPaginationHttpParams(pageNo, pageSize).set(
      AppConstants.SEARCH_TERM,
      searchTerm || '',
    );
    return this._repository.getData<PagedResult<AppointmentDto[]>>(
      '/v1/appointments',
      httpParams,
    );
  };
}
