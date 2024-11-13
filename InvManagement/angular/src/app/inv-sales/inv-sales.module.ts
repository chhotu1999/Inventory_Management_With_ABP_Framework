import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { InvSalesRoutingModule } from './inv-sales-routing.module';
import { InvSalesComponent } from './inv-sales.component';
import { SharedModule } from '../shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [
    InvSalesComponent
  ],
  imports: [
    SharedModule,
    InvSalesRoutingModule,
    MatTableModule,
    MatFormFieldModule,
  ]
})
export class InvSalesModule { }
