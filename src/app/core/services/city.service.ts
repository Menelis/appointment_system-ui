import { Injectable } from '@angular/core';
import {RepositoryService} from './repository.service';
import {ApiResponse} from '../models/api-response';
import {CityDto} from '../models/dto/city-dto';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private _repository: RepositoryService) { }

  getCitiesByProvinceId = (provinceId: number) => {
    return this._repository.getData<ApiResponse<CityDto[]>>(`city/admin/get-cities-by-province-id/${provinceId}`)
  }
}
