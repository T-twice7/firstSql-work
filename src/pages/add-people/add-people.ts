import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite'
import { Toast } from '@ionic-native/toast';


@IonicPage()
@Component({
  selector: 'page-add-people',
  templateUrl: 'add-people.html',
})
export class AddPeoplePage {

  data ={Name:"",Surname:"",Contact:0,Email:""};

  constructor(public navCtrl: NavController, public navParams: NavParams,private sqlite: SQLite,private toast: Toast) {
  }

  SavePeople(){
    this.sqlite.create({
      name: 'ionic.db',
        location: 'default'
    }).then((db:SQLiteObject)=>{
      db.executeSql('INSERT INTO myTable VALUES(NULL,?,?,?,?)',[this.data.Name,this.data.Surname,this.data.Contact,this.data.Email])
      .then(res=>{
        console.log(res);
        this.toast.show(`Saved`, '5000', 'center').subscribe(
          toast => {
            this.navCtrl.popToRoot();
          }
        );
      }).catch(e => {console.log(e);
        this.toast.show(e, '5000', 'center').subscribe(
          toast => {
            console.log(toast);
          }
        );
      })
    }).catch(e => {console.log(e)
      this.toast.show(e, '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );
    });
    
  }
  
  ionViewDidLoad() {   
    // this.SavePeople();
  }

}
