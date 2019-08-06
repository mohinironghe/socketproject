import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './../user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;
  res;
  users ;
  constructor(private userService: UserService,
    private router: Router ) { }

  ngOnInit() {
 
  }
  login() {
    const user = {
      username: this.username,
      password: this.password
    };
    this.userService.login(user).subscribe(response => {
      console.log(response);
      this.res = response;
      if (this.res.isPresent === true) {
      if(this.res.correctPassword == true){
        console.log(this.res.correctPassword);
        localStorage.setItem('user', this.res.user.username);
        alert('succeesfully login');
        console.log(this.username);
        this.router.navigate(['/user',this.username]);
      }else{
        alert('incorrect password');
      }
    }else{
      alert('user not found');
    }
      
    });
  }

}
