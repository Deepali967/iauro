import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EditPopupComponent } from "./components/edit-popup/edit-popup.component";
import { ConfirmationPopupComponent } from "./components/confirmation-popup/confirmation-popup.component";

// MAT MODULE
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatRadioModule } from "@angular/material/radio";
import { MatStepperModule } from "@angular/material/stepper";
import { MatIconModule } from "@angular/material/icon";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatNativeDateModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";
import { MatTableModule } from "@angular/material/table";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
const compoents = [EditPopupComponent, ConfirmationPopupComponent];

const MatModules = [
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatStepperModule,
  MatCardModule,
  MatRadioModule,
  MatIconModule,
  MatGridListModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCheckboxModule,
  MatSelectModule,
  MatTableModule,
  MatAutocompleteModule
];
@NgModule({
  declarations: [...compoents],
  imports: [CommonModule, ...MatModules],
  exports: [...compoents, ...MatModules]
})
export class SharedModule {}
