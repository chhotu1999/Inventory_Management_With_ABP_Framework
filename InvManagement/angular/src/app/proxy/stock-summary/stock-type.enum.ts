import { mapEnumToOptions } from '@abp/ng.core';

export enum StockType {
  Inward = 0,
  Outward = 1,
}

export const stockTypeOptions = mapEnumToOptions(StockType);
