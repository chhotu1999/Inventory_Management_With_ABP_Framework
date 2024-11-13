import { ListService, PagedResultDto, validateRequired } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { CustomerDto, CustomerService, genderTypeOptions } from '@proxy/customers';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss',
  providers: [ListService] // for srting and pagination
})
export class CustomerComponent implements OnInit {

  customer = { items: [], totalcount: 0 } as PagedResultDto<CustomerDto>
  isModalOpen = false;
  form: FormGroup;
  genderType = genderTypeOptions;
  selectedCustomer = {} as CustomerDto;


  constructor(
    public readonly list: ListService,
    private customerService: CustomerService,
    private fb: FormBuilder,
    private confirmation: ConfirmationService
  ) {

  }

  ngOnInit() {
    const customerStreamCreator = (query) => this.customerService.getList(query);
    this.list.hookToQuery(customerStreamCreator).subscribe((response) => {
      this.customer = response
    })
  }

  createCustomer() {
    this.selectedCustomer = {} as CustomerDto;
    this.buildForm();
    this.isModalOpen = true;
  }

  buildForm() {
    this.form = this.fb.group({
      name: [this.selectedCustomer.name || '', Validators.required],
      gender: [this.selectedCustomer.gender || '', Validators.required],
      email: [this.selectedCustomer.email || null],
      contact: [this.selectedCustomer.contact || '', Validators.required],
      address: [this.selectedCustomer.address || null]
    })
  }

  save() {
    if (this.form.invalid) {
      return;
    }

    this.customerService.create(this.form.value).subscribe(() => {
      this.isModalOpen = false;
      this.form.reset();
      this.list.get();
    })
  }

  editCustomer(id: number) {
    this.customerService.get(id).subscribe((customer) => {
      this.selectedCustomer = customer;
      this.buildForm();
      this.isModalOpen = true;
    })
  }

  deleteCustomer(id: number) {
    this.confirmation.warn('::AreYouSureToDelete', '::AreTouSure').subscribe((status) => {
      if (status === Confirmation.Status.confirm) {
        this.customerService.delete(id).subscribe(() => this.list.get())
      }
    });
  }

}
