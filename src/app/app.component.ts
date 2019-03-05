import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild('jsonValueTextArea')
  jsonValueTextArea: ElementRef;

  hal: string;

  renderHAL() {
    this.hal = this.jsonValueTextArea.nativeElement.value;
  }

}
