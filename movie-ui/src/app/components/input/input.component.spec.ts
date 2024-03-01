import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { CustomFieldComponent } from "./input.component";


describe('CustomFieldComponent', () => {
  let component: CustomFieldComponent;
  let fixture: ComponentFixture<CustomFieldComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [provideAnimationsAsync()],
      imports: [CustomFieldComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit select value on selection change', () => {
    spyOn(component.valueChanged, 'emit');
    const testValue = 'Test';
    component.onSelectionChange({ value: testValue });
    expect(component.valueChanged.emit).toHaveBeenCalledWith(testValue);
  });

  it('should emit input value on input change', () => {
    spyOn(component.valueChanged, 'emit');
    const testValue = 'Test';
    component.onInputChange({ target: { value: testValue } });
    expect(component.valueChanged.emit).toHaveBeenCalledWith(testValue);
  });

  it('should clear input value on input clear', () => {
    spyOn(component.onClearValue, 'emit');
    component.onInputClear();
    expect(component.inputValue).toEqual('');
    expect(component.onClearValue.emit).toHaveBeenCalled();
  });
});