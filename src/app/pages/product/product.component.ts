import { Component } from '@angular/core';
import { NzModalService,NzModalModule  } from 'ng-zorro-antd/modal';
import { ProductModalComponent } from '../../modal/product-modal/product-modal.component';
import { title } from 'node:process';

@Component({
  selector: 'app-product',
  imports: [NzModalModule],
  standalone: true,
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  constructor(private modal: NzModalService) {}

  openModal(price:string) {
    this.modal.create({
      nzTitle: 'Product Modal from A',
      nzStyle: { top: '20px' },
      nzContent: ProductModalComponent,
      nzData : {
        title : price,
        message: 'This message was passed from AnotherComponent'
      },
    });
  }
}
