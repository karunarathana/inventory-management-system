import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ApiConstant } from '../const/api-constant';
import { Observable } from 'rxjs';
import { LoginResponse } from '../dto/login-respononse-dto';
import { LoginDto } from '../dto/login-dto';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  loadAccessToken(loginDto:LoginDto): Observable<LoginResponse> {
    return this.http
      .post(
        ApiConstant.API_HOST.concat(ApiConstant.API_ROOT).concat(ApiConstant.USER_LOGIN),
        loginDto,
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
