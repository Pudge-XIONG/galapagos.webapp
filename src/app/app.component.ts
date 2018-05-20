import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedDate: Date;
  selectedState: String;

  public get displayDate(): String{
    return this.selectedDate.toLocaleString("fr-FR", { month: "long" }) + ' ' + this.selectedDate.getFullYear();
  }

  ngOnInit() {
    var today = new Date();
    const month = today.toLocaleString("fr-FR", { month: "long" });
    const year = today.getFullYear();
    this.selectedDate = today;
    this.selectedState = "None";
  }
}
