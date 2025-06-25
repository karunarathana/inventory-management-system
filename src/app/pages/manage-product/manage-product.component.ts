import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { ProductDto } from '../../dto/product-dto';
import { ProductService } from '../../service/product.service';

interface ItemData {
  id: string;
  name: string;
  age: number;
  address: string;
}

@Component({
  selector: 'app-manage-product',
  imports: [
    FormsModule,
    NzButtonModule,
    NzDrawerModule,
    NzDatePickerModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzTableModule,
    NzTagModule,
    ReactiveFormsModule,
  ],
  templateUrl: './manage-product.component.html',
  styleUrl: './manage-product.component.css',
})
export class ManageProductComponent {
  validateProductForm!: FormGroup;

  constructor(private fb: FormBuilder,private _productService: ProductService) {
    this.validateProductForm = this.fb.group({
      productName: this.fb.control('', [Validators.required]),
      productDescription: this.fb.control('', [Validators.required]),
      productPrice: this.fb.control('', [Validators.required]),
      discountPrice: this.fb.control('', [Validators.required]),
      lastPrice: this.fb.control('', [Validators.required]),
      brandName: this.fb.control('', [Validators.required]),
      productCategory: this.fb.control('', [Validators.required]),
      productColor: this.fb.control('', [Validators.required]),
      others: this.fb.control('', [Validators.required]),
      productStock: this.fb.control('', [Validators.required]),
      warrantyPeriod: this.fb.control('', [Validators.required]),
    });
  }
  editCache: { [key: string]: { edit: boolean; data: ItemData } } = {};
  listOfData: ItemData[] = [];

  startEdit(id: string): void {
    this.editCache[id].edit = true;
  }

  cancelEdit(id: string): void {
    const index = this.listOfData.findIndex((item) => item.id === id);
    this.editCache[id] = {
      data: { ...this.listOfData[index] },
      edit: false,
    };
  }

  saveEdit(id: string): void {
    const index = this.listOfData.findIndex((item) => item.id === id);
    Object.assign(this.listOfData[index], this.editCache[id].data);
    this.editCache[id].edit = false;
  }

  updateEditCache(): void {
    this.listOfData.forEach((item) => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item },
      };
    });
  }

  ngOnInit(): void {
    const data: ItemData[] = [];
    for (let i = 0; i < 100; i++) {
      data.push({
        id: `${i}`,
        name: `Edward ${i}`,
        age: 32,
        address: `London Park no. ${i}`,
      });
    }
    this.listOfData = data;
    this.updateEditCache();
  }
  visible = false;

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
  submitForm(): void {
    const productDto = new ProductDto();
    productDto.productName = this.validateProductForm.value.productName;
    productDto.productDescription =
      this.validateProductForm.value.productDescription;
    productDto.productPrice = this.validateProductForm.value.productPrice;
    productDto.discountPrice = this.validateProductForm.value.discountPrice;
    productDto.lastPrice = this.validateProductForm.value.lastPrice;
    productDto.brandName = this.validateProductForm.value.brandName;
    productDto.productCategory = this.validateProductForm.value.productCategory;
    productDto.productColor = this.validateProductForm.value.productColor;
    productDto.others = this.validateProductForm.value.others;
    productDto.productStock = this.validateProductForm.value.productStock;
    productDto.warrantyPeriod = this.validateProductForm.value.warrantyPeriod;

    console.log('Product DTO:', productDto);

    if (this.validateProductForm.valid) {
      console.log('submit', this.validateProductForm.value);
    } else {
      Object.values(this.validateProductForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
