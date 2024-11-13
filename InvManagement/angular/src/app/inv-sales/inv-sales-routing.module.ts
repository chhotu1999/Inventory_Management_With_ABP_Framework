import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvSalesComponent } from './inv-sales.component';

const routes: Routes = [{ path: '', component: InvSalesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvSalesRoutingModule { }
