import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { StorageService } from './../../services/storage.service';
import { AuthConstants } from '../../config/auth-constants';
import { ToastService } from './../../services/toast.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  public postData = {
    name: '',
    email: '',
    password: '',
    c_password: ''
  };

  constructor(private http: HttpClient, private router: Router, private authService: AuthService, private storageService: StorageService, private toastService: ToastService) { }

  ngOnInit() {
  }

  validateInputs() {
    let name = this.postData.name.trim();
    let email = this.postData.email.trim();
    let password = this.postData.password.trim();
    let c_password = this.postData.c_password.trim();
    return (
    this.postData.name &&
    this.postData.email &&
    this.postData.password &&
    email.length > 0 &&
    password.length > 0 &&
    c_password.length > 0
    );
  }

  signupAction() {
    if (this.validateInputs()) {
      if (this.postData.password == this.postData.c_password) {
        this.authService.signup(this.postData).subscribe(
        (response: any) => {
          if (response.result) {
            this.router.navigate(['login']);
          }
        },
        (error: any) => {
          console.log(error);
          this.toastService.presentToast('Email has already been taken.');
        }
        );
      } else {
        this.toastService.presentToast('Password do not match.');
      }
    } else {
      this.toastService.presentToast('Please complete the information above.');
    }
  }

}
