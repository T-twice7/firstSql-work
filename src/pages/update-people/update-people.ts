import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite'
import { Toast } from '@ionic-native/toast';

/**
 * Generated class for the UpdatePeoplePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-update-people',
  templateUrl: 'update-people.html',
})
export class UpdatePeoplePage {

  data ={idno:0,Name:"",Surname:"",Contact:0,Email:""};
  people: any  = [];
  
  
  constructor(public navCtrl: NavController, public navParams: NavParams,private sqlite: SQLite,private toast: Toast) {
    this.getCurrentData(navParams.get('id'));
    // this.data.idno = navParams.get('idno');
    // this.data.Name = navParams.get('Name');
    // this.data.Surname= navParams.get('Surname');
    // this.data.Contact = navParams.get('Contact');
    // this.data.Email= navParams.get('Email');
  }

  getCurrentData(idno) {
    this.sqlite.create({
      name: 'ionic.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('SELECT * FROM myTable WHERE idno=?', [idno])
        .then(res => {
          if(res.rows.length > 0) {
            this.data.idno =res.rows.item(0).idno,
            this.data.Name=res.rows.item(0).Name,
            this.data.Surname=res.rows.item(0).Surname,
            this.data.Contact=res.rows.item(0).Contact,
            this.data.Email=res.rows.item(0).Email
          };
          // this.updateData(); 
        })
        .catch(e => {
          console.log(e);
          this.toast.show(e, '5000', 'center').subscribe(
            toast => {
              console.log(toast);
            }
          );
        });
    }).catch(e => {
      console.log(e);
      this.toast.show(e, '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );
    });
  }

  updateData() {
    this.sqlite.create({
      name: 'ionic.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('UPDATE myTable SET Name=?,Surname=?,Contact=?,Email=? WHERE idno=?',[this.data.Name,this.data.Surname,this.data.Contact,this.data.Email,this.data.idno])
        .then(res => {
          this.getCurrentData(res);
          console.log(res);
          this.toast.show('Data updated', '5000', 'center').subscribe(
            toast => {
              this.navCtrl.popToRoot();
            }
          );
        })
        .catch(e => {
          console.log(e);
          this.toast.show(e, '5000', 'center').subscribe(
            toast => {
              console.log(toast);
            }
          );
        });
    }).catch(e => {
      console.log(e);
      this.toast.show(e, '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        }
      );
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdatePeoplePage');
  }


  
}
