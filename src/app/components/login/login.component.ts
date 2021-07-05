import { UserSharingServiceService } from './../../service/user-sharing-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { ApiServiceService } from 'src/app/service/api-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private apiService: ApiServiceService,
    private router: Router,
    private userSharing: UserSharingServiceService
     ) { }

  ngOnInit(): void {
  }

  user: User = new User('', '');

  onSubmit() {
    this.apiService.loginUser(this.user.getUsername(), this.user.getPassword())
      .subscribe((data: User)=> {
        if(data) {
          this.router.navigate(['/todo']),
          this.userSharing.setUser(data)
        }
      });

    

      

      

  }
}


