import { Injectable } from '@angular/core';
import {RepositoryService} from './repository.service';
import {ApiResponse} from '../models/api-response';
import {SlotDto} from '../models/dto/slot-dto';

@Injectable({
  providedIn: 'root'
})
export class SlotService {

  constructor(private _repository: RepositoryService) { }

  getAllSlots = () => {
    return this._repository.getData<ApiResponse<SlotDto[]>>('slot');
  }
}
