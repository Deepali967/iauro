import { RestService } from "./../../core/services/rest.service";
import { Component, OnInit } from "@angular/core";
import { environment } from "src/environments/environment";
import { Router } from "@angular/router";

@Component({
  selector: "app-display",
  templateUrl: "./display.component.html",
  styleUrls: ["./display.component.scss"]
})
export class DisplayComponent implements OnInit {
  studentData;
  displayedColumns = [
    "id",
    "name",
    "age",
    "emailID",
    "mobileNumber",
    "dob",
    "grade",
    "language",
    "actions"
  ];

  constructor(private restService: RestService, private router: Router) {}

  ngOnInit(): void {
    this.getStudentsData();
  }

  getStudentsData() {
    this.restService.get(environment.API_HOST).subscribe(res => {
      this.studentData = res;
    });
  }

  deleteRow(student) {
    this.restService
      .delete(`${environment.API_HOST}/${student.id}`)
      .subscribe(res => {
        this.getStudentsData();
      });
  }

  editRow(student) {
    this.router.navigate(["/registration", student.id]);
  }

  navigateToRegister() {
    this.router.navigate(["/registration"]);
  }
}
