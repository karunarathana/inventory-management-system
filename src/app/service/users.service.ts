import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ApiConstant } from '../const/api-constant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  createUser(userDTO:any): Observable<any> {
    return this.http
      .post(
        ApiConstant.API_HOST.concat(ApiConstant.API_ROOT).concat(ApiConstant.USER_CREATE),
        userDTO,
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      )
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }
  
  searchAllUsers(): Observable<any> {
    return this.http
      .get(
        ApiConstant.API_HOST.concat(ApiConstant.API_ROOT).concat(ApiConstant.USER_SEARCH_ALL),
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      )
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }
}
