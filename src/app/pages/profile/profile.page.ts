import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  public authUser: any;

  data: any;

  constructor(private auth: AuthService, private http: HttpClient) { 

    this.auth.userData$.subscribe((response:any) => {
      this.authUser = response;
    });
    
    this.http.get('https://bluewave.tk/api/alltransaction/' + this.authUser.id)
      .subscribe(data => {
      this.data = data;
    });

  }

  ngOnInit() {
    
  }

}
