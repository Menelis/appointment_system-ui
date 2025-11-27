import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BranchDto} from '../../core/models/dto/branch-dto';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BranchService} from '../../core/services/branch.service';
import {CityDto} from '../../core/models/dto/city-dto';
import {CityService} from '../../core/services/city.service';
import {finalize} from 'rxjs';

@Component({
  selector: 'app-edit',
  standalone: false,
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss'
})
export class EditComponent implements OnInit {
  branch!: BranchDto;
  updateBranchForm!: FormGroup;
  id!: number;
  cities!: CityDto[];
  busy = false;
  constructor(private _route: ActivatedRoute,
              private _branchService: BranchService,
              private _cityService: CityService,
              private _router: Router) {
    this.id = Number(this._route.snapshot.paramMap.get('id') || 0);
  }
  ngOnInit(): void {
    this.updateBranchForm = new FormGroup({
      id: new FormControl(''),
      branchName: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      streetNo: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      addressLine1: new FormControl(null, [Validators.maxLength(255)]),
      addressLine2: new FormControl(null, [Validators.maxLength(255)]),
      cityId: new FormControl('', [Validators.required]),
      provinceId: new FormControl('', [Validators.required]),
      postalCode: new FormControl('', [Validators.required, Validators.maxLength(10)]),
      emailAddress: new FormControl('', [Validators.required, Validators.maxLength(100), Validators.email]),
      faxNo: new FormControl(null, [Validators.maxLength(20)]),
      landLine: new FormControl('', [Validators.required, Validators.maxLength(20)])
    });
    this.getBranchById();
  }

  getBranchById = () => {
    this._branchService.getBranchById(this.id).subscribe({
      next: (response) => {
        this.branch = response.data;
        this.loadCities(this.branch?.province?.id);
        this.updateBranchForm.patchValue({
          branchName: this.branch.name,
          emailAddress: this.branch.email,
          provinceId: this.branch?.province?.id,
          cityId: this.branch?.city?.id,
          ...this.branch
        });
      },
      error: (error) => {

      }
    });
  }
  loadCities = (provinceId: number) => {
    this._cityService.getCitiesByProvinceId(provinceId).subscribe({
      next: (response) => {
        this.cities = response.data;
      },
      error: (error) => {}
    });
  }

  onSubmit = () => {
    if(this.updateBranchForm.valid) {
      let updateBranchFormValue = this.updateBranchForm.value;
      let updateBranchRequest = {
        id: updateBranchFormValue.id,
        name: updateBranchFormValue.branchName,
        streetNo: updateBranchFormValue.streetNo,
        addressLine1: updateBranchFormValue.addressLine1,
        addressLine2: updateBranchFormValue.addressLine2,
        cityId: updateBranchFormValue.cityId,
        provinceId: updateBranchFormValue.provinceId,
        postalCode: updateBranchFormValue.postalCode,
        email: updateBranchFormValue.emailAddress,
        faxNo: updateBranchFormValue.faxNo,
        landLine: updateBranchFormValue.landLine
      };
      this._branchService.updateBranch(this.id, updateBranchRequest).pipe(finalize(() => {
        this.busy = true;
      })).subscribe({
        next: (response) => {
          if(response.success) {
            this._router.navigate(['/branch/list']);
          }
        },
      error: (error) => {}
      });
    }
  }
}
