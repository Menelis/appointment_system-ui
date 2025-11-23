import {Component, OnInit} from '@angular/core';
import {BranchService} from '../../core/services/branch.service';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {BranchDto} from '../../core/models/dto/branch-dto';

@Component({
  selector: 'app-create',
  standalone: false,
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent implements OnInit {

  newBranchForm!: FormGroup;

  constructor(private _branchService: BranchService,
              private _router: Router) {
  }
  ngOnInit(): void {
    this.newBranchForm = new FormGroup({
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
  }
  onSubmit = () => {
    if(this.newBranchForm.valid) {
      let newBranchFormValue = this.newBranchForm.value;
      let createBranchRequest = {
        name: newBranchFormValue.branchName,
        streetNo: newBranchFormValue.streetNo,
        addressLine1: newBranchFormValue.addressLine1,
        addressLine2: newBranchFormValue.addressLine2,
        cityId: newBranchFormValue.cityId,
        provinceId: newBranchFormValue.provinceId,
        postalCode: newBranchFormValue.postalCode,
        email: newBranchFormValue.emailAddress,
        faxNo: newBranchFormValue.faxNo,
        landLine: newBranchFormValue.landLine
      };
      this._branchService.createBranch(createBranchRequest).subscribe({
        next: (response) => {
          console.log(response.success);
          if(response.success) {
            this._router.navigate(['/branch/list']);
          }
        },
        error: (error) => {

        }
      })
    }
  }
}
