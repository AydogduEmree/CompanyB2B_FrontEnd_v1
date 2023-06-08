import { Component } from '@angular/core';
import {UiRelationsService} from "./shared-services/data-transfer/ui-relations.service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CompanyB2B';
  constructor(public UIService : UiRelationsService){//

  }
}
