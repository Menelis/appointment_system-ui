import {Component, OnInit} from '@angular/core';
import {RepositoryService} from '../../core/services/repository.service';
import {BranchService} from '../../core/services/branch.service';
import {BranchDto} from '../../core/models/dto/branch-dto';
import {ApiResponse} from '../../core/models/api-response';
import {PagedResult} from '../../core/models/paged-result';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {

  pagedBranchResult!: PagedResult<BranchDto[]>;

  constructor(private _branchService: BranchService,
              private _router: Router) {}
  ngOnInit(): void {
    this.loadBranches();
  }

  routeToEdit = (id: number) => {
    this._router.navigate(['/branch/edit/'+ id]);
  }

  loadBranches = () => {
    this._branchService.getAllBranches().subscribe({
      next: (response) => {
        this.pagedBranchResult = response;
      },
      error: (error) => {
        //TODO: Error handler with http Interceptor
      }
    })
  }
}
