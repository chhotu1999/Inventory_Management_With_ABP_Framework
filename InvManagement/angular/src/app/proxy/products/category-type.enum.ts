import { mapEnumToOptions } from '@abp/ng.core';

export enum CategoryType {
  Food = 0,
  Clothing = 1,
  Luxory = 2,
}

export const categoryTypeOptions = mapEnumToOptions(CategoryType);
