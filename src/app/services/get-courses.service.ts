import { Injectable } from '@angular/core';
import { Observable ,  of } from 'rxjs';
import { Http} from '@angular/http';
import {Course} from '../classes/Course';

import * as lodash from 'lodash';

@Injectable()
export class GetCoursesService {

  private coursesArray: Observable<Course[]>;

  constructor(private httpClient: Http) { 
    
  };

  public getCourseByDate(date: Date): Observable<any> {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    //let restUrl = '../export_recap_to_excel.php?year=' + year + '&month=' + month;
    let restUrl = 'http://localhost/galapagos.taxi/export_recap_to_excel.php?year=' + year + '&month=' + month;
    console.log('calling web service ' + restUrl);
    return this.httpClient.get(restUrl);
  };
}
