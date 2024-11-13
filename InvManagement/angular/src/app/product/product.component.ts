import { ListService, PagedResultDto } from '@abp/ng.core';
import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { categoryTypeOptions, ProductDto, ProductService, unitTypeOptions } from '@proxy/products';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
  providers: [ListService]
})
export class ProductComponent implements OnInit {

  product = { items: [], totalcount: 0 } as PagedResultDto<ProductDto>
  isModalOpen = false;
  form: FormGroup;
  categoryType = categoryTypeOptions;
  unitType = unitTypeOptions;
  selectedProduct = {} as ProductDto;
  filteredProducts: ProductDto[] = []; // Store the filtered products
  searchText: string = ''; // Store the search text


  constructor(
    public readonly list: ListService,
    private productService: ProductService,
    private fb: FormBuilder,
    private confirmation: ConfirmationService
  ) {

  }


  ngOnInit() {
    const productStreamCreator = (query) => this.productService.getList(query);
    this.list.hookToQuery(productStreamCreator).subscribe((response) => {
      this.product = response;
      this.filteredProducts = this.product.items;
    })
  }

  createProduct() {
    this.selectedProduct = {} as ProductDto;
    this.buildForm();
    this.isModalOpen = true;
  }

  buildForm() {
    this.form = this.fb.group({
      name: [this.selectedProduct.name || '', Validators.required],
      code: [this.selectedProduct.code || '', Validators.required],
      price: [this.selectedProduct.price || 1, Validators.required],
      unit: [this.selectedProduct.unit || '', Validators.required],
      category: [this.selectedProduct.category || Validators.required],
      description: [this.selectedProduct.category || null],
      stockLevel: [this.selectedProduct.stockLevel || 0]
    })
  }

  save() {
    if (this.form.invalid) {
      return;
    }

    this.productService.create(this.form.value).subscribe(() => {
      this.isModalOpen = false;
      this.form.reset();
      this.list.get();
    })
  }

  editProduct(id: number) {
    this.productService.get(id).subscribe((product) => {
      this.selectedProduct = product;
      this.buildForm();
      this.isModalOpen = true;
    })
  }

  deleteCustomer(id: number) {
    this.confirmation.warn('::AreYouSureToDelete', '::AreTouSure').subscribe((status) => {
      if (status === Confirmation.Status.confirm) {
        this.productService.delete(id).subscribe(() => this.list.get())
      }
    });
  }

  filterProducts() {
    this.filteredProducts = this.product.items.filter(product =>
      (product.name && product.name.toLowerCase().includes(this.searchText.toLowerCase())) ||
      (product.code && product.code.toLowerCase().includes(this.searchText.toLowerCase())) ||
      (product.category && product.category.toString().toLowerCase().includes(this.searchText.toLowerCase())) ||
      (product.unit && product.unit.toString().toLowerCase().includes(this.searchText.toLowerCase())) ||
      (product.description && product.description.toLowerCase().includes(this.searchText.toLowerCase()))
    );

  }
}
