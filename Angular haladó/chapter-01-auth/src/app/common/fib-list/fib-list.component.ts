import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-fib-list',
  templateUrl: './fib-list.component.html',
  styleUrls: ['./fib-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FibListComponent implements OnInit, OnChanges {

  @Input() list!: User[];
  @Input() title!: string;
  @Input() type!: string;
  cols = [
    { key: 'id', label: '#' },
    { key: 'first_name', label: 'Fname' },
  ];

  filterPhrase = '';
  filterControl: FormControl = new FormControl('')

  constructor(
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.changeDetectorRef.detach() // Kikapcsolja a módosulások figyelését.
    this.filterControl.valueChanges.pipe(
      debounceTime(2000) // Késleltetjük a szűrést 2 mp-el.
    ).subscribe(
      value => {
        this.filterPhrase = value;
        this.changeDetectorRef.detectChanges()
      }
    )

    // this.changeDetectorRef.detectChanges() // Csak itt ellenőrzi a változásokat.
    // setInterval(() => this.changeDetectorRef.detectChanges(), 1000)
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.changeDetectorRef.detectChanges()
  }

  handleKey(event: any) {
    if (event.keyCode === 13) {
      this.changeDetectorRef.detectChanges()
      console.log(this.filterPhrase);
      this.filterPhrase = '';
    }
  }

  calculate(investor: User): number {
    console.log(`${this.title} calculating`);
    return this.type === 'fibonacci'
      ? this.fibonacci(20)
      : this.grow(1000, 0.055, 5);
  }

  fibonacci(num: number): number {
    if (num <= 1) {
      return 1;
    }

    return this.fibonacci(num - 1) + this.fibonacci(num - 2);
  }

  grow(base: number, interest: number, years: number): number {
    base *= 1 + interest;
    years--;
    if (years) {
      return this.grow(base, interest, years);
    }
    return Math.round(base * 100) / 100;
  }

}
