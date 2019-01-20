import { Injectable } from '@angular/core';
import { Observable ,  of } from 'rxjs';
import { Http} from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class UpdateCoursesService {

  constructor(private httpClient: Http) { }

  public updateCourse(courseJsonStr: String){

    let restUrl = '../export_recap_to_excel_v2.php?update=true';
    //let restUrl = 'http://localhost/galapagos.taxi/export_recap_to_excel_v2.php?update=true';
    console.log('calling web service ' + restUrl);
    return this.httpClient.post(restUrl, courseJsonStr);

  }
}
