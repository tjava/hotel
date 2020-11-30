import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

	branches: any = [];
	rooms: any = [];

	constructor(private menu: MenuController, private http: HttpClient) { 

		this.http.get('https://bluewave.tk/api/allbranches')
		.subscribe(data => {
			this.branches = data;
		});

		this.http.get('https://bluewave.tk/api/allrooms')
		.subscribe(data => {
			this.rooms = data;
		});

	}

  ngOnInit() {
  }

  _openSideNav() {
    this.menu.enable(true, 'menu-content');
    this.menu.open('menu-content');
  }

}
