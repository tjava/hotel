import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.page.html',
  styleUrls: ['./receipt.page.scss'],
})
export class ReceiptPage implements OnInit {

  public authUser: any;

  id: any;
  data: any;
  name: any;
  address: any;
  days: any;
  d_type: any;
  no: any;
  price: any;
  start_at: any;
  end_at: any;

  constructor(private http: HttpClient, private auth: AuthService) { 

    this.auth.userData$.subscribe((response:any) => {
      this.authUser = response;
    });

    this.http.get('https://bluewave.tk/api/alltransaction/' + this.authUser.id)
    .subscribe(data => {
      this.data = data;
      this.name = this.data.branch_name;
      this.address = this.data.branch_address;
      this.days = this.data.days;
      this.no = this.data.room_no;
      this.d_type = this.data.room_type;
      this.price = this.data.price;
      this.start_at = this.data.start_at;
      this.end_at = this.data.end_at;
    });

  }

  ngOnInit() {
  }

}
