
export interface CreateSaleDto {
  customerId: number;
  salesDetails: SalesDetailDto[];
  netAmount: number;
  discount: number;
  totalAmount: number;
  remarks?: string;
}

export interface SalesDetailDto {
  salesId: number;
  productId: number;
  productName?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface SalesDto {
  salesId: number;
  invoiceDate?: string;
  customerId: number;
  customerName?: string;
  netAmount: number;
  discount: number;
  totalAmount: number;
  details: SalesDetailDto[];
}
