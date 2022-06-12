import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit, OnDestroy {

  dataSource$: MatTableDataSource<User> = new MatTableDataSource<User>()
  displayedColumns: string[] = [
    'id',
    'first_name',
    'last_name',
    'gender',
    'email',
    'address'
  ]

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator

  pageSizes: number[] = [5, 10, 25, 100]
  dataSubscription!: Subscription

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.dataSource$.paginator = this.paginator
    this.dataSubscription = this.userService.get().subscribe(
      users => this.dataSource$.data = users as User[]
    )
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe()
  }

}
