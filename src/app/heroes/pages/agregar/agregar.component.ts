import { Component, OnInit } from '@angular/core';
import { list } from '@angular/fire/storage';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { getDownloadURL, getStorage, listAll, ref, uploadBytes } from 'firebase/storage';
import { switchMap } from 'rxjs';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';
import { Hero } from '../../interfaces/hero.interface';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { CrudService } from '../../services/crud.service';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
  img {
    width: 100%;
    border-radius:5px;
  }
  `
  ]
})
export class AgregarComponent implements OnInit {

  publishers = [
    {
      id:'DC Comics',
      desc:'DC - Comics'
    },
    {
      id:'Marvel Comics',
      desc:'Marvel - Comics'
    },
  ];

  // heroe: Heroe = {
  //   superhero: '',
  //   alter_ego: '',
  //   characters: '',
  //   first_appearance:'',
  //   publisher: Publisher.DCComics,
  //   alt_img:''
  // }
  heroe: Hero = {
    superhero: '',
    realName: '',    
    publisher: Publisher.DCComics,
    alt_img:'',
    img_link:''
  }

  

  constructor(private heroesService:HeroesService,
              private activaredRoute:ActivatedRoute,
              private router: Router,
              private snackBar: MatSnackBar,
              private dialog:MatDialog,
              private crudService:CrudService) { }

  ngOnInit(): void {
    
    // if(!this.router.url.includes('editar')){
    //   return
    // }

    // this,this.activaredRoute.params
    // .pipe(
    // switchMap(({id}) => this.heroesService.getHeroePorId(id))
    // )
    // .subscribe(heroe => this.heroe = heroe)
  }

  saveHero(){
    console.log('Guardar: ',this.heroe);    
    this.crudService.addHero(this.heroe)
    .then(resp =>{
      console.log(resp);
      this.mostrarSnackbar('Hero saved correctly')
      this.getHeros();
    })
    .catch(error =>{
      console.log(error);
      this.mostrarSnackbar('Error: '+error)
    })        
  }

  deleteHero(){

  }


  getHeros(){
    console.log('Obteniendo heroes');
    this.crudService.getHeroes().subscribe(resp =>console.log('ALL', resp));    
  }

  uploadImage($event: any){
    const file = $event.target.files[0];
    console.log(file);
    const storage = getStorage();
    
    const imgRef = ref(storage,`images/${file.name}`)    
    uploadBytes(imgRef, file)
    .then((response) => {
      console.log(response);
      this.heroe.alt_img=response.metadata.name;
      getDownloadURL(imgRef)
      .then((url) =>{
        console.log('url - ',url);
        this.heroe.img_link=url;
      })
      .catch(error =>{
        console.log('Error url - ',error);
      })                  
    })
    .catch(error => {
      console.log(error);
    })
  }

  getImage(){
    
  }


  // guardar(){
  //   if (this.heroe.superhero.trim().length === 0){
  //     return
  //   }

  //   if (this.heroe.id){
  //     this.heroesService.actualizarHeroe(this.heroe)
  //     .subscribe(heroe=> this.mostrarSnackbar('Registro actualizado'))
  //   }else{
  //     this.heroesService.agregarHeroe(this.heroe)
  //     .subscribe(heroe =>{
  //       this.router.navigate(['/heroes/editar',heroe.id]);
  //       this.mostrarSnackbar('Registro creado')
  //     });
  //   }
  // }

  // deleteHero(){

  //   const dialog = this.dialog.open(ConfirmarComponent, {
  //     width: '250px',
  //     data: this.heroe
  //   });

  //   dialog.afterClosed().subscribe(
  //     (result) => {
  //       this.heroesService.deleteHeroe(this.heroe.id!)
  //        .subscribe(resp=>{
  //          this.router.navigate(['/heroes']);
  //        });        
  //     }
  //   )

  // }

  mostrarSnackbar(mensaje: string){
    this.snackBar.open(mensaje, 'ok!',{
      duration:2500
    });
  }



}
