import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ShareTaskComponent } from './components/share-task/share-task.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MyFilterPipe } from './pipes/my-filter.pipe';

@NgModule({
  declarations: [
    ShareTaskComponent,
    MyFilterPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule
  ],
  exports: [ShareTaskComponent, FormsModule, ReactiveFormsModule, MatCheckboxModule, MyFilterPipe]
})
export class SharesModule { }
