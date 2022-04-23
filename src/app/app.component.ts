import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Person } from 'src/Services/Person/Model';
import { PersonService } from 'src/Services/Person/PersonService';
import { NewPersonComponent } from './Modules/new-person/new-person.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  Model : Person=new Person();
  PersonIndex:number=-1;
  PersonArr : Person[]=[];
  constructor(private dialog: MatDialog,private Service:PersonService){

  }
 
 

  ngOnInit(): void {
    this.GetPerson();
  }


  GetPerson(){
    this.Service.GetAll().subscribe(c=>{
      this.PersonArr=c;

  
    })
  }
  Edit(Model:Person , Haveindex : number)
  {
    this.PersonIndex=Haveindex;
      this.Model=Model;
      this.openDialog();

  }

  openDialog() {

    const dialogRef = this.dialog.open(NewPersonComponent,{data: {
      dataKey:this.Model
    }});
    
      dialogRef.afterClosed().subscribe(result => {
      
       
         if(this.PersonIndex==-1)
         {
           
          this.PersonArr.push(
          {
            name:result.data.name , 
            country:result.data.country ,
            id:result.data.id,
            dob:result.data.dob , 
            email:result.data.email,
            avatar:result.data.avatar
          })
         }
         else{
    
        
           
          
          this.PersonArr[this.PersonIndex].avatar=result.data.avatar;
          this.PersonArr[this.PersonIndex].name=result.data.name;
          this.PersonArr[this.PersonIndex].dob=result.data.dob;
          this.PersonArr[this.PersonIndex].country=result.data.country;
          this.PersonArr[this.PersonIndex].email=result.data.email;
          this.PersonArr[this.PersonIndex].id=result.data.id;
         }
      
         
    
      });
      this.Model = new Person();
   
     
}
}
