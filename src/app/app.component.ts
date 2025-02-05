import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private detroyRef = inject(DestroyRef);
  ngOnInit(): void {
    const subcription = interval(1000).subscribe({
      next: (val) => console.log(val),
    });

    this.detroyRef.onDestroy(()=>{
      subcription.unsubscribe();
    })
  }
}
