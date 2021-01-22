import { LANGUAGES, GRADES } from "./../../../assets/constants/constants";
import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  AbstractControl,
  FormControl
} from "@angular/forms";
import { GENDER } from "src/assets/constants/constants";
import { RestService } from "src/app/core/services/rest.service";
import { environment } from "src/environments/environment";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.scss"]
})
export class RegistrationComponent implements OnInit {
  registerFormGroup: FormGroup;
  isAgeRequired;
  gender = GENDER;
  languages = LANGUAGES;
  grades = GRADES;
  showSubmittedResponseBlock = false;
  id;
  currentUser;
  constructor(
    private fb: FormBuilder,
    private restService: RestService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params["id"];

    if (this.id) {
      this.fetchUser();
    }

    this.registerFormGroup = this.fb.group({
      age: [
        "",
        Validators.compose([
          Validators.required,
          Validators.maxLength(2),
          AgeValidator
        ])
      ],
      address: ["", Validators.compose([Validators.required])],
      emailId: [
        "",
        Validators.compose([
          Validators.required,
          Validators.email,
          Validators.pattern(/.+@.+\..+/)
        ])
      ],
      mobileNumber: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")
        ])
      ],
      dob: ["", Validators.required],
      name: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9 ]*$"),
          Validators.minLength(2)
        ])
      ],
      gender: ["", Validators.compose([Validators.required])],
      language: ["", Validators.compose([Validators.required])],
      grade: ["", Validators.compose([Validators.required])]
    });
    this.registerFormGroup.valueChanges.subscribe(val => {
      this.findInvalidControls();
    });
  }

  get controls() {
    return this.registerFormGroup.controls;
  }

  fetchUser() {
    this.restService
      .get(`${environment.API_HOST}/${this.id}`)
      .subscribe(res => {
        this.currentUser = res;
        this.patchValuesToForm(this.currentUser);
      });
  }

  patchValuesToForm(formdata) {
    this.registerFormGroup.patchValue({
      name: formdata.name,
      age: formdata.age,
      gender: formdata.gender,
      dob: formdata.dob,
      address: formdata.address,
      emailId: formdata.emailId,
      mobileNumber: formdata.mobileNumber,
      language: formdata.language,
      grade: formdata.grade
    });
  }

  findInvalidControls() {
    const invalid = [];
    const controls = this.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    if (invalid.length == 1 && invalid[0] === "gender") {
      this.isAgeRequired = true;
    } else {
      this.isAgeRequired = false;
    }
    return invalid;
  }

  keyPressNumbers(event) {
    var charCode = event.which ? event.which : event.keyCode;
    // Only Numbers 0-9
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }

  omitSpecialChar(event) {
    let k;
    k = event.charCode; //         k = event.keyCode;  (Both can be used)
    return (
      (k > 64 && k < 91) ||
      (k > 96 && k < 123) ||
      k == 8 ||
      k == 32 ||
      (k >= 48 && k <= 57)
    );
  }

  saveRegisterForm() {
    console.log(this.registerFormGroup.value);
    if (!this.id) {
      this.restService
        .post(environment.API_HOST, this.registerFormGroup.value)
        .subscribe(res => {
          this.registerFormGroup.reset();
          this.showSubmittedResponseBlock = true;
        });
    } else {
      this.restService
        .put(`${environment.API_HOST}/${this.id}`, this.registerFormGroup.value)
        .subscribe(res => {
          this.registerFormGroup.reset();
          this.showSubmittedResponseBlock = true;
        });
    }
  }

  resetForm() {
    this.registerFormGroup.reset();
  }

  viewTable() {
    this.router.navigate(["/display"]);
  }
}

export function AgeValidator(
  control: AbstractControl
): { [key: string]: boolean } | null {
  if (control.value > 99) {
    return { age: true };
  }
  return null;
}
