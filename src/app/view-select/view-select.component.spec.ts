import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSelectComponent } from './view-select.component';

describe('ViewSelectComponent', () => {
  let component: ViewSelectComponent;
  let fixture: ComponentFixture<ViewSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
