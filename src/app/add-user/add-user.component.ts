import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators,FormArray  } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {


  public userForm !:FormGroup;
  constructor(private fb:FormBuilder) { }
  ngOnInit() {
    let pattern ='^[0-9]+(\.[0-9]+)?$';
    this.userForm = this.fb.group({
      name:    ['',Validators.required],
      email:   ['',[Validators.required,Validators.email]],
      number : ['',[Validators.pattern(pattern)]],
      bio :    [''],
      familyMembers: this.fb.array([])
    })
  }

  get familyMemberControls() {
        return this.userForm.get('familyMembers') as FormArray
    }

  get getControls() {
    return this.userForm.controls;
  }

  addNewMember() {
      let member:FormGroup = this.fb.group({
        name:['',],
        number:['',],
        relation:['',]
      });
      
      this.familyMemberControls.push(member);
  }

  removeMember(index:number) {
   this.familyMemberControls.controls.splice(index,1);
  }


  submited= false;
  submit()
  {
    this.submited = true;
    console.log('submited form',this.userForm.value);
  }
 
}
