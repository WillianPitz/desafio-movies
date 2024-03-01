import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { of } from 'rxjs';
import { DataService } from '../../services/dataService';
import { ListComponent } from './list.component';
import { By } from '@angular/platform-browser';
import { selectOptions } from '../../constants';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let dataServiceStub: jasmine.SpyObj<DataService>;
  let compiled: HTMLElement;

  beforeEach(waitForAsync(() => {
    dataServiceStub = jasmine.createSpyObj('DataService', ['getAllMovies']);
    dataServiceStub.getAllMovies.and.returnValue(of([]));
    
    TestBed.configureTestingModule({
      providers: [{ provide: DataService, useValue: dataServiceStub }, HttpClient, HttpHandler, provideAnimationsAsync()],
      imports: [ListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call DataService getAllMovies on init', () => {
    expect(dataServiceStub.getAllMovies).toHaveBeenCalled();
  });

  it('should call DataService getMoviesByYear on applyFilter', () => {
    const year = '2023';
    const inputElement: HTMLInputElement = fixture.nativeElement.querySelector('custom-field input');

    inputElement.dispatchEvent(new Event('focus'));

    inputElement.value = year;
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    component.getMovies();

    const secondCall = dataServiceStub.getAllMovies.calls.argsFor(1);

    expect(secondCall).toEqual(['0', '15', '', year]);
  });

  it('should call DataService getMoviesByWinner on applyFilter', () => {
    component.selectOptions = selectOptions;
    component.winner = selectOptions[0].value

    const selectElement: HTMLSelectElement = fixture.nativeElement.querySelector('.custom-select');
    
    selectElement.dispatchEvent(new Event('focus'));
    
    selectElement.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    component.getMovies();

    const secondCall = dataServiceStub.getAllMovies.calls.mostRecent().args;

    expect(secondCall).toEqual(['0', '15', 'false', '']);
  });

  it('should render a list', () => {
    component.movies.data = [
      { id: 1, year: 2000, title: 'The Formula', winner: false },
      { id: 2, year: 2001, title: 'Cruising', winner: true },
    ];
    fixture.detectChanges();
    
    const cellId = fixture.debugElement.queryAll(By.css('td.mat-column-id'));
    expect(cellId.length).toBe(2);

    expect(cellId[0].nativeElement.textContent.trim()).toBe('1');
    expect(cellId[1].nativeElement.textContent.trim()).toBe('2');

    const cellYears = fixture.debugElement.queryAll(By.css('td.mat-column-year'));
    expect(cellYears.length).toBe(2);

    expect(cellYears[0].nativeElement.textContent.trim()).toBe('2000');
    expect(cellYears[1].nativeElement.textContent.trim()).toBe('2001');

    const cellTitle = fixture.debugElement.queryAll(By.css('td.mat-column-title'));
    expect(cellTitle.length).toBe(2);

    expect(cellTitle[0].nativeElement.textContent.trim()).toBe('The Formula');
    expect(cellTitle[1].nativeElement.textContent.trim()).toBe('Cruising');

    const cellWinner = fixture.debugElement.queryAll(By.css('td.mat-column-winner'));
    expect(cellWinner.length).toBe(2);

    expect(cellWinner[0].nativeElement.textContent.trim()).toBe('No');
    expect(cellWinner[1].nativeElement.textContent.trim()).toBe('Yes');
  });
});
