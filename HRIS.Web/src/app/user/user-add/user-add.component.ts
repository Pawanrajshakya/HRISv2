import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SearchUser } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {

  searchedUser: SearchUser[] = [];
  searchBy: string = "";
  isSuper: boolean = false;

  constructor(public dialogRef: MatDialogRef<UserAddComponent>, private userService: UserService) { }

  ngOnInit(): void {
  }
  

  onSubmit(user: NgForm): void {
    console.log(user);
    this.dialogRef.close(user);
  }

  onCancelClick(): void {
    this.dialogRef.close(false);
  }

  searchUser(searchBy: string){

    if (searchBy === "")
      return;

    this.userService.search$(searchBy, this.isSuper).subscribe(
      (data) =>{
        this.searchedUser = data as SearchUser[];
        console.log('searched users', data);
      }
     )
  }
}
