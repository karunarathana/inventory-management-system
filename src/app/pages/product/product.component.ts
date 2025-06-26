import { Component } from '@angular/core';
import { NzModalService, NzModalModule } from 'ng-zorro-antd/modal';
import { ProductModalComponent } from '../../modal/product-modal/product-modal.component';
import { title } from 'node:process';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-product',
  imports: [NzModalModule],
  standalone: true,
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  constructor(
    private modal: NzModalService,
    private _productService: ProductService
  ) {}

  openModal(price: string) {
    this.modal.create({
      nzTitle: 'Product Modal from A',
      nzStyle: { top: '20px' },
      nzContent: ProductModalComponent,
      nzData: {
        title: price,
        message: 'This message was passed from AnotherComponent',
      },
    });
  }

  loadAllProductByProductCategory(category: string) {
    this._productService
      .searchAllProductBySingleCategory(category)
      .subscribe((response) => {
        console.log('*******************');
        console.log(response);
        console.log('*******************');
      });
  }
}
