import type { UnitType } from './unit-type.enum';
import type { CategoryType } from './category-type.enum';
import type { AuditedEntityDto } from '@abp/ng.core';

export interface CreateUpdateProductDto {
  name: string;
  code: string;
  price: number;
  unit: UnitType;
  category: CategoryType;
  description?: string;
  stockLevel: number;
}

export interface ProductDto extends AuditedEntityDto<number> {
  name?: string;
  code?: string;
  price: number;
  unit: UnitType;
  category: CategoryType;
  description?: string;
  stockLevel: number;
}
