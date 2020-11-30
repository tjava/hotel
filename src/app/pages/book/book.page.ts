import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { StorageService } from './../../services/storage.service';
import { AuthConstants } from '../../config/auth-constants';
import { ToastService } from './../../services/toast.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.page.html',
  styleUrls: ['./book.page.scss'],
})
export class BookPage implements OnInit {

  id: any;
  data: any;
  branch: any;
  address: any;
  image: any;
  d_type: any;
  no: any;
  price: any;

  public postData = {
    user_id: '',
    branch_name: '',
    branch_address: '',
    room_no: '',
    room_type: '',
    price: '',
    days: '',
    start_at: '',
    end_at: ''
  };

  today;
  result = 0;

  public authUser: any;

  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient, private router: Router, private authService: AuthService, private storageService: StorageService, private toastService: ToastService) { 

    this.id = activatedRoute.snapshot.paramMap.get('id');

    this.today = new Date().toISOString();
    
    this.http.get('https://bluewave.tk/api/allrooms/' + this.id)
      .subscribe(data => {
        this.data = data;
        this.branch = this.data.branch_name;
        this.address = this.data.branch_address;
        this.image = this.data.room_image;
        this.d_type = this.data.room_type;
        this.no = this.data.room_no;
        this.price = this.data.price;

        this.postData.branch_name = this.data.branch_name;
        this.postData.branch_address = this.data.branch_address;
        this.postData.room_no = this.data.room_no;
        this.postData.room_type = this.data.room_type;
        this.postData.price = this.data.price;

    });


  }

  ngOnInit() {
    this.authService.userData$.subscribe((response:any) => {
      this.authUser = response;
      this.postData.user_id = this.authUser.id;
    });
  }

  book() {

    this.postData.days = this.result.toString();
    console.log(this.postData);

    this.authService.book(this.postData).subscribe(
      (response: any) => {
        if (response.result) {
          this.router.navigate(['home']);
          this.toastService.presentToast('Room successfully booked');
        }
      },
      (error: any) => {
        this.toastService.presentToast('Network Error.');
    });

  }

  calDate() {

    if (this.postData.start_at && this.postData.end_at) {

      let date1 = new Date(this.postData.start_at);
      let date2 = new Date(this.postData.end_at);

      let days =  date2.getTime() - date1.getTime();

      let result = Math.round(days / (1000 * 3600 * 24));

      this.result = result;
    } else {
      this.result = 0;
    }
  }

}
