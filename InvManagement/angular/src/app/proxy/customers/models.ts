import type { GenderType } from './gender-type.enum';
import type { AuditedEntityDto } from '@abp/ng.core';

export interface CreateUpdateCustomerDto {
  name: string;
  gender: GenderType;
  email?: string;
  contact: string;
  address?: string;
}

export interface CustomerDto extends AuditedEntityDto<string> {
  name?: string;
  gender: GenderType;
  email?: string;
  contact?: string;
  address?: string;
}
