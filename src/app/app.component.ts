import { Component, computed, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { interval, map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  clickCount = signal(0);
  clickCount$ = toObservable(this.clickCount);
  interval = signal(0);
  doubleInterval = computed(() => this.interval() * 2);

  private detroyRef = inject(DestroyRef);

  constructor() {
    // effect(()=>{
    //   console.log(`Clicked button ${this.clickCount()} times`);
    // });

  }

  ngOnInit(): void {
    
    // const subcription = interval(1000)
    //   .pipe(map((val) => val * 2))
    //   .subscribe({
    //     next: (val) => console.log(val),
    //   });

    // this.detroyRef.onDestroy(() => {
    //   subcription.unsubscribe();
    // });

    const subcription = this.clickCount$.subscribe({
      next: (val) => console.log(`Clicked button ${this.clickCount()} times`),
    });

    this.detroyRef.onDestroy(() => {
      subcription.unsubscribe();
    });
  }

  onClick() {
    this.clickCount.update((prevCount) => prevCount + 1);
  }
}
