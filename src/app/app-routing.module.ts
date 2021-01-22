import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import * as fromComponent from "./components";
const routes: Routes = [
  {
    path: "",
    redirectTo: "/registration",
    pathMatch: "full"
  },
  {
    path: "registration",
    component: fromComponent.RegistrationComponent
  },
  {
    path: "registration/:id",
    component: fromComponent.RegistrationComponent
  },
  {
    path: "display",
    component: fromComponent.DisplayComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
