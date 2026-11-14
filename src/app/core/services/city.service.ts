import { Injectable } from '@angular/core';
import { RepositoryService } from './repository.service';
import { ApiResponse } from '../models/api-response';
import { CityDto } from '../models/dto/city-dto';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  constructor(private _repository: RepositoryService) {}

  getCitiesByProvinceId = (provinceId: string) => {
    return this._repository.getData<CityDto[]>(
      `v1/cities?provinceId=${provinceId}`
    );
  };
}
