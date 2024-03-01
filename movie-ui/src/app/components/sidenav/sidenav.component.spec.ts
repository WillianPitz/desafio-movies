import { Location } from "@angular/common";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { Router, provideRouter } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { routes } from "../../app.routes";
import { SidenavAutosize } from "./sidenav.component";

describe('SidenavAutosize', () => {
  let component: SidenavAutosize;
  let fixture: ComponentFixture<SidenavAutosize>;
  let location: Location;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [provideAnimationsAsync(), provideRouter(routes)],
      imports: [RouterTestingModule.withRoutes(routes)],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavAutosize);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render router links for Dashboard and List', () => {
    const compiled = fixture.nativeElement;
    const links = compiled.querySelectorAll('a');
    expect(links.length).toBe(2);
    expect(links[0].textContent).toContain('Dashboard');
    expect(links[1].textContent).toContain('List');
  });

  it('should navigate to Dashboard when link are clicked', () => {
    const navigateSpy = spyOn(TestBed.inject(Router), 'navigateByUrl').and.callThrough();
    const links = fixture.debugElement.queryAll(By.css('a'));
    location = TestBed.inject(Location);

    links[0].nativeElement.click();
    const [routerLink] = navigateSpy.calls.mostRecent().args;

    expect(routerLink.toString()).toEqual('/dashboard')
  });

  it('should navigate to List when link are clicked', () => {
    const navigateSpy = spyOn(TestBed.inject(Router), 'navigateByUrl').and.callThrough();
    const links = fixture.debugElement.queryAll(By.css('a'));
    location = TestBed.inject(Location);

    links[1].nativeElement.click();
    const [routerLink] = navigateSpy.calls.mostRecent().args;

    expect(routerLink.toString()).toEqual('/list')
  });
});