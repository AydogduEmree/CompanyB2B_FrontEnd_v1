import { Component } from '@angular/core';
import {AuthService} from "../../auth/service-pool/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UiRelationsService} from "../../shared-services/data-transfer/ui-relations.service";

@Component({
  selector: 'home-nav',
  templateUrl: './home-nav.component.html',
  styleUrls: ['./home-nav.component.css']
})
export class HomeNavComponent {
  navClicked: number=0;
    constructor(private authService: AuthService,
                private router: Router,
                private activatedRoute : ActivatedRoute,
                public UIService : UiRelationsService){
    }



  logOut(){
    this.authService.logOut();
    this.router.navigate(['/logIn']);
    this.UIService.setlogInNavbarUI("yes-ui");
  }
  changeNavDrm(){
      if(this.navClicked !== 1){
        this.navClicked=1;
      }else{
        this.navClicked=0;
      }

  }

}
