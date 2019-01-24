import { Component, OnInit, Input } from '@angular/core';
import { Course } from '../../classes/Course';
import { GetCoursesService } from '../../services/get-courses.service';
import { UpdateCoursesService } from '../../services/update-courses.service';
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

  constructor(private getCoursesService: GetCoursesService, private updateCoursesService : UpdateCoursesService) { }

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

  private async delay(ms: number)
  {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private async filterData(){
    this.dataSource = new MatTableDataSource(this.courseArray);
    
    //const foundIndex = this.dataSource.dataChange.value.findIndex(x => x.numeroDeBon === '2019-01-000133-27');
        // Then you update that record using dialogData
    //var changeCourse = this.dataSource.dataChange.value[foundIndex];
    //changeCourse.etat = 'dodododo';
    //this.dataSource.dataChange.value[foundIndex].etat = 'dodododo';
    // Usage!
    for (let course of this.courseArray) {
      if(course.etat == 'ATTENTE_CONFIRMATION'){
        var updateCourseJson = 
        '{' + 
          '"idCourse": "' + course.idCourse + '",' + 
          '"infoCourse": {' + 
            '"lieuDepSNCF": "' + course.lieuDepSNCF + '",' + 
            '"adresseDep": "' + course.adresseDep + '",' + 
            '"lieuArrSNCF": "' + course.lieuArrSNCF + '",' + 
            '"adresseArr": "' + course.adresseArr + '",' + 
            '"heureDep": "' + course.heureDep + '"' + 
          '},' + 
          '"statutPriseEnCharge": {' +
            '"codeStatut": 1' + 
          '},' + 
          '"chauffeur": {' + 
            '"nom": "ABCD NARBONNE TAXI",' + 
            '"prenom": "ABCD NARBONNE TAXI",' + 
            '"telephone": "0612821821"' + 
          '},' + 
          '"vehicule": {' + 
            '"type": "XXX",' + 
            '"marque": "XXX",' +
            '"couleur": "XXX",' + 
            '"plaque": "XXX"' +
          '},' +
          '"referencePrestataire": {' +
            '"referenceCourse": "' + course.referenceCourse + '"' +
          '}' + 
        '}';

        this.updateCoursesService.updateCourse(updateCourseJson).subscribe(
          reponse => {
            if(reponse.status == 201){
              course.etat = 'COMMANDEE_PRESTATAIRE';
            } else {
              course.etat = 'CONFIRMATION_ERROR';
            }
          }, 
          error => {
            course.etat = 'CONFIRMATION_ERROR';
          }
        );

        await this.delay(31000);
      }
    }
  }

}
