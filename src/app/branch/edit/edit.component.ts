import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BranchDto} from '../../core/models/dto/branch-dto';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BranchService} from '../../core/services/branch.service';

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
  constructor(private _route: ActivatedRoute,
              private _branchService: BranchService) {
    this.id = Number(this._route.snapshot.paramMap.get('id') || 0);
  }
  ngOnInit(): void {
    this.updateBranchForm = new FormGroup({
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

  onSubmit = () => {
    if(!this.updateBranchForm.valid) {

    }
  }
}
