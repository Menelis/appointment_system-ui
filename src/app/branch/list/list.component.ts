import {Component, Inject, OnInit} from '@angular/core';
import {RepositoryService} from '../../core/services/repository.service';
import {BranchService} from '../../core/services/branch.service';
import {BranchDto} from '../../core/models/dto/branch-dto';
import {ApiResponse} from '../../core/models/api-response';
import {PagedResult} from '../../core/models/paged-result';
import {Router} from '@angular/router';
import {APP_CONFIG_TOKEN, AppConfig} from '../../core/models/app-config';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {

  pagedBranchResult!: PagedResult<BranchDto[]>;
  pageSize!: number;
  searchForm!: FormGroup
  currentPage = 1;
  constructor(private _branchService: BranchService,
              private _router: Router,
              @Inject(APP_CONFIG_TOKEN) appConfig: AppConfig) {
    this.pageSize = appConfig?.defaultUiSettings?.pageSize;
  }
  ngOnInit(): void {
    this.searchForm = new FormGroup({
      searchTerm: new FormControl()
    });
    this.loadBranches(this.currentPage, this.pageSize);
  }

  onSubmit = () => {
    let searchTerm = this.searchForm.value.searchTerm;
    // Only loadBranches when the search filter is supplied
    if(searchTerm) {
      this.loadBranches(this.currentPage, this.pageSize, searchTerm);
    }
  }

  routeToEdit = (id: number) => {
    this._router.navigate(['/branch/edit/'+ id]);
  }

  loadBranches = (pageNo: number, pageSize: number, searchTerm?: string) => {
    this._branchService.getPaginatedBranches(pageNo, pageSize, searchTerm).subscribe({
      next: (response) => {
        this.pagedBranchResult = response;
      },
      error: (error) => {
        //TODO: Error handler with http Interceptor
      }
    })
  }
  onSelectedPageChange = (pageNo: number) => {
    this.currentPage = pageNo;
    this.loadBranches(this.currentPage, this.pageSize);
  }
}
