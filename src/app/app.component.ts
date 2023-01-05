import { Component, OnInit } from '@angular/core';
import { test } from './modelsTest';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import {map} from 'rxjs';
import { GaugeModule } from 'angular-gauge';
import { Eclairage } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private historyRef:AngularFireList<Eclairage>;
  private currentRef:AngularFireList<Eclairage>;
  public history?:Eclairage[];
  public current?:Eclairage|null;
  constructor(db: AngularFireDatabase) {this.historyRef=db.list<Eclairage>('/eclairage');
  this.currentRef=db.list<Eclairage>('/eclairage'); }

  ngOnInit(){
    this.historyRef
    .snapshotChanges()
    .pipe(map((changes)=>changes.map((c)=>({...c.payload.val()}))))
    .subscribe((data)=>{
      this.history=data;
      this.current=data[data.length-1];
      console.log(this.history);

    });

  }

  calculateDiff(date1:any, date2:any){
    return Math.floor((Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate()) - Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate()) ) /(1000 * 60 * 60 * 24));
}

}
