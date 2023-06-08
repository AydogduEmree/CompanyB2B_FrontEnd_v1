import { Component  } from '@angular/core';
import {UiRelationsService} from "../../shared-services/data-transfer/ui-relations.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {

   constructor(public UIService : UiRelationsService){
     this.UIService.setlogInNavbarUI("no-ui");
   }

}
