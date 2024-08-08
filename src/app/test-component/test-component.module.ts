import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { TestComponent } from './test-component.component';

const examples = [TestComponent];

@NgModule({
  declarations: examples,
  imports: [NgSelectModule, FormsModule, CommonModule, ReactiveFormsModule],
  exports: [NgSelectModule, FormsModule, CommonModule, ReactiveFormsModule],
})
export class ExamplesModule {}
