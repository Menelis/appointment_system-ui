import {Component, EventEmitter, Input, input, OnInit, Output} from '@angular/core';
import {GenericValidationService} from '../../core/services/generic-validation.service';
import {FormGroup} from '@angular/forms';
import {BranchService} from '../../core/services/branch.service';
import {ProvinceDto} from '../../core/models/dto/province-dto';
import {CityDto} from '../../core/models/dto/city-dto';
import {Router} from '@angular/router';
import {CityService} from '../../core/services/city.service';
import {ProvinceService} from '../../core/services/province.service';

@Component({
  selector: 'app-create-update-branch',
  standalone: false,
  templateUrl: './create-update-branch.component.html',
  styleUrl: './create-update-branch.component.scss'
})
export class CreateUpdateBranchComponent implements OnInit {

  @Input() public cardTitle!: string;
  @Input() branchFormGroup!: FormGroup;
  @Output() public onSubmit = new EventEmitter();

  provinces!: ProvinceDto[];
  cities!: CityDto[];
  constructor(public _genericValidation: GenericValidationService,
              private _router: Router,
              private _cityService: CityService,
              private _provinceService: ProvinceService) {
  }
  ngOnInit(): void {
    this.loadProvinces();
  }
  loadProvinces = () => {
    this._provinceService.getAllProvinces().subscribe({
      next: (response) =>  {
        this.provinces = response.data;
      }
    })
  }
  onSelectedProvince = (provinceId: number) => {
    this._cityService.getCitiesByProvinceId(provinceId).subscribe({
      next: (response) => {
        this.cities = response.data;
      }
    })
  }
  public emitEvent = () => {
    this.onSubmit.emit();
  }
  cancel = () => {
    this._router.navigate(['/branch/list']);
  }
}
