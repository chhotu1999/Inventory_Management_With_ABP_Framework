import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { CreateSaleDto, SalesDto } from '../inv-sales/models';
import type { ResponseResult } from '../shared-model/models';

@Injectable({
  providedIn: 'root',
})
export class InvSalesService {
  apiName = 'Default';
  

  createSale = (input: CreateSaleDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, SalesDto>({
      method: 'POST',
      url: '/api/app/inv-sales/sale',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  getSalesSummaryPaged = (pageNumber: number, pageSize: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ResponseResult<SalesDto>>({
      method: 'GET',
      url: '/api/app/inv-sales/sales-summary-paged',
      params: { pageNumber, pageSize },
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
