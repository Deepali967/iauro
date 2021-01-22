import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { RestService } from "./services/rest.service";
import { HttpClientModule } from "@angular/common/http";

const services = [RestService];

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [...services]
})
export class CoreModule {}
