import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductDto, ProductService, UnitType } from '@proxy/products';
import { StockTransSummaryService, StockType } from '@proxy/stock-summary';

@Component({
  selector: 'app-stock-summary',
  templateUrl: './stock-summary.component.html',
  styleUrl: './stock-summary.component.scss'
})
export class StockSummaryComponent implements OnInit {
  stockSummary = { items: [], totalCount: 0 };
  isModalOpen = false;
  form: FormGroup;
  unitType = UnitType;  // Assume UnitType is an enum
  stockType = StockType; // Assume StockType is an enum
  products: ProductDto[] = [];
  constructor(
    private stockSummaryService: StockTransSummaryService,
    private fb: FormBuilder,
    private productService: ProductService
  ) {

  }

  ngOnInit() {
    this.getStockSummaryPaged(1, 10); // Fetch initial stock summaries
  }

  getStockSummaryPaged(pageNumber: number, pageSize: number) {
    this.stockSummaryService.getStockSummaryPaged(pageNumber, pageSize).subscribe((result) => {
      this.stockSummary = result;
    });
  }


  createStockSummary() {
    this.getProductList();
  }
  getProductList(){
    this.productService.getAllProducts().subscribe((products) => {
      this.products = products;
    });
    this.isModalOpen = true;
  }

  buildForm() {
    this.form = this.fb.group({
      productId: [null, Validators.required],
      unit: [{value: null, disabled:true}],
      stockQuantity: [1, Validators.required]
    })
  }

  onProductChange(productId: number): void {
    const selectedProduct = this.products.find(
      (product) => product.id === productId
    );

    if (selectedProduct) {
      // Set unit from the selected product
      this.form.controls['unit'].setValue(selectedProduct.unit);
    }
  }


  saveStockSummary() {
    if (this.form.invalid) {
      return;
    }
    // Create new stock summary
    this.stockSummaryService.addStockSummary(this.form.value).subscribe((result) => {
      this.getStockSummaryPaged(1, 10); // Refresh stock summary list
      this.isModalOpen = false;
    });

  }
}

