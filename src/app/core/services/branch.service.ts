import { Injectable } from '@angular/core';
import {RepositoryService} from './repository.service';
import {Observable} from 'rxjs';
import {BranchDto} from '../models/dto/branch-dto';
import {ApiResponse} from '../models/api-response';
import {PagedResult} from '../models/paged-result';

@Injectable({
  providedIn: 'root'
})
export class BranchService {

  constructor(private _repository: RepositoryService) {
  }
  getAllBranches = () : Observable<PagedResult<BranchDto[]>> => {
    return this._repository.getData<PagedResult<BranchDto[]>>('branch');
  }
  getBranchById = (id: number): Observable<ApiResponse<BranchDto>> => {
    return this._repository.getData<ApiResponse<BranchDto>>(`branch/${id}`);
  }
  createBranch = (branchRequest: any) => {
    return this._repository.create<ApiResponse<any>>('branch/admin/create', branchRequest);
  }
  updateBranch = (id: number, updateBranchRequest: any) => {
    return this._repository.update<ApiResponse<any>>(`branch/admin/update/${id}`, updateBranchRequest);
  }

}
