import { Component, Inject, Input } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NZ_MODAL_DATA, NzModalModule } from 'ng-zorro-antd/modal';

export interface Product {
  productID: string;
  productName: string;
  productDescription: string;
  productPrice: string;
  discountPrice: string;
  lastPrice: string;
  brandName: string;
  productCreateData: Date;
  productCategory: string;
  productColor: string;
  others: string;
  productStock: string;
  warrantyPeriod: string;
}

@Component({
  selector: 'app-product-modal',
  imports: [NzButtonModule, NzModalModule],
  templateUrl: './product-modal.component.html',
  styleUrl: './product-modal.component.css',
})
export class ProductModalComponent {
  constructor(@Inject(NZ_MODAL_DATA) public productData:Product) {}
  isVisibleTop = false;

  showModal(): void {
    this.isVisibleTop = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisibleTop = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisibleTop = false;
  }
}
