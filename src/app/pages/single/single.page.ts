import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-single',
  templateUrl: './single.page.html',
  styleUrls: ['./single.page.scss'],
})
export class SinglePage implements OnInit {

  id: any;
  type: any;
  data: any;
  name: any;
  address: any;
  image: any;
  d_type: any;
  no: any;
  price: any;
  total_premium_room: any;
  total_economic_room: any;
  premium_room_price: any;
  economic_room_price: any;

  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient) {

    this.id = activatedRoute.snapshot.paramMap.get('id');
    this.type = activatedRoute.snapshot.paramMap.get('type');

    if (this.type == "room") {

      this.http.get('https://bluewave.tk/api/allrooms/' + this.id)
      .subscribe(data => {
        this.data = data;
        this.address = this.data.branch_address;
        this.image = this.data.room_image;
        this.d_type = this.data.room_type;
        this.no = this.data.room_no;
        this.price = this.data.price;
      });
    } else if (this.type == "branch") {
    
      this.http.get('https://bluewave.tk/api/allbranches/' + this.id)
      .subscribe(data => {
        this.data = data;
        this.name = this.data.branch_name;
        this.address = this.data.branch_address;
        this.image = this.data.branch_image;
        this.total_premium_room = this.data.total_premium_room;
        this.total_economic_room = this.data.total_economic_room;
        this.premium_room_price = this.data.premium_room_price;
        this.economic_room_price = this.data.economic_room_price;
      });
    }
    
   }

  ngOnInit() {
  }

}
