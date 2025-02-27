import { mapEnumToOptions } from '@abp/ng.core';

export enum GenderType {
  Male = 0,
  Female = 1,
  NonBinary = 2,
}

export const genderTypeOptions = mapEnumToOptions(GenderType);
