import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvSalesComponent } from './inv-sales.component';

describe('InvSalesComponent', () => {
  let component: InvSalesComponent;
  let fixture: ComponentFixture<InvSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InvSalesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
