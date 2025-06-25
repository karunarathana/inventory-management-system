import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { UserDto } from '../../dto/user-dto';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { UserService } from '../../service/users.service';

interface ItemData {
  id: string;
  userName: string;
  userEmail: string;
  password: string;
  role: string;
}

@Component({
  selector: 'app-manage-user',
  imports: [
    FormsModule,
    NzButtonModule,
    NzDrawerModule,
    NzDatePickerModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzTableModule,
    NzTagModule,
    ReactiveFormsModule,
  ],
  templateUrl: './manage-user.component.html',
  styleUrl: './manage-user.component.css',
})
export class ManageUserComponent {
  visible = false;
  test = false;
  validateUserForm!: FormGroup;

  constructor(private fb: FormBuilder, private _userService: UserService) {
    this.validateUserForm = this.fb.group({
      username: this.fb.control('', [Validators.required]),
      userEmail: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required]),
      confirmPassword: this.fb.control('', [Validators.required]),
      userRole: this.fb.control('', [Validators.required]),
    });
  }

  open(): void {
    this.visible = true;
  }
  close(): void {
    this.visible = false;
  }

  submitForm(): void {
    if (this.validateUserForm.valid) {
      if (
        this.validateUserForm.value.password !==
        this.validateUserForm.value.confirmPassword
      ) {
        this.test = true;
        this.validateUserForm.controls['confirmPassword'].setErrors({
          mismatch: true,
        });
        this.validateUserForm.controls['confirmPassword'].markAsDirty();
      } else {
        const userDto = new UserDto();
        userDto.userName = this.validateUserForm.value.username;
        userDto.userEmail = this.validateUserForm.value.userEmail;
        userDto.password = this.validateUserForm.value.password;
        userDto.role = this.validateUserForm.value.userRole;

        console.log('submit', this.validateUserForm.value);
        this._userService.createUser(userDto).subscribe((data) => {
          console.log('*******************');
          console.log(data);
          console.log('*******************');
        });
      }
    } else {
      Object.values(this.validateUserForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
  editCache: { [key: string]: { edit: boolean; data: ItemData } } = {};
  listOfData: ItemData[] = [];

  startEdit(id: string): void {
    this.editCache[id].edit = true;
  }

  cancelEdit(id: string): void {
    const index = this.listOfData.findIndex((item) => item.id === id);
    this.editCache[id] = {
      data: { ...this.listOfData[index] },
      edit: false,
    };
  }

  saveEdit(id: string): void {
    const index = this.listOfData.findIndex((item) => item.id === id);
    Object.assign(this.listOfData[index], this.editCache[id].data);
    this.editCache[id].edit = false;
  }

  updateEditCache(): void {
    this.listOfData.forEach((item) => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item },
      };
    });
  }

  ngOnInit(): void {
    this._userService.searchAllUsers().subscribe((data) => {
      console.log('*******************');
      console.log(data);
      console.log('*******************');

      // Transform server response to ItemData[]
      const userData: ItemData[] = data.map((user: any, index: number) => ({
        // id: user.id,
        // name: user.userName,
        // age: user.email || 32, // fallback if no age
        // address: user.address || `London Park no. ${index}`,
        id: user.id,
        userName: user.userName,
        userEmail: user.email,
        password: user.password,
      }));

      this.listOfData = userData;
      this.updateEditCache();
    });
  }
}
