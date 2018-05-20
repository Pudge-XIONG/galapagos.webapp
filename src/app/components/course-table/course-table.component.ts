import { Component, OnInit, Input } from '@angular/core';
import { Course } from '../../classes/Course';
import { GetCoursesService } from '../../services/get-courses.service';
import {MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-course-table',
  templateUrl: './course-table.component.html',
  styleUrls: ['./course-table.component.css']
})
export class CourseTableComponent implements OnInit {

  private _selectedState: string;
  private _selectedDate: Date;

  private _courseArray: Course[];
  public isLoading: Boolean;

  displayedColumns = ['date', 'depart', 'gareDepart', 'heure', 'arrivee', 'gareArrivee', 'BUPO', 'numeroDeBon', 'tarifHT', 'etat'];
  dataSource: any;

  public get selectedState(): string{
    return this._selectedState;
  }

  @Input()
  public set selectedState(value: string){
    this._selectedState = value;
    this.filterData();
  }

  public get selectedDate(): Date{
    return this._selectedDate;
  }

  @Input()
  public set selectedDate(value: Date){
    if(value !== null && value !== undefined && (this._selectedDate === null || this._selectedDate === undefined || this._selectedDate.getFullYear() !== value.getFullYear() 
      || this._selectedDate.getMonth() !== value.getMonth())){
        this._selectedDate = value;
        this.loadData();
      }
  }

  public get courseArray(){
    if(this._courseArray === null || this._courseArray === undefined){
      this._courseArray = [];
    }

    return this._courseArray.filter((value, index) => {
      return (this.selectedState === 'None' || this.selectedState === value.etat);
    });
  }

  public set courseArray(value: Course[]){
    this._courseArray = value;
    //console.log(value);
  }

  constructor(private getCoursesService: GetCoursesService) { }

  ngOnInit() {
    this.loadData();
  }

  private loadData(){
    this.isLoading = true;
    this.getCoursesService.getCourseByDate(this._selectedDate).subscribe(reponse => this.bindTableData(reponse.json()));
  }

  private bindTableData(jsonResponse: Course[]){
    this.courseArray = jsonResponse;
    this.isLoading = false;
    this.filterData();
    //console.log(this.dataSource);
  }

  private filterData(){
    this.dataSource = new MatTableDataSource(this.courseArray);
  }
}
