import type { UnitType } from '../products/unit-type.enum';
import type { StockType } from '../stock-summary/stock-type.enum';

export interface CreateStockSummaryDto {
  productId: number;
  unit: UnitType;
  stockQuantity: number;
}

export interface StockTransSummaryDto {
  stockSumamryId: number;
  productId: number;
  productName?: string;
  stockMode: StockType;
  stockQuantity: number;
  unit: UnitType;
  balanceQuantity: number;
}
