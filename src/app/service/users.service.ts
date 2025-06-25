import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ApiConstant } from '../const/api-constant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  createUser(userDTO: any): Observable<any> {
    const accessToken = localStorage.getItem('access_token');
    return this.http
      .post(
        ApiConstant.API_HOST.concat(ApiConstant.API_ROOT).concat(
          ApiConstant.USER_CREATE
        ),
        userDTO,
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

  searchAllUsers(): Observable<any> {
    const accessToken = localStorage.getItem('access_token');
    return this.http
      .get(
        ApiConstant.API_HOST.concat(ApiConstant.API_ROOT).concat(
          ApiConstant.USER_SEARCH_ALL
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

  deleteUser(userId: number): Observable<any> {
    const accessToken = localStorage.getItem('access_token');
    const params = new HttpParams().set('userId', userId.toString());

    return this.http
      .delete(
        ApiConstant.API_HOST.concat(ApiConstant.API_ROOT).concat(
          ApiConstant.DELETE_USER
        ),
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          params: params,
          responseType: 'text' as const,
        }
      )
      .pipe(
        map((response: any) => {
          console.log('User deleted successfully:', response);
          return response;
        })
      );
  }
}
