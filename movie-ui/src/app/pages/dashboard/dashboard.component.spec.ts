import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { of } from 'rxjs';
import { DataService } from '../../services/dataService';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let dataServiceStub: Partial<DataService>;
  let compiled: HTMLElement;

  beforeEach(waitForAsync(() => {
    dataServiceStub = {
      getYearsWithMultipleWinners: jasmine.createSpy().and.returnValue(of({ years: [] })),
      getTopThreeStudiosWithWinners: jasmine.createSpy().and.returnValue(of({ studios: [] })),
      getProducersIntervalBetweenWins: jasmine.createSpy().and.returnValue(of({ max: [], min: [] })),
      getMoviesByYear: jasmine.createSpy().and.returnValue(of([]))
    };

    TestBed.configureTestingModule({
      providers: [{ provide: DataService, useValue: dataServiceStub }, HttpClient, HttpHandler, provideAnimationsAsync()],
      imports: [DashboardComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call DataService methods on init', () => {
    expect(dataServiceStub.getYearsWithMultipleWinners).toHaveBeenCalled();
    expect(dataServiceStub.getTopThreeStudiosWithWinners).toHaveBeenCalled();
    expect(dataServiceStub.getProducersIntervalBetweenWins).toHaveBeenCalled();
  });

  it('should call DataService getMoviesByYear on applyFilter', () => {
    const year = '2023';
    const inputElement: HTMLInputElement = fixture.nativeElement.querySelector('custom-field input');

    inputElement.dispatchEvent(new Event('focus'));

    inputElement.value = year;
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    component.applyFilter();

    expect(dataServiceStub.getMoviesByYear).toHaveBeenCalledWith(Number(year));
  });

  it('should render a table to list years with multiple winners', () => {
    component.years = [
      { year: 2020, winnerCount: 5 },
      { year: 2021, winnerCount: 3 }
    ];
    fixture.detectChanges();

    const cellYears = fixture.debugElement.queryAll(By.css('td.mat-column-year'));
    expect(cellYears.length).toBe(2);

    expect(cellYears[0].nativeElement.textContent.trim()).toBe('2020');
    expect(cellYears[1].nativeElement.textContent.trim()).toBe('2021');

    const cellWinCount = fixture.debugElement.queryAll(By.css('td.mat-column-winCount'));
    expect(cellWinCount.length).toBe(2);

    expect(cellWinCount[0].nativeElement.textContent.trim()).toBe('5');
    expect(cellWinCount[1].nativeElement.textContent.trim()).toBe('3');
  });


  it('should render a table to top 3 studios with winners', () => {
    component.studios = [
      { name: 'Columbia Pictures', winCount: 5 },
      { name: 'Paramount Pictures', winCount: 4 },
      { name: 'Warner Bros.', winCount: 3 }
    ];
    fixture.detectChanges();

    const cellName = fixture.debugElement.queryAll(By.css('td.mat-column-name'));
    expect(cellName.length).toBe(3);

    expect(cellName[0].nativeElement.textContent.trim()).toBe('Columbia Pictures');
    expect(cellName[1].nativeElement.textContent.trim()).toBe('Paramount Pictures');
    expect(cellName[2].nativeElement.textContent.trim()).toBe('Warner Bros.');

    const cellWinCount = fixture.debugElement.queryAll(By.css('td.mat-column-winCount'));
    expect(cellWinCount.length).toBe(3);

    expect(cellWinCount[0].nativeElement.textContent.trim()).toBe('5');
    expect(cellWinCount[1].nativeElement.textContent.trim()).toBe('4');
    expect(cellWinCount[2].nativeElement.textContent.trim()).toBe('3');
  });

  it('should render a table to producers with longest interval between wins', () => {
    component.min = [
      { producer: 'Matthew Vaughn', interval: 13, followingWin: 2015, previousWin: 2002 },
    ];

    fixture.detectChanges();

    const cellProduer = fixture.debugElement.queryAll(By.css('td.mat-column-producer'));
    expect(cellProduer.length).toBe(1);

    expect(cellProduer[0].nativeElement.textContent.trim()).toBe('Matthew Vaughn');

    const cellWinCount = fixture.debugElement.queryAll(By.css('td.mat-column-interval'));
    expect(cellWinCount.length).toBe(1);

    expect(cellWinCount[0].nativeElement.textContent.trim()).toBe('13');

    const cellPreviousWin = fixture.debugElement.queryAll(By.css('td.mat-column-previousYear'));
    expect(cellPreviousWin.length).toBe(1);

    expect(cellPreviousWin[0].nativeElement.textContent.trim()).toBe('2002');

    const cellFollowingWin = fixture.debugElement.queryAll(By.css('td.mat-column-followingYear'));
    expect(cellFollowingWin.length).toBe(1);

    expect(cellFollowingWin[0].nativeElement.textContent.trim()).toBe('2015');
  });

  it('should render a table to producers with shortest interval between wins', () => {
    component.min = [
      { producer: 'Joel Silver', interval: 1, followingWin: 1991, previousWin: 1990 },
    ];

    fixture.detectChanges();

    const cellProduer = fixture.debugElement.queryAll(By.css('td.mat-column-producer'));
    expect(cellProduer.length).toBe(1);

    expect(cellProduer[0].nativeElement.textContent.trim()).toBe('Joel Silver');

    const cellWinCount = fixture.debugElement.queryAll(By.css('td.mat-column-interval'));
    expect(cellWinCount.length).toBe(1);

    expect(cellWinCount[0].nativeElement.textContent.trim()).toBe('1');

    const cellPreviousWin = fixture.debugElement.queryAll(By.css('td.mat-column-previousYear'));
    expect(cellPreviousWin.length).toBe(1);

    expect(cellPreviousWin[0].nativeElement.textContent.trim()).toBe('1990');

    const cellFollowingWin = fixture.debugElement.queryAll(By.css('td.mat-column-followingYear'));
    expect(cellFollowingWin.length).toBe(1);

    expect(cellFollowingWin[0].nativeElement.textContent.trim()).toBe('1991');
  });
});
