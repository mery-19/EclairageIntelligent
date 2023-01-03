import { Component, OnInit } from '@angular/core';
import { test } from './models';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import {map} from 'rxjs';
import { GaugeModule } from 'angular-gauge';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private historyRef:AngularFireList<test>;
  private currentRef:AngularFireList<test>;
  public history?:test[];
  public current?:test|null;
  constructor(db: AngularFireDatabase) {this.historyRef=db.list<test>('/test');
  this.currentRef=db.list<test>('/test'); }
  title = 'EclairageIntelligent';

  ngOnInit(){
    this.historyRef
    .snapshotChanges()
    .pipe(map((changes)=>changes.map((c)=>({...c.payload.val()}))))
    .subscribe((data)=>{
      //console.log(this.history);
      this.history=data;
      this.current=data[data.length-1];
    });

  }
}
