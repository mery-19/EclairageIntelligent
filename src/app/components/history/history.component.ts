import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import {map} from 'rxjs';
import { Eclairage } from 'src/app/models';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  private historyRef:AngularFireList<Eclairage>;
  private currentRef:AngularFireList<Eclairage>;
  public history?:Eclairage[];
  public current?:Eclairage|null;
  colorInput:any = document.getElementById("color");
  output:any = document.getElementById("output");
  displayTable: boolean = false;


  constructor(db: AngularFireDatabase) {this.historyRef=db.list<Eclairage>('/eclairage');
  this.currentRef=db.list<Eclairage>('/eclairage'); 

  }

  ngOnInit(){
    this.historyRef
    .snapshotChanges()
    .pipe(map((changes)=>changes.map((c)=>({...c.payload.val()}))))
    .subscribe((data)=>{
      this.history=data;
      this.current=data[data.length-1];
      console.log(this.history);
      this.displayTable = true;
      console.log(this.colorInput.value)
      console.log(this.output);
      console.log(this.calculateDiff(new Date('2023-01-05'), new Date('2023-01-06')));

    });

  }
 
  
 calculateDiff(date1:any, date2:any){
    date1 = new Date(date1);
    date2 = new Date(date2);
    let timeDiff = Math.abs(date2.getTime() - date1.getTime());
    let diffSeconds = Math.floor(timeDiff / 1000);
    let diffMinutes = Math.floor(diffSeconds / 60);
    let diffHours = Math.floor(diffMinutes / 60);
    return diffHours + "h " + (diffMinutes % 60) + "min " + (diffSeconds % 60) + "s"
}

calculateConsomation(date1:any, date2:any){
  date1 = new Date(date1);
  date2 = new Date(date2);
  const consom = 0.3;
  let timeDiff = Math.abs(date2.getTime() - date1.getTime());
  return consom*timeDiff;
 
}

formatText = (text:number = 0)=>{
  let characters = text.toString().split('');

  let str = "";
  if(characters.length > 1){
    characters.forEach((l:string) => {
      str = l + ','+str;
    })

    str = str.slice(0,-1);
  }else {
    str = text.toString()
  }

  return str;
}

}
