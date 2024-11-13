import { validateRequired } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerDto, CustomerService } from '@proxy/customers';
import { SalesDetailDto } from '@proxy/inv-sales/models';
import { ProductDto, ProductService } from '@proxy/products';
import { InvSalesService } from '@proxy/sales';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-inv-sales',
  templateUrl: './inv-sales.component.html',
  styleUrl: './inv-sales.component.scss'
})
export class InvSalesComponent implements OnInit {
  invSales = { items: [], totalCount: 0 };
  isModalOpen = false;
  form: FormGroup;
  products: ProductDto[] = [];
  customers: CustomerDto[] = [];
  salesDetailDataSource!: MatTableDataSource<any>;
  emptyData = new MatTableDataSource([{ empty: "row" }]);
  displayedColumns: string[] = ['product', 'unit', 'quantity', 'rate', 'amount'];
  basicAmount: number = 0;
  discountAmount: number = 0;
  netpayableAmount: number = 0;

  constructor(
    private invSalesService: InvSalesService,
    private fb: FormBuilder,
    private productService: ProductService,
    private customerService: CustomerService,
    private snackBar: MatSnackBar
  ) {

  }
  ngOnInit() {
    this.getInvSalesPaged(1, 10); // Fetch initial sales
  }

  getInvSalesPaged(pageNumber: number, pageSize: number) {
    this.invSalesService.getSalesSummaryPaged(pageNumber, pageSize).subscribe((result) => {
      this.invSales = result;
    });
  }

  createSales() {
    this.getCustomerList();
    this.getProductList();
    this.isModalOpen = true;
  }

  getCustomerList() {
    this.customerService.getAllCustomers().subscribe((customers) => {
      this.customers = customers;
    });
  }

  getProductList() {
    this.productService.getAllProducts().subscribe((products) => {
      this.products = products;
    });
  }

  buildForm() {
    this.form = this.fb.group({
      customerId: [null, Validators.required],
      netAmount: [{ value: this.basicAmount, disabled: true }, Validators.required],
      discountPercent: [0, Validators.required],
      discount: [this.discountAmount, Validators.required],
      totalAmount: [{ value: this.netpayableAmount, disabled: true }, Validators.required],
      details: this.fb.array([])
    })
  }

  get salesDetailFormArray() {
    return this.form.get('details') as FormArray;
  }

  createSalesDetailsControl(salesDetail?: SalesDetailDto) {
    return this.fb.group({
      productId: [salesDetail?.productId || null],
      unit: [{ value: null, disabled: true }],
      quantity: [salesDetail?.quantity || 1],
      unitPrice: [salesDetail?.unitPrice || 1],
      totalPrice: [salesDetail?.totalPrice || 1]
    })
  }

  onProductChange(productId: number, index: number) {
    const selectedProduct = this.products.find(product => product.id === productId);
    if (selectedProduct) {
      this.salesDetailFormArray.controls[index].get('unit')?.patchValue(selectedProduct.unit);
      this.salesDetailFormArray.controls[index].get('unitPrice')?.patchValue(selectedProduct.price);
    }
  }

  calculateBasicAmount() {
    this.basicAmount = this.salesDetailFormArray.controls
      .map((control) => control.get('totalPrice')?.value ?? 0) // Map the amounts, defaulting to 0
      .reduce((sum, current) => sum + current, 0);
    this.netpayableAmount = this.basicAmount;
  }

  onDiscountChange() {
    const discountPercent = this.form.get('discountPercent').value || 0;
    const maxDiscount = this.basicAmount > 500 ? 10 : 5;
    if (discountPercent <= maxDiscount) {
      const discountAmount = (discountPercent / 100) * this.basicAmount;
      this.discountAmount = discountAmount;
      this.netpayableAmount = this.basicAmount - this.discountAmount;
    }
    else {
      this.form.get('discountPercent').setValue(0);
      this.discountAmount = 0;
      this.netpayableAmount = this.basicAmount;
      this.snackBar.open('Discount exceeds allowed maximum', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
    }

  }

  calculatenetPayable() {
    this.calculateBasicAmount();
    this.netpayableAmount = this.basicAmount - this.discountAmount;
  }

  refreshSalesDetailTable() {
    this.salesDetailDataSource = new MatTableDataSource<any>(this.salesDetailFormArray.controls);
    this.salesDetailDataSource._updateChangeSubscription();
  }

  removeSalesDetail(index: number) {
    this.salesDetailFormArray.removeAt(index);
    this.refreshSalesDetailTable();
    this.calculatenetPayable();
  }

  onChangeRateQuantity(index: number) {
    const productId = this.salesDetailFormArray.controls[index].get('productId')?.value;
    const qty = this.salesDetailFormArray.controls[index].get('quantity')?.value;
    const rate = this.salesDetailFormArray.controls[index].get('unitPrice')?.value
    const selectedProduct = this.products.find(product => product.id === productId);
    if(selectedProduct.stockLevel >= qty){
      this.salesDetailFormArray.controls[index].get('amount')?.patchValue(qty * rate);
    }
    else{
      this.snackBar.open('Stock Quanntitt Exceed', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
       this.salesDetailFormArray.controls[index].get('quantity')?.patchValue(1);
       this.salesDetailFormArray.controls[index].get('amount')?.patchValue(qty * rate);
    }
    this.calculatenetPayable();
  }


  addSalesDetailControl() {
    const control = this.createSalesDetailsControl();
    this.salesDetailFormArray.push(control);
    this.refreshSalesDetailTable();
    this.calculatenetPayable();
  }

  saveSales() {
    if (this.form.invalid) {
      return;
    }
    this.invSalesService.createSale(this.form.value).subscribe(() => {
      this.isModalOpen = false;
      this.form.reset();
      this.getInvSalesPaged(1, 10);
    })
  }
}
