import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-confirmation-popup",
  templateUrl: "./confirmation-popup.component.html",
  styleUrls: ["./confirmation-popup.component.scss"]
})
export class ConfirmationPopupComponent implements OnInit {
  @Output() handleCta: EventEmitter<any> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  ctaAction(action) {
    this.handleCta.emit(action);
  }
}
