import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { AddPeoplePage } from '../add-people/add-people';
import { UpdatePeoplePage } from '../update-people/update-people';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  people: any  = [];
  constructor(public navCtrl: NavController,private sqlite: SQLite) {

  }

  ionViewDidload(){
    this.GetPeople();
  }
  
  ionViewWillEnter(){
    this.GetPeople();    
  }

  GetPeople()
  {
    this.sqlite.create(
      {
        name: 'ionic.db',
        location: 'default'
      }).then((db: SQLiteObject)=>{
      db.executeSql('CREATE TABLE IF NOT EXISTS myTable(idno INTEGER PRIMARY KEY, Name TEXT, Surname TEXT, Contact INTEGER, Email TEXT)',[])
    .then(res =>
      console.log('Executed SQL')
    ).catch(e =>console.log(e));
    db.executeSql('SELECT * FROM myTable',[])
    .then(res=>{
      this.people =[];
      for(var i=0; i<res.rows.length; i++){
      this.people.push({
        idno:res.rows.item(i).idno,
        Name: res.rows.item(i).Name,
        Surname: res.rows.item(i).Surname,
        Contact: res.rows.item(i).Contact,
        Email: res.rows.item(i).Email
      })
      }
    }).catch(e =>console.log(e))
    // db.executeSql('INSERT FROM myTable(idno,Name,Surname,Contact,Email) VALUE')
    }).catch((e) =>{console.log(e)});
  }

 Add()
 {
   this.navCtrl.push(AddPeoplePage);
 }



//  idno,Name,Surname,Contact,Email
 update(idno)
 {
let data ={
   id: idno
}
this.navCtrl.push(UpdatePeoplePage,data);
}
  // idno: idno,
  // Name:Name,
  // Surname:Surname,
  // Contact:Contact,
  // Email:Email


 delete(idno)
 {
   this.sqlite.create({
    name: 'ionic.db',
        location: 'default'
   })
.then((db: SQLiteObject)=>{
     db.executeSql('DELETE FROM myTable WHERE idno=?',[idno])
.then(res =>{ console.log('deleted');
this.GetPeople();
}
).catch(e => console.log(e));
   }).catch(e => console.log(e));
 }

 
}
