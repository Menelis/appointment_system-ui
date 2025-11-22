import { Injectable } from '@angular/core';
import {RepositoryService} from './repository.service';
import {ApiResponse} from '../models/api-response';
import {ProvinceDto} from '../models/dto/province-dto';

@Injectable({
  providedIn: 'root'
})
export class ProvinceService {

  constructor(private _repository: RepositoryService) { }
  getAllProvinces = () => {
    return this._repository.getData<ApiResponse<ProvinceDto[]>>('province/admin/get-all')
  }
}
