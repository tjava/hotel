import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { StorageService } from './../../services/storage.service';
import { AuthConstants } from '../../config/auth-constants';
import { ToastService } from './../../services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public postData = {
    email: '',
    password: ''
  };

  constructor(private http: HttpClient, private router: Router, private authService: AuthService, private storageService: StorageService, private toastService: ToastService) { }

  ngOnInit() {
  }

  validateInputs() {
    let email = this.postData.email.trim();
    let password = this.postData.password.trim();
    return (
    this.postData.email &&
    this.postData.password &&
    email.length > 0 &&
    password.length > 0
    );
  }

  loginAction() {
    if (this.validateInputs()) {
      this.authService.login(this.postData).subscribe(
      (response: any) => {
        if (response.user) {
          // Storing the User data.
          this.storageService.store(AuthConstants.AUTH, response.user);
          this.router.navigate(['home']);
        } else {
          this.toastService.presentToast('incorrect password.');
        }
      },
      (error: any) => {
        this.toastService.presentToast('Incorrect credentials.');
      }
      );
    } else {
      this.toastService.presentToast('Please complete the information above.');
    }
  }

}
