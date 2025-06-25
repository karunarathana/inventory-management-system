import { Component, Inject, Input } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NZ_MODAL_DATA, NzModalModule } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-product-modal',
  imports: [NzButtonModule, NzModalModule],
  templateUrl: './product-modal.component.html',
  styleUrl: './product-modal.component.css',
})
export class ProductModalComponent {
   constructor(@Inject(NZ_MODAL_DATA) public data: { title: string; message: string }) {}
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
