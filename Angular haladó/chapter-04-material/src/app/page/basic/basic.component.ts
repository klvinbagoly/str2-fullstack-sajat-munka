import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})
export class BasicComponent implements OnInit {

  dataSource$: Observable<User[]> = this.userService.get() as Observable<User[]>
  displayedColumns: string[] = [
    'id',
    'first_name',
    'last_name',
    'gender',
    'email',
    'address'
  ]

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    const u = this.userService.get(1) as Observable<User[]>
    u.subscribe(data => console.log(data))
  }

}
