import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/auth/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [`
  .container{
    margin:10px;
  }
  `    
  ]
})
export class HomeComponent implements OnInit {

  constructor(private router:Router, private userService:UserService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  logout(){
    this.userService.logout()
    .then(()=>{
      this.router.navigate(['./auth/login']);
    })
    .catch(error => {
      this.mostrarSnackbar('Error: '+error)
    });
  }


  mostrarSnackbar(mensaje: string){
    this.snackBar.open(mensaje, '=)',{
      duration:2500
    });
  }

}
