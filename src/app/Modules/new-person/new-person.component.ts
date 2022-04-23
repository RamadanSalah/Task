import { formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PersonService } from 'src/Services/Person/PersonService';

@Component({
  selector: 'app-new-person',
  templateUrl: './new-person.component.html',
  styleUrls: ['./new-person.component.css'],
})
export class NewPersonComponent implements OnInit {
  Form!: FormGroup;

  submitted: boolean = false;
  constructor(
    private Service: PersonService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<NewPersonComponent>
  ) {}

  ngOnInit(): void {
    this.BuildForm();
  }

  BuildForm() {
    this.Form = new FormGroup({
      id: new FormControl(null),
      name: new FormControl(null),
      email: new FormControl(null),
      dob: new FormControl(new Date()),
      country: new FormControl(null),
      avatar: new FormControl(
        'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50'
      ),
    });
    if (this.data.dataKey.id != 0 && this.data.dataKey.id != null) {
      this.patchValue();
    }
  }
  patchValue() {
    this.Form.patchValue(this.data.dataKey);
 
  }

  get form() {
    return this.Form.controls;
  }

  SubmitForm() {
    if (this.data.dataKey.id != null && this.data.dataKey.id != 0) {
      this.EditPerson();
    } else {
      this.NewPerson();
    }
  }

  NewPerson() {
    console.log(this.Form.value);

    this.Form.controls['id'].setValue(null);
    this.Service.Insert(this.Form.value).subscribe((c) => {
      this.dialogRef.close({ data: c });
    });
  }

  EditPerson() {
    this.Service.Edit(this.Form.value).subscribe((c) => {
      this.dialogRef.close({ data: c });
    });
  }
}
