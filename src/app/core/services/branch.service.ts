import { Injectable } from '@angular/core';
import { RepositoryService } from './repository.service';
import { Observable } from 'rxjs';
import { BranchDto } from '../models/dto/branch-dto';
import { ApiResponse } from '../models/api-response';
import { PagedResult } from '../models/paged-result';
import { getPaginationHttpParams } from '../util/object-util';
import { HttpParams } from '@angular/common/http';
import { AppConstants } from '../constants/app-constants';
import {ServiceResponseDto} from '../models/service-response-dto';

@Injectable({
  providedIn: 'root',
})
export class BranchService {
  constructor(private _repository: RepositoryService) {}

  getBranchesByProvinceIdAndCityId = (provinceId: string, cityId: string) => {
    return this._repository.getData<BranchDto[]>(
      `v1/branches/provinces/${provinceId}/cities/${cityId}`,
    );
  };

  getAllBranches = () => {
    return this._repository.getData<BranchDto[]>('branches');
  };
  getPaginatedBranches = (
    pageNo: number,
    pageSize: number,
    searchTerm?: string,
  ): Observable<PagedResult<BranchDto[]>> => {
    let httpParams: HttpParams = getPaginationHttpParams(pageNo, pageSize).set(
      AppConstants.SEARCH_TERM,
      searchTerm || '',
    );
    return this._repository.getData<PagedResult<BranchDto[]>>(
      'v1/branches/search',
      httpParams,
    );
  };
  getBranchById = (id: string): Observable<BranchDto> => {
    return this._repository.getData<BranchDto>(`v1/branches/${id}`);
  };
  createBranch = (branchRequest: any) => {
    return this._repository.create<ServiceResponseDto>(
      'v1/admin/branches',
      branchRequest,
    );
  };
  updateBranch = (id: string, updateBranchRequest: any) => {
    return this._repository.update<ServiceResponseDto>(
      `v1/admin/branches/${id}`,
      updateBranchRequest,
    );
  };
}
