import type { CreateStockSummaryDto, StockTransSummaryDto } from './models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { ResponseResult } from '../shared-model/models';

@Injectable({
  providedIn: 'root',
})
export class StockTransSummaryService {
  apiName = 'Default';
  

  addStockSummary = (input: CreateStockSummaryDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, StockTransSummaryDto>({
      method: 'POST',
      url: '/api/app/stock-trans-summary/stock-summary',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  getStockSummaryPaged = (pageNumber: number, pageSize: number, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ResponseResult<StockTransSummaryDto>>({
      method: 'GET',
      url: '/api/app/stock-trans-summary/stock-summary-paged',
      params: { pageNumber, pageSize },
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}
