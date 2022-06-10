import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../service/config.service';
import { UserService } from 'src/app/service/user.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-investors',
  templateUrl: './investors.component.html',
  styleUrls: ['./investors.component.scss']
})
export class InvestorsComponent implements OnInit {

  userList$: Observable<User[]> = this.userService.get() as Observable<User[]>;
  filterPhrase = '';
  constructor(
    private userService: UserService,
    private config: ConfigService,
  ) { }

  ngOnInit(): void {
  }

  handleKey(event: any) {
    if (event.keyCode === 13) {
      console.log(this.filterPhrase);
      this.filterPhrase = '';
    }
  }

}