import { Component } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Subject, debounceTime } from 'rxjs';
import { CustomFieldComponent } from '../../components/input/input.component';
import { DataService } from '../../services/dataService';
import { MoviesByYearResponse } from '../../types';
import { selectOptions } from '../../constants';

@Component({
  selector: 'list-component',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    CustomFieldComponent
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  constructor(private dataService: DataService) {
    this.years.pipe(debounceTime(300)).subscribe(() => {
      this.getMovies();
    });
  }

  page = '0';
  size = '15';
  winner = '';
  year = '';
  
  selectOptions = selectOptions;

  private years = new Subject<string>();

  moviesColumns: string[] = ['id', 'year', 'title', 'winner'];
  movies = new MatTableDataSource<MoviesByYearResponse>([]);
  totalElements: number = 0;

  ngOnInit() {
    this.getMovies();
  }

  getMovies() {
    this.dataService.getAllMovies(this.page, this.size, this.winner, this.year).subscribe((response: any) => {
      this.movies.data = response.content;
      this.totalElements = response.totalElements
    });
  }

  onPageChange(event: any) {
    this.page = event.pageIndex;
    this.getMovies();
  }

  onValueChanged(selectedValue: string) {
    this.winner = selectedValue
    this.getMovies();
  }

  onInputChange(selectedValue: string) {
    this.year = selectedValue
    this.years.next(this.year);
  }

  onClearInput() {
    this.year = '';
    this.getMovies();
  }
}
