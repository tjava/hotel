import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.page.html',
  styleUrls: ['./branches.page.scss'],
})
export class BranchesPage implements OnInit {

  branches: any = [];

  constructor(private http: HttpClient) {

    this.http.get('https://bluewave.tk/api/allbranches')
		.subscribe(data => {
			this.branches = data;
    });
    
  }

  ngOnInit() {
  }

}
