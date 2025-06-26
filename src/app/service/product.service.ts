import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ApiConstant } from '../const/api-constant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  createProduct(productDto: any): Observable<any> {
    const accessToken = localStorage.getItem('access_token');
    return this.http
      .post(
        ApiConstant.API_HOST.concat(ApiConstant.API_ROOT).concat(
          ApiConstant.CREATE_PRODUCT
        ),
        productDto,
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${accessToken}`,
          },
          responseType: 'text' as 'json',
        }
      )
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }
  //   upgaradeProduct(productDto:any): Observable<any> {
  //     return this.http
  //       .put(
  //         ApiConstant.API_HOST.concat(ApiConstant.API_ROOT).concat(ApiConstant.USER_UPDATE),
  //         productDto,
  //         {
  //           headers: {
  //             'Content-Type': 'application/json',
  //             'Access-Control-Allow-Origin': '*',
  //           },
  //         }
  //       )
  //       .pipe(
  //         map((response: any) => {
  //           return response;
  //         })
  //       );
  //   }
  searchAllProduct(): Observable<any> {
    const accessToken = localStorage.getItem('access_token');
    return this.http
      .get(
        ApiConstant.API_HOST.concat(ApiConstant.API_ROOT).concat(
          ApiConstant.VIEW_ALL_PRODUCT
        ),
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }
  searchAllProductBySingleCategory(categoryName:string): Observable<any> {
    const accessToken = localStorage.getItem('access_token');
    const params = new HttpParams().set('category',categoryName);
    return this.http
      .get(
        ApiConstant.API_HOST.concat(ApiConstant.API_ROOT).concat(
          ApiConstant.VIEW_ALL_PRODUCT_BY_CATEGORY
        ),
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${accessToken}`,
          },
          params: params,
        }
      )
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }
}
