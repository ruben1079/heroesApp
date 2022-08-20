import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [`
  button = {
    margin:100px;
  }
  `
  ]
})
export class LoginComponent {

  email = '';
  password = '';
  clic = false;

  constructor(private router:Router,
              private userService: UserService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  login(){
    this.router.navigate(['./heroes']);
  }

  irRegistrarse(){
    this.router.navigate(['./auth/register']);
  }

  clicLogin(){
    this.clic = !this.clic;
    console.log(this.clic);
  }

  loginemailpass(){
    this.userService.loginWithEmailPass(this.email, this.password)
    .then(response =>{
      console.log(response);
      this.mostrarSnackbar('Credenciales correctas')
      this.router.navigate(['./heroes']);
    })
    .catch(error =>{
      console.log(error);
      this.mostrarSnackbar('Error: '+error)
    });
  }

  loginGoogle(){
    this.userService.loginWithGoogle()
    .then(response =>{
      console.log(response);
      this.mostrarSnackbar('Credenciales correctas')
      this.router.navigate(['./heroes']);
    })
    .catch(error =>{
      console.log(error);
      this.mostrarSnackbar('Error: '+error)
    });
  }


  mostrarSnackbar(mensaje: string){
    this.snackBar.open(mensaje, '=)',{
      duration:2500
    });
  }

}
