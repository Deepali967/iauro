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
  currentUser;
  showConfirmationPopup = false;
  constructor(private restService: RestService, private router: Router) {}

  ngOnInit(): void {
    this.getStudentsData();
  }
  // get students Data
  getStudentsData() {
    this.restService.get(environment.API_HOST).subscribe(res => {
      this.studentData = res;
    });
  }

  // delete particular row with Student ID
  deleteRow() {
    this.restService
      .delete(`${environment.API_HOST}/${this.currentUser.id}`)
      .subscribe(res => {
        this.getStudentsData();
      });
  }

  selectStudent(student) {
    this.currentUser = student;
    this.toggleConfirmationPopup();
  }

  // to handle confirmation box actions CTA
  handleConfirmationBoxAction(action) {
    switch (action) {
      case "yes":
        this.deleteRow();
        break;

      case "no":
        this.toggleConfirmationPopup();
        break;
    }
  }

  toggleConfirmationPopup() {
    this.showConfirmationPopup = !this.showConfirmationPopup;
  }

  // edit particular row with studentID
  editRow(student) {
    this.router.navigate(["/registration", student.id]);
  }

  //navigating to register component
  navigateToRegister() {
    this.router.navigate(["/registration"]);
  }
}
