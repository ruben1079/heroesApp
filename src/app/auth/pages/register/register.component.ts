import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  email='';
  password='';

  constructor(private user:UserService,
              private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  register(){
    this.user.register(this.email,this.password).then(response=>{
      console.log('Registrando usuario...');
      console.log(response);
      this.router.navigate(['/auth']);
      this.mostrarSnackbar('Registro correcto')
    })
    .catch(error=> {
      console.log(error);
      this.mostrarSnackbar('Error: '+error)
    })
  }


  mostrarSnackbar(mensaje: string){
    this.snackBar.open(mensaje, '=)',{
      duration:2500
    });
  }

}
