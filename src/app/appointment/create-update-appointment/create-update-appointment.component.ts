import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BranchDto} from '../../core/models/dto/branch-dto';
import {SlotDto} from '../../core/models/dto/slot-dto';
import {SlotService} from '../../core/services/slot.service';
import {BranchService} from '../../core/services/branch.service';
import {FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {GenericValidationService} from '../../core/services/generic-validation.service';
import {ProvinceDto} from '../../core/models/dto/province-dto';
import {CityDto} from '../../core/models/dto/city-dto';
import {ProvinceService} from '../../core/services/province.service';
import {CityService} from '../../core/services/city.service';
import {NgbCalendar, NgbDateStruct, NgbDate} from '@ng-bootstrap/ng-bootstrap';

import { getMinDate, disableWeekends } from '../../core/util/date-util';

@Component({
  selector: 'app-create-update-appointment',
  standalone: false,
  templateUrl: './create-update-appointment.component.html',
  styleUrl: './create-update-appointment.component.scss'
})
export class CreateUpdateAppointmentComponent implements OnInit {

  @Input() public cardTitle!: string;
  @Input() appointmentFormGroup!: FormGroup;
  @Input() success!: boolean;
  @Input() responseMessage!: string;
  @Input() busy!: boolean
  @Output() public onSubmit = new EventEmitter();
  // Look up properties
  branches!: BranchDto[];
  slots!: SlotDto[]
  provinces!: ProvinceDto[];
  cities!: CityDto[];
  provinceId!: number;
  minDate!: NgbDateStruct;

  constructor(private _branchService: BranchService,
              private _slotService: SlotService,
              private _router: Router,
              public _genericValidation: GenericValidationService,
              private _provinceService: ProvinceService,
              private _cityService: CityService,
              public calender: NgbCalendar) {
    //Disable previous dates
    this.minDate = getMinDate();
  }
  ngOnInit(): void {
    this.loadProvinces();
    this.loadSlots();
  }
  loadSlots = () => {
    this._slotService.getAllSlots().subscribe({
      next: (response) => {
        this.slots = response.data;
      },
      error: (error) => {}
    });
  }
  loadProvinces = () => {
    this._provinceService.getAllProvinces().subscribe({
      next: (response) => {
        this.provinces = response.data;
      },
      error: (error) => {}
    });
  }

  public emitEvent = () => {
    this.onSubmit.emit();
  }
  cancel = () => {
    this._router.navigate(['/appointment/list'])
  }

  onSelectedProvince = (provinceId: number) => {
    this.provinceId = provinceId;
    this._cityService.getCitiesByProvinceId(provinceId).subscribe({
      next: (response) => {
        this.cities = response.data;
      },
      error: (error) => {}
    });
  }
  onSelectedCity = (cityId: number) => {
    this._branchService.getBranchesByProvinceIdAndCityId(this.provinceId, cityId).subscribe({
      next: (response) => {
        this.branches = response.data;
      },
      error: (error) => {}
    })
  }
  markDisabled = (date: NgbDate) => {
    return disableWeekends(this.calender, date);
  }
}
