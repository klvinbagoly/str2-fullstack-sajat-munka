import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { User } from 'src/app/model/user';
import { MessageService } from 'src/app/service/message.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-editable',
  templateUrl: './editable.component.html',
  styleUrls: ['./editable.component.scss']
})
export class EditableComponent implements OnInit {

  dataSource$: MatTableDataSource<User> = new MatTableDataSource<User>()
  displayedColumns: string[] = [
    'id',
    'first_name',
    'last_name',
    'gender',
    'email',
    'address',
    'actions'
  ]

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator
  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>

  pageSizes: number[] = [5, 10, 25, 100]
  dataSubscription!: Subscription
  currentFilterKey: string = ''

  constructor(
    private userService: UserService,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.dataSource$.paginator = this.paginator
    this.dataSubscription = this.userService.watcher$.subscribe(
      users => this.dataSource$.data = users as User[]
    )

    this.userService.refresh()

    // Szűrés logikája.
    this.dataSource$.filterPredicate = (data: User, filter: string) => {
      const key = this.currentFilterKey || ''
      const source = key ? String(data[key]) : JSON.stringify(data)
      return source.toLowerCase().includes(filter.toLowerCase())
    }
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe()
  }

  applyFilter(event: Event): void {
    // Szűrőkifejezés beállítása.
    const filterValue = (event.target as HTMLInputElement).value
    this.dataSource$.filter = filterValue.trim().toLowerCase()
  }

  onEdit(user: User): void {
    this.router.navigate(['editable', 'edit', user.id])
  }

  onDelete(user: User): void {
    const dialogData = {
      title: 'Are you sure?',
      content: 'The user will be deleted permanently.',
      template: this.dialogTemplate
    }
    this.messageService.openDialog(dialogData).pipe(
      take(1)
    )
      .subscribe(
        result => {
          if (!result) return
          this.userService.delete(user.id).toPromise().then(
            response => this.messageService.openSnackbar(3000, 'User has been deleted.'),
            err => console.error(err)
          )
        }
      )
  }
}
