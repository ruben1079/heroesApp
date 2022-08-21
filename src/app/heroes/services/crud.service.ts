import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, addDoc, doc, deleteDoc } from '@angular/fire/firestore';
// import { addDoc, collection, deleteDoc, doc, Firestore } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor( private firestore:Firestore) { }

  addHero(hero:any){
    const heroRef = collection(this.firestore, 'heroes');
    return addDoc(heroRef, hero)
  }

  getHeroes(): Observable<Hero[]>{
    const heroRef = collection(this.firestore, 'heroes');
    return collectionData(heroRef, {idField: 'id'}) as Observable<Hero[]>;
  }

  deleteHero(id:string){
    const heroDocRef = doc(this.firestore, `heroes/${id}`);
    return deleteDoc(heroDocRef);
  }

 
}
