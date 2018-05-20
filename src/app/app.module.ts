import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { MaterialModule } from './modules/material.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpModule} from '@angular/http';

import { AppComponent } from './app.component';
import { CourseTableComponent } from './components/course-table/course-table.component';
import { CourseFiltersComponent } from './components/course-filters/course-filters.component';
import { GetCoursesService } from './services/get-courses.service';

@NgModule({
  declarations: [
    AppComponent,
    CourseTableComponent,
    CourseFiltersComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    MaterialModule,
    GetCoursesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }