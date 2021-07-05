import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { ApiServiceService } from 'src/app/service/api-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private apiService: ApiServiceService) { }

  ngOnInit(): void {
  }

  user: User = new User('', '');

  temp: User[] = [];

  onSubmit() {
   this.apiService.registerUser(this.user)
    .subscribe(
      res => console.log(res),
      err => console.log(err)
    )

  }

}
