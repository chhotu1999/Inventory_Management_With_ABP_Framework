import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockSummaryComponent } from './stock-summary.component';

const routes: Routes = [{ path: '', component: StockSummaryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StockSummaryRoutingModule { }
