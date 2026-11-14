import { Injectable } from '@angular/core';
import { RepositoryService } from './repository.service';
import { SlotDto } from '../models/dto/slot-dto';

@Injectable({
  providedIn: 'root',
})
export class SlotService {
  constructor(private _repository: RepositoryService) {}

  getAllSlots = () => {
    return this._repository.getData<SlotDto[]>('v1/slots');
  };
}
