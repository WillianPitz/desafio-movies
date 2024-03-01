import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RouterOutlet } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { CustomFieldComponent } from '../../components/input/input.component';
import { DataService } from '../../services/dataService';
import { Interval, IntervalResponse, MoviesByYearResponse, Studios, StudiosResponse, YarsWithMultipleWinners, Years } from '../../types';

@Component({
  selector: 'dashboard-component',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    MatTableModule,
    FormsModule,
    MatIconModule,
    CustomFieldComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  years: Years[] = [];
  studios: Studios[] = [];
  min: Interval[] = [];
  max: Interval[] = [];
  movies: MoviesByYearResponse[] = [];

  yearsColumns: string[] = ['year', 'winCount'];
  studiosColumns: string[] = ['name', 'winCount'];
  intervalColumns: string[] = ['producer', 'interval', 'previousYear', 'followingYear'];
  listMovie: string[] = ['id', 'year', 'title'];

  year: string = '';
  private searchYears = new Subject<string>();

  constructor(private dataService: DataService) {
    this.searchYears.pipe(debounceTime(300)).subscribe(() => {
      this.applyFilter();
    });
  }

  applyFilter() {
    this.dataService.getMoviesByYear(Number(this.year)).subscribe((response: MoviesByYearResponse[]) => {
      this.movies = response;
    });
  }

  ngOnInit() {
    this.dataService.getYearsWithMultipleWinners().subscribe((response: YarsWithMultipleWinners) => {
      this.years = response.years;
    });

    this.dataService.getTopThreeStudiosWithWinners().subscribe((response: StudiosResponse) => {
      this.studios = response.studios.sort((studio1, studio2) => studio2.winCount - studio1.winCount).slice(0, 3);
    });

    this.dataService.getProducersIntervalBetweenWins().subscribe((response: IntervalResponse) => {
      this.max = response.max
      this.min = response.min
    });
  }

  onInputChange(selectedValue: string) {
    this.year = selectedValue
    this.searchYears.next(this.year);
  }

  onClearInput() {
    this.year = '';
    this.applyFilter();
  }
}
