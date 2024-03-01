import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import {MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'custom-field',
  imports: [
    FormsModule,
    MatButtonModule,
    CommonModule,
    MatFormFieldModule, 
    MatSelectModule, 
    MatInputModule, 
    MatIconModule
  ],
  styleUrl: 'input.component.css',
  standalone: true,
  templateUrl: 'input.component.html'
})
export class CustomFieldComponent {
  initialValue: string = '';
  @Input() selectValue: string = '';
  @Input() inputValue: string = '';
  @Input() isSelect: boolean = false;
  @Input() options: { value: string, label: string }[] = [];
  @Output() valueChanged = new EventEmitter<any>();
  @Output() onClearValue = new EventEmitter<any>();

  onSelectionChange(event: any) {
    this.selectValue = event.value;
    this.valueChanged.emit(this.selectValue);
  }

  onInputChange(event: any) {
    this.inputValue = event.target.value;
    this.valueChanged.emit(this.inputValue);
  }

  onInputClear() {
    this.inputValue = '';
    this.onClearValue.emit()
  }
}
