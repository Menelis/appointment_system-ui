import { Injectable } from '@angular/core';
import { RepositoryService } from './repository.service';
import { ApiResponse } from '../models/api-response';
import { ProvinceDto } from '../models/dto/province-dto';
import {PagedResult} from '../models/paged-result';

@Injectable({
  providedIn: 'root',
})
export class ProvinceService {
  constructor(private _repository: RepositoryService) {}
  getAllProvinces = () => {
    return this._repository.getData<ProvinceDto[]>(
      'v1/provinces',
    );
  };
}
