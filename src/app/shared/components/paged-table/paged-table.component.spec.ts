import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagedTableComponent } from './paged-table.component';

describe('PagedTableComponent', () => {
  let component: PagedTableComponent;
  let fixture: ComponentFixture<PagedTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [PagedTableComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagedTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
