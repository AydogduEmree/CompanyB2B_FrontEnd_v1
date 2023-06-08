import { Component } from '@angular/core';
import {AuthService} from "../../auth/service-pool/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UiRelationsService} from "../../shared-services/data-transfer/ui-relations.service";
import {PriceBookReqResponse} from "./pricebook-req-response";
import {CatalogService} from "../../shared-services/catalog/catalog.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ReferencePayload} from "./reference.payload";
import * as SYSTEMCONSTANT from "../../system_constants/system-constants";

@Component({
  selector: 'pricebook',
  templateUrl: './pricebook.component.html',
  styleUrls: ['./pricebook.component.css']
})
export class PricebookComponent {

  /*Form-Payload Correlation*/
  priceBookForm : FormGroup;
  priceBookReqResponse : PriceBookReqResponse;
  currencies :Array<ReferencePayload>=[];
  plans:Array<PriceBookReqResponse>=[];
  /*Form Error Handling*/
  wErrorAck:string='';
  vErrorStatus:string ="I"; //  Initial--> I , Error --> E , Success--> S
  wErrorDBAck:string='';
  bShowNotification:boolean=false;
  wStrOut : string="alert ";
  timeAt :number=0;
  /*UI Control*/
  vDropDown :number =10;
  bShowDropDown = false;
  bAddPriceBook:boolean=false;
  addPriceBookClicked:number=0;

  vCurrencyKod:string='1';
  vCurrencyAck:string='EUR';
  bShowCurrencyList:boolean=false;

  wCountChecks:number=0;
  wLastCheckBox:string='-1';
  wArrCheckBox:number[]=[];
  wUIOperation:string='';

  bShowFilter:boolean=false;
  wRadioOptions:string='1'; //'1' --> contains , '2' --> equals
  wFilterTempRadio:string='';
  wFilterTempAck:string='';
  wFilterAck:string='';
  bPressedSearch=true;
  constructor(private catalogService : CatalogService,
              private router: Router,
              private activatedRoute : ActivatedRoute,
              public UIService : UiRelationsService){

    this.priceBookReqResponse  ={
      price_plan_id: undefined,
      planName: '',
      description: '',
      currency_code: ''
    };
    this.priceBookForm=new FormGroup({
      planName:new FormControl('', [Validators.required, Validators.maxLength(100)]),
      description: new FormControl('', [Validators.required, Validators.maxLength(200)])
    });
    // @ts-ignore
    catalogService.getCurrencies()
      .subscribe(data=>{
        this.currencies=data;//console.log( this.currencies);
      });


    catalogService.getAllPlans()
      .subscribe(data=>{
        this.plans=data;
      })
    /*
    currencies : ReferencePayload[];
    this.currencies=[
      {kod:'1',        ack:'EUR',         ack_language_1:'Euro'},
      {kod:'2',        ack:'TL',         ack_language_1:'Turkish Liras'},
      {kod:'3',        ack:'USD',         ack_language_1:'Pezo'},
    ];
    console.log( this.currencies[0]);*/
  }

  /*UI Controls*/
  setDefaultValues(){
    if(this.priceBookForm.get('planName')?.value.length != 0){
      this.priceBookForm.get('planName')?.setValue('');
    }
    if(this.priceBookForm.get('description')?.value.length != 0){
      this.priceBookForm.get('description')?.setValue('');
    }
    this.vCurrencyKod='1';
    this.vCurrencyAck='EUR';
  }
  setAllValues(pId:string){

    for( var i=0;i<this.plans.length;i++){

      if(this.plans[i].price_plan_id  === pId){
        this.priceBookForm.get('planName')?.setValue(this.plans[i].planName);
        this.priceBookForm.get('description')?.setValue(this.plans[i].description);
        this.vCurrencyKod=this.plans[i].currency_code;
        console.log('Pid Value=' + pId);
        console.log(this.plans[i].price_plan_id);
        if(this.plans[i].currency_code==='1'){
          this.vCurrencyAck='EUR';
        }else if(this.plans[i].currency_code==='2'){
          this.vCurrencyAck='USD';
        }else if(this.plans[i].currency_code==='3'){
          this.vCurrencyAck='TL';
        }
        this.priceBookReqResponse  ={
          price_plan_id: pId,
          planName: this.plans[i].planName,
          description: this.plans[i].description,
          currency_code: this.vCurrencyAck
        };
       break;
      }
    }

  }
  showDropDown(mValue :number) :boolean {
    this.vDropDown=mValue;
    this.bShowDropDown=!this.bShowDropDown;
    return this.bShowDropDown ;
  }
  showFilter():boolean{
    this.bShowFilter=!this.bShowFilter;
    return this.bShowFilter;
  }
  clearFilter(){
    this.wFilterTempAck='';
    this.wFilterAck = '';
    this.bPressedSearch=false;
    this.showFilter();
  }
  doSearchFilter(){
    if(this.wFilterTempAck.length != 0){
      this.wFilterAck = this.wFilterTempAck ;
      this.bPressedSearch=true;
    }
    this.showFilter();
  }
  showAddPriceBook(){
    this.bAddPriceBook=!this.bAddPriceBook;
  }
  togglePopPriceBook(pId:number){
    this.bAddPriceBook=false;
    if(this.addPriceBookClicked===0){
      this.addPriceBookClicked=1;
    }else{
      this.addPriceBookClicked=0;
    }
    this.bShowCurrencyList=false;
    if(pId===-1){
      this.wUIOperation='INSERT';
      this.setDefaultValues();
    }else{
      this.wUIOperation='UPDATE';
      this.setAllValues(this.wLastCheckBox);

    }

  };

  showCurrencyId(mEvent : any){
    this.vCurrencyKod=mEvent.currentTarget.id;
    this.vCurrencyAck=this.currencies[mEvent.currentTarget.id-1].ack;// console.log(mEvent.currentTarget.id);
    this.bShowCurrencyList=!this.bShowCurrencyList;
  }
  showCurrencyList() :void {
       this.bShowCurrencyList=!this.bShowCurrencyList;
  }
  /*API Controls*/
  onSubmit(mEvent : any){

    //console.log(this.priceBookForm.get('planName')?.value);
    // console.log(this.priceBookForm.get('description')?.value);
   // console.log(this.vCurrencyKod+1);
   // this.priceBookReqResponse.currency_code= this.priceBookForm.get('currency_code').value;
    console.log('ONSUBMIT-this.vCurrencyKod='+ this.vCurrencyKod);
    console.log('ONSUBMIT-this.wUIOperation='+ this.wUIOperation);
    if(mEvent.submitter.id ==="submitButon"){// console.log(mEvent.submitter.id);
      //@ts-ignore
      this.priceBookReqResponse.planName= this.priceBookForm.get('planName').value;
      // @ts-ignore
      this.priceBookReqResponse.description= this.priceBookForm.get('description').value;
      // @ts-ignore
      this.priceBookReqResponse.currency_code=this.vCurrencyKod;

      this.wErrorAck = this.commit_control();

      if(this.wErrorAck === ''){ //hata var
          this.vErrorStatus ="E";
          this.bShowNotification=true;
          console.log(this.getMessageAck());
          return;
      }else if(this.wErrorAck === 'NO ERROR'){
          this.vErrorStatus ="S";
          this.bShowNotification=true;
          console.log(this.getMessageAck());
      }
      if( this.wUIOperation==='INSERT'){
        this.catalogService.addPriceBook(this.priceBookReqResponse)
          .subscribe(data=>{
            this.refresh();
            clearTimeout(this.timeAt);
            this.timeAt=setTimeout(()=>{
              this.togglePopPriceBook(-1);
              this.wUIOperation='';
              console.log(data);
            }, 1200);

          }, err=>{
            this.vErrorStatus ="D";
            this.bShowNotification=true;
            this.wErrorDBAck= this.catalogService.getErrorMessage();//'Connection Error' ;//err.error.message;
            console.log('Hata mesajı Local storagedan' + this.wErrorDBAck);
            console.log('Subscribe dan error status 417 :'+ err.message);
          });
      }else if(this.wUIOperation==='UPDATE'){
        this.catalogService.updPriceBook(this.priceBookReqResponse)
          .subscribe(data=>{
            this.refresh();
            clearTimeout(this.timeAt);
            this.timeAt=setTimeout(()=>{
              this.togglePopPriceBook(-1);
              this.wUIOperation='';
              console.log(data);
            }, 1200);
          }, err=>{
            this.vErrorStatus ="D";
            this.bShowNotification=true;
            this.wErrorDBAck= this.catalogService.getErrorMessage();//'Connection Error' ;//err.error.message;
            console.log('Hata mesajı Local storagedan' + this.wErrorDBAck);
            console.log('Subscribe dan error status 417 :'+ err.message);
          });
      }
    }

  }
  /* Checkbox on Page*/
  enableCBEdit(mEvent:any){

    if(mEvent.currentTarget.checked){//console.log(mEvent.currentTarget.checked);
      this.wCountChecks++;
      this.wArrCheckBox.push(mEvent.target.attributes.id);
    }else{
      this.wCountChecks--;
      const index = this.wArrCheckBox.indexOf(mEvent.target.attributes.id, 0);
      if (index > -1) {
        this.wArrCheckBox.splice(index, 1);
      }
    }
    if(this.wArrCheckBox.length===1){
      // @ts-ignore
     this.wLastCheckBox=this.wArrCheckBox[0].value; //  this.wLastCheckBox= this.wArrCheckBox[0];
    }
  }
  commit_control():string{
    if(this.wUIOperation==='INSERT'){
      if(this.priceBookForm.get('planName')?.value.length === 0){
        return '';
      }
      if(!this.priceBookForm.get('planName')?.valid && this.priceBookForm.get('planName')?.touched){
        return '';
      }
      if(!this.priceBookForm.get('planName')?.dirty  ){
        return '';
      }
    }

    if(this.priceBookForm.get('description')?.value.length === 0){
      return '';
    }
    if(!this.priceBookForm.get('description')?.dirty ){
      return '';
    }

    if(!this.priceBookForm.get('description')?.valid && this.priceBookForm.get('description')?.touched){
      return '';
    }

    return 'NO ERROR';
  }
  /*UTIL Functions*/

  getMessageAck():string{
    if(this.vErrorStatus  ==="E"){
      if(
        (!this.priceBookForm.get('planName')?.valid && this.priceBookForm.get('planName')?.touched) ||
        (!this.priceBookForm.get('description')?.valid && this.priceBookForm.get('description')?.touched)
      ){
        return SYSTEMCONSTANT.NOTIFICATION_IMAGE[1].message;//SYSTEMCONSTANT.REQUIRED_MESSAGE;
      }
    }else if(this.vErrorStatus  ==="S"){
      return SYSTEMCONSTANT.NOTIFICATION_IMAGE[0].message;//SYSTEMCONSTANT.SUCCESS_MESSAGE;
    }
    else if(this.vErrorStatus  ==="D"){
      return this.wErrorDBAck;
    }

    return SYSTEMCONSTANT.UNKNOWN_MESSAGE;
  }


  refresh(): void {
    window.location.reload();
  }
  getCountPlans():number{
    return this.plans.length;
  }

  promptText(str : any){
    alert(str);
  }
}
