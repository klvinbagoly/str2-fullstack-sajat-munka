import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { switchMap, take } from 'rxjs';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  user!: User
  serverError = ''

  constructor(
    private userService: UserService,
    private ar: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.ar.params.pipe(switchMap(params => this.userService.get(params['id'])))
      .pipe(take(1)) // Az első adatszolgáltatás után leiratkozik.
      .subscribe(user => {
        this.user = user
        this.user.password = ''
      })
  }

  onSubmit(ngForm: NgForm): void {
    const putObject = Object.assign({ id: this.user.id }, ngForm.value)
    this.userService.update(putObject)
      .toPromise().then(
        user => history.back(),
        err => {
          this.serverError = err.error // A szerver hibaüzenete 
          const to = setTimeout(() => {
            clearTimeout(to)
            this.serverError = ''
          }, 3000)
        }
      )
  }

}
