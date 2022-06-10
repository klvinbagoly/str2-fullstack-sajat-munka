import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user';
import { ConfigService } from 'src/app/service/config.service';
import { UserService } from 'src/app/service/user.service';
import { Store, select } from '@ngrx/store';
import { getItems } from 'src/app/store/user/UserActions';
import { selectItems } from 'src/app/store/user/UserReducers';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  // users$: Observable<User[]> = this.userService.get() as Observable<User[]>
  users$!: Observable<User[]>

  cols: { key: string, label: string }[] = this.config.userColumns

  constructor(
    private userService: UserService,
    private config: ConfigService,
    private store: Store<any>
  ) { }

  ngOnInit(): void {
    // Action elindítása.
    this.store.dispatch(getItems())
    // Store-ból lekérdezzük az adatokat a szelektor függvénnyel.
    this.users$ = this.store.pipe(
      select(selectItems)
    )
  }

  update(user: User): void {
    this.userService.update(user).toPromise().then(
      userResponse => console.log(userResponse),
      err => console.error(err)
    )
  }

}
