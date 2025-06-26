import { Component } from '@angular/core';
import { NzModalService, NzModalModule } from 'ng-zorro-antd/modal';
import { ProductModalComponent } from '../../modal/product-modal/product-modal.component';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../service/product.service';
import { NzTagModule } from 'ng-zorro-antd/tag';

interface ProductData {
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
  selector: 'app-product',
  imports: [NzModalModule, CommonModule,NzTagModule],
  standalone: true,
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  listOfData: ProductData[] = [];
  imageUrl: string = 'charging.png';

  constructor(
    private modal: NzModalService,
    private _productService: ProductService
  ) {}

  openModal(productData: ProductData) {
    this.modal.create({
      nzTitle: 'Product Modal from A',
      nzStyle: { top: '20px' },
      nzWidth: '600px',
      nzContent: ProductModalComponent,
      nzData: {
        productName: productData.productName,
        productDescription: productData.productDescription,
        productPrice: productData.productPrice,
        discountPrice: productData.discountPrice,
        lastPrice: productData.lastPrice,
        brandName: productData.brandName,
        productCreateData: new Date(productData.productCreateData),
        productCategory: productData.productCategory,
        productColor: productData.productColor,
        others: productData.others,
        productStock: productData.productStock,
        warrantyPeriod: productData.warrantyPeriod,
      },
    });
  }
  ngOnInit(): void {
    this.loadAllProductByProductCategory('Battery');
  }

  loadAllProductByProductCategory(category: string) {
    switch (category) {
      case 'Battery':
        this.imageUrl = 'charging.png';
        break;
      case 'Smartphone':
        this.imageUrl = 'mobile-apps.png';
        break;
      default:
        this.imageUrl = 'charging.png';
        break;
    }
    this._productService
      .searchAllProductBySingleCategory(category)
      .subscribe((response) => {
        console.log('*******************');
        console.log(response);
        console.log('*******************');
        this.listOfData = response.items.map((item: any) => {
          return {
            productID: item.productID,
            productName: item.productName,
            productDescription: item.productDescription,
            productPrice: item.productPrice,
            discountPrice: item.discountPrice,
            lastPrice: item.lastPrice,
            brandName: item.brandName,
            productCreateData: new Date(item.productCreateData),
            productCategory: item.productCategory,
            productColor: item.productColor,
            others: item.others,
            productStock: item.productStock,
            warrantyPeriod: item.warrantyPeriod,
          };
        });
      });
  }
}
