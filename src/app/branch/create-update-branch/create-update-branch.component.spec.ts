import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateBranchComponent } from './create-update-branch.component';

describe('CreateUpdateBranchComponent', () => {
  let component: CreateUpdateBranchComponent;
  let fixture: ComponentFixture<CreateUpdateBranchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateUpdateBranchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUpdateBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
