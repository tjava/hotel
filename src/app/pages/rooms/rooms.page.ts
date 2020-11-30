import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.page.html',
  styleUrls: ['./rooms.page.scss'],
})
export class RoomsPage implements OnInit {

  rooms: any = [];

  constructor(private http: HttpClient) {

  this.http.get('https://bluewave.tk/api/allrooms')
		.subscribe(data => {
			this.rooms = data;
		});
   }

  ngOnInit() {
  }

}
