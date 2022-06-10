import { updateItem } from './../../store/user/UserActions';
import { Store, select } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap, take } from 'rxjs';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';
import { getOneItem } from 'src/app/store/user/UserActions';
import { selectOneItem } from 'src/app/store/user/UserReducers';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  user$!: Observable<User>
  userID!: number
  serverError = ''

  constructor(
    private userService: UserService,
    private ar: ActivatedRoute,
    private store: Store<any>
  ) { }

  ngOnInit(): void {
    // this.ar.params.pipe(switchMap(params => this.userService.get(params['id'])))
    //   .pipe(take(1)) // Az első adatszolgáltatás után leiratkozik.
    //   .subscribe(user => {
    //     this.user = user
    //     this.user.password = ''
    //   })
    this.userID = parseInt(this.ar.snapshot.params['id'], 10)
    this.store.dispatch(getOneItem({ id: this.userID }))
    this.user$ = this.store.pipe(
      select(selectOneItem)
    )
  }

  onSubmit(ngForm: NgForm): void {
    // const putObject = Object.assign({ id: this.user.id }, ngForm.value)
    // this.userService.update(putObject)
    //   .toPromise().then(
    //     user => history.back(),
    //     err => {
    //       this.serverError = err.error // A szerver hibaüzenete 
    //       const to = setTimeout(() => {
    //         clearTimeout(to)
    //         this.serverError = ''
    //       }, 3000)
    //     }
    //   )

    const user: User = ({ ...ngForm.value, id: this.userID })
    this.store.dispatch(updateItem({ item: user }))
    history.back()
  }

}
