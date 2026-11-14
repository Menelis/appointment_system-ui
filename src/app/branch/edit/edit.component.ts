import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BranchDto } from '../../core/models/dto/branch-dto';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BranchService } from '../../core/services/branch.service';
import { CityDto } from '../../core/models/dto/city-dto';
import { CityService } from '../../core/services/city.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-edit',
  standalone: false,
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
})
export class EditComponent implements OnInit {
  branch!: BranchDto;
  updateBranchForm!: FormGroup;
  id!: string;
  cities!: CityDto[];
  busy = false;
  constructor(
    private _route: ActivatedRoute,
    private _branchService: BranchService,
    private _cityService: CityService,
    private _router: Router,
  ) {
    this.id = this._route.snapshot.paramMap.get('id') || '';
  }
  ngOnInit(): void {
    this.updateBranchForm = new FormGroup({
      id: new FormControl(''),
      branchName: new FormControl('', [
        Validators.required,
        Validators.maxLength(100),
      ]),
      addressLine1: new FormControl(null, [Validators.maxLength(255)]),
      addressLine2: new FormControl(null, [Validators.maxLength(255)]),
      suburb: new FormControl('', [Validators.required,Validators.maxLength(50)]),
      cityId: new FormControl('', [Validators.required]),
      provinceId: new FormControl('', [Validators.required]),
      postalCode: new FormControl('', [
        Validators.required,
        Validators.maxLength(10),
      ]),
      emailAddress: new FormControl('', [
        Validators.required,
        Validators.maxLength(100),
        Validators.email,
      ]),
      faxNo: new FormControl(null, [Validators.maxLength(20)]),
      landLine: new FormControl('', [
        Validators.required,
        Validators.maxLength(20),
      ]),
    });
    this.getBranchById();
  }

  getBranchById = () => {
    this._branchService.getBranchById(this.id).subscribe({
      next: (response) => {
        this.branch = response;
        this.loadCities(this.branch.physicalAddress.province.id);
        this.updateBranchForm.patchValue({
          branchName: this.branch.name,
          emailAddress: this.branch.email,
          landLine: this.branch.landLine,
          faxNo: this.branch.faxNo,
          addressLine1: this.branch?.physicalAddress?.addressLine1,
          addressLine2: this.branch?.physicalAddress?.addressLine2,
          suburb : this.branch?.physicalAddress?.suburb,
          provinceId: this.branch?.physicalAddress?.province?.id,
          cityId: this.branch?.physicalAddress?.city?.id,
          postalCode: this.branch?.physicalAddress?.postalCode
        });
      },
      error: (error) => {},
    });
  };
  loadCities = (provinceId: string) => {
    this._cityService.getCitiesByProvinceId(provinceId).subscribe({
      next: (response) => {
        this.cities = response;
      },
      error: (error) => {},
    });
  };

  onSubmit = () => {
    if (this.updateBranchForm.valid) {
      let updateBranchFormValue = this.updateBranchForm.value;
      let updateBranchRequest = {
        id: updateBranchFormValue.id,
        name: updateBranchFormValue.branchName,
        physicalAddress: {
          addressLine1: updateBranchFormValue.addressLine1,
          addressLine2: updateBranchFormValue.addressLine2,
          suburb: updateBranchFormValue.suburb,
          cityId: updateBranchFormValue.cityId,
          provinceId: updateBranchFormValue.provinceId,
          postalCode: updateBranchFormValue.postalCode
        },
        email: updateBranchFormValue.emailAddress,
        faxNo: updateBranchFormValue.faxNo,
        landLine: updateBranchFormValue.landLine,
      };
      this._branchService
        .updateBranch(this.id, updateBranchRequest)
        .pipe(
          finalize(() => {
            this.busy = true;
          }),
        )
        .subscribe({
          next: (response) => {
            if (response.success) {
              this._router.navigate(['/branch/list']);
            }
          },
          error: (error) => {},
        });
    }
  };
}
