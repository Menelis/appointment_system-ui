import {Component, Inject, OnInit} from '@angular/core';
import {RepositoryService} from '../../core/services/repository.service';
import {BranchService} from '../../core/services/branch.service';
import {BranchDto} from '../../core/models/dto/branch-dto';
import {ApiResponse} from '../../core/models/api-response';
import {PagedResult} from '../../core/models/paged-result';
import {Router} from '@angular/router';
import {APP_CONFIG_TOKEN, AppConfig} from '../../core/models/app-config';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {

  pagedBranchResult!: PagedResult<BranchDto[]>;
  pageSize!: number;
  constructor(private _branchService: BranchService,
              private _router: Router,
              @Inject(APP_CONFIG_TOKEN) appConfig: AppConfig) {
    this.pageSize = appConfig?.defaultUiSettings?.pageSize;
  }
  ngOnInit(): void {
    this.loadBranches(1, this.pageSize);
  }

  routeToEdit = (id: number) => {
    this._router.navigate(['/branch/edit/'+ id]);
  }

  loadBranches = (pageNo: number, pageSize: number) => {
    this._branchService.getPaginatedBranches(pageNo, pageSize).subscribe({
      next: (response) => {
        this.pagedBranchResult = response;
      },
      error: (error) => {
        //TODO: Error handler with http Interceptor
      }
    })
  }
  onSelectedPageChange = (pageNo: number) => {
    this.loadBranches(pageNo, this.pageSize);
  }
}
