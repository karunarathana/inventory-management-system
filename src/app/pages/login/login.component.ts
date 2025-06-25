import { Component, inject } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { LoginService } from '../../service/login.service';
import { LoginDto } from '../../dto/login-dto';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    NzButtonModule,
    NzCheckboxModule,
    NzFormModule,
    NzInputModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private fb = inject(NonNullableFormBuilder);
  constructor(
    private message: NzMessageService,
    private router: Router,
    private _loginService: LoginService
  ) {}
  validateForm = this.fb.group({
    username: this.fb.control('', [Validators.required]),
    uPassword: this.fb.control('', [Validators.required]),
    remember: this.fb.control(true),
  });

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);

      const loginDto = new LoginDto();
      loginDto.userEmail = this.validateForm.value.username?.toString() || '';
      loginDto.password = this.validateForm.value.uPassword?.toString() || '';

      this._loginService.loadAccessToken(loginDto).subscribe((data) => {
        console.log('*******************');
        console.log(data);
        console.log('*******************');

        if (data.message === 'User password is incorrect: ') {
          this.createMessage('error');
          console.log('User password is incorrect: ');
          this.validateForm.controls['uPassword'].setErrors({
            incorrect: true,
          });
          this.validateForm.controls['uPassword'].markAsDirty();
          return;
        }
        if (data.message === 'User credential is correct') {
          localStorage.setItem('loggedUserName', data.username);
          localStorage.setItem('access_token', data.newAccessToken);
          localStorage.setItem('refresh_token', data.newRefreshToken);
          this.router.navigate(['/welcome']);
        }
      });
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
  createMessage(type: string): void {
    this.message.create(type, `This is a message of ${type}`);
  }
}
