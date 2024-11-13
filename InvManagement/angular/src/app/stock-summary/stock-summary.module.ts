import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StockSummaryRoutingModule } from './stock-summary-routing.module';
import { StockSummaryComponent } from './stock-summary.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    StockSummaryComponent
  ],
  imports: [
    SharedModule,
    StockSummaryRoutingModule
  ]
})
export class StockSummaryModule { }
