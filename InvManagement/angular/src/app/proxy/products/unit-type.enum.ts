import { mapEnumToOptions } from '@abp/ng.core';

export enum UnitType {
  kiloGram = 0,
  Gram = 1,
  Packet = 2,
  Piece = 3,
  Bottle = 4,
  Cartoon = 5,
}

export const unitTypeOptions = mapEnumToOptions(UnitType);
