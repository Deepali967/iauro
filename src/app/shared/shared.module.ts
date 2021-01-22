import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EditPopupComponent } from "./components/edit-popup/edit-popup.component";
import { ConfirmationPopupComponent } from "./components/confirmation-popup/confirmation-popup.component";

const compoents = [EditPopupComponent, ConfirmationPopupComponent];

@NgModule({
  declarations: [...compoents],
  imports: [CommonModule],
  exports: [...compoents]
})
export class SharedModule {}
