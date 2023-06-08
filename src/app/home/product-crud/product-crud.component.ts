import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CatalogService} from "../../shared-services/catalog/catalog.service";
import {ProductReqResponse} from "../product/product-req-response";
import {ReferencePayload} from "../pricebook/reference.payload";
import {FixedReqResponse} from "./fixed-req-response";
import {ViewFixedCharge} from "./view-fixed-charge";
import {PriceBookReqResponse} from "../pricebook/pricebook-req-response";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {ViewFixedChargeDTO} from "./view-fixed-charge-dto";


@Component({
  selector: 'app-product-crud',
  templateUrl: './product-crud.component.html',
  styleUrls: ['./product-crud.component.css']
})
export class ProductCrudComponent {
  wProduct:ProductReqResponse={
                  productName: "",
                  description : "",
                  productCost:-1,
                  defaultBillFreq:-1,
                  productHiearchType:"",
                  productCategoryCode:"",
                  chargeLevel:"",
                  subproducts:"",
                  disabled:"",
                  imageLink:"",
                  productId:""

                };
  /*wSelectedPlans :Array<ViewFixedCharge>=[];
  wAvailablePlans:Array<PriceBookReqResponse>=[];*/
  wSelectedPlans :Array<any>=[];
  wPrevSelectedPlans :Array<any>=[];
  wAvailablePlans:Array<any>=[];
  billFreqs :Array<ReferencePayload>=[];
  vBillFreqKod:string='0';
  vBillFreqAck:string='One Time';
  bShowBillFreqs:boolean=false;

  prodCategories :Array<ReferencePayload>=[];
  vProdCategoryKod:string='1';
  vProdCategoryAck:string='Hardware';
  bShowProdCategories:boolean=false;

  vRadioHiearchy:string="1";
  cbProdActive:string='Y';
  wPageTitle:string="";
  wOperation:string='';
  wProductId:string='';
  vCurrentTabNo:number=1;
  bTab1:boolean=true;
  bTab2:boolean=false;
  bTab3:boolean=false;
  timeAt :number=0;
  constructor(private catalogService : CatalogService,
              private router: Router,
              private activatedRoute : ActivatedRoute){

    this.activatedRoute.params.subscribe(data=>{
      this.wOperation=data['operation'];
      this.wProductId=data['productId'];
    })
    //Reference Adding
    this.catalogService.getProdCategories()
      .subscribe(data=>{
        this.prodCategories = data;

        this.catalogService.getBillFreqs()
          .subscribe(data=>{
            this.billFreqs = data;

            this.catalogService.getAllPlans()
              .subscribe(data=>{
                this.wAvailablePlans=data;
              });
            if(this.wOperation==='edit'){
              this.setEditModeValues();
            }else{
              this.wPageTitle="Add Product";
            }
          });
      });
}
  setEditModeValues(){
    // @ts-ignore
    this.catalogService.getProductById(this.wProductId)
      .subscribe(data=>{
        this.wProduct = data;

        //TAB - 1 : Product Info
        this.vBillFreqKod=String(this.wProduct.defaultBillFreq);
        this.vBillFreqAck= this.getBillFreqKodAck( this.vBillFreqKod);
        this.vRadioHiearchy=(this.wProduct.productHiearchType === 'NONE') ? '1'
          :(this.wProduct.productHiearchType === 'PARENT') ? '2' : '3';
        this.vProdCategoryAck =this.wProduct.productCategoryCode;
        this.vProdCategoryKod =  this.getCategoryAckKod(this.wProduct.productCategoryCode);
        this.cbProdActive =(this.wProduct.disabled==='Y') ? "" : "Y";


        //TAB - 2: FIXED CHARGE
        this.catalogService.getFCByProductId(this.wProductId)
          .subscribe(data=>{
          this.wSelectedPlans=data;
          this.wPrevSelectedPlans=data;
            this.findAvailablePlans();
          });


      });
    this.wPageTitle="Edit Product";
  }
  findAvailablePlans(){
    for (var i = 0, len = this.wAvailablePlans.length; i < len; i++) {
      for (var j = 0, len2 = this.wSelectedPlans.length; j < len2; j++) {

         if (this.wAvailablePlans[i].planName === this.wSelectedPlans[j].planName) {

          this.wAvailablePlans.splice(i, 1);
          len=this.wAvailablePlans.length;
        }
      }
    }

  }
  //UI Control Functions
  showCategoryList() :void {
    this.bShowProdCategories=!this.bShowProdCategories;
  }
  showCategoryId(mEvent : any){
    this.vProdCategoryKod=mEvent.currentTarget.id;
    this.vProdCategoryAck=this.prodCategories[mEvent.currentTarget.id-1].ack;// console.log(mEvent.currentTarget.id);
    this.bShowProdCategories=!this.bShowProdCategories;
  }


  showBillFreqs() :void {
    this.bShowBillFreqs=!this.bShowBillFreqs;
  }
  showBillFreqId(mEvent : any){
    this.vBillFreqKod=mEvent.currentTarget.id;
    this.vBillFreqAck=this.getBillFreqKodAck(mEvent.currentTarget.id);
    //this.billFreqs[mEvent.currentTarget.id].ack;// console.log(mEvent.currentTarget.id);
    this.bShowBillFreqs=!this.bShowBillFreqs;
  }
  toggleTab1(){
    this.bTab1=!this.bTab1;
    if(this.bTab2 === true){
      this.toggleTab2();
    }
    if(this.bTab3 === true){
      this.toggleTab3();
    }
  }
  toggleTab2(){
    this.bTab2=!this.bTab2;
    if(this.bTab1 === true){
      this.toggleTab1();
    }
    if(this.bTab3 === true){
      this.toggleTab3();
    }
  }
  toggleTab3(){
    this.bTab3=!this.bTab3;
    if(this.bTab2 === true){
      this.toggleTab2();
    }
    if(this.bTab1 === true){
      this.toggleTab1();
    }
  }
  btnCancel(){
    this.router.navigateByUrl('/products');
  }

  btnNext(){


    if(this.vCurrentTabNo===1){
      this.toggleTab1();
      this.toggleTab2();
    }else if(this.vCurrentTabNo===2){
      this.toggleTab2();
      this.toggleTab3();
      //disable btnNext
    }
    this.vCurrentTabNo= this.vCurrentTabNo+1;
  }
  btnPrevious(){


    if(this.vCurrentTabNo===3){
      this.toggleTab3();
      this.toggleTab2();
    }else if(this.vCurrentTabNo===2){
      this.toggleTab2();
      this.toggleTab1();
      //disable btnNext
    }
    this.vCurrentTabNo= this.vCurrentTabNo-1;
  }
  // @ts-ignore
  btnSubmit(){
    //commit_control(); -- not created
    /* 1- PRODUCT DETAILS */
    this.wProduct.defaultBillFreq =Number(this.vBillFreqKod);
    this.wProduct.productHiearchType= (this.vRadioHiearchy=== '1')? 'NONE' : (this.vRadioHiearchy=== '2')? "PARENT": "CHILD";
    this.wProduct.productCategoryCode = this.vProdCategoryAck;
    this.wProduct.chargeLevel="";
    this.wProduct.subproducts="";
    this.wProduct.disabled=  (this.cbProdActive==='Y') ? '' : 'Y'; // console.log(this.wProduct); //this.wSelectedPlans);

    /* 2- FIXED CHARGE DETAILS */
    const wPreviousFCLength :number=this.wSelectedPlans.length;
    const wJOSelectedPlans: Record<string, string> = {};
    let idxNo:number=1;
    let strJOSelectedPlans:string="[";
    for( const selectedPlan of this.wSelectedPlans){
        if(selectedPlan.fcSeqId>0){
              strJOSelectedPlans = strJOSelectedPlans +
                "{"+
                " \"fcSeqId\": " + selectedPlan.fcSeqId + ","+
                " \"pricePlanId\": \"" + selectedPlan.pricePlanId +  "\","+
                " \"planName\": \"" + selectedPlan.planName +  "\","+
                " \"productId\": " + selectedPlan.productId +  ","+
                " \"productName\": \"" + selectedPlan.productName +  "\","+
                " \"productDescription\": \"" + selectedPlan.productDescription +  "\","+
                " \"billFreq\": " + selectedPlan.billFreq +  ","+
                " \"billFreqAck\": \"" + selectedPlan.billFreqAck +  "\","+
                " \"effectDate\": " + selectedPlan.effectDate +  ","+
                " \"priceCost\": " + selectedPlan.priceCost +  ","+
                " \"currencyKod\": " + selectedPlan.currencyKod +  ","+
                " \"currencyAck\": \"" + selectedPlan.currencyAck +  "\","+
                " \"refund\": \"" + selectedPlan.refund+ "\"" +
                  "}"
              ;


        }else{
          let wJEProductId = (Number(this.wProduct.productId)>0) ? this.wProduct.productId : "\"\"";
          let wJEBillFreq = (Number(this.wProduct.defaultBillFreq)>=0) ? this.wProduct.defaultBillFreq : "\"\"";
          strJOSelectedPlans = strJOSelectedPlans +
            "{"+
            " \"fcSeqId\": \"\"," +
            " \"pricePlanId\": \"" + selectedPlan.price_plan_id +  "\","+
            " \"planName\": \"" + selectedPlan.planName +  "\","+
            " \"productId\": " + wJEProductId +  ","+
            " \"productName\": \"" + "" +  "\","+
            " \"productDescription\": \"" + "" +  "\","+
            " \"billFreq\": " + wJEBillFreq +  ","+
            " \"billFreqAck\": \"" +   "\","+
            " \"effectDate\": \"" +    "\","+
            " \"priceCost\": " + selectedPlan.priceCost +  ","+
            " \"currencyKod\": " + selectedPlan.currency_code +  ","+
            " \"currencyAck\": \"" +    "\","+
            " \"refund\": \"\"" +
            "}"
          ;

        }

      if(idxNo < this.wSelectedPlans.length){
        strJOSelectedPlans = strJOSelectedPlans +",";
      }
      idxNo = idxNo +1;
    }
    strJOSelectedPlans = strJOSelectedPlans +"]";  //    console.log(strJOSelectedPlans);

     let vfcDTO:ViewFixedChargeDTO;
     if (this.wOperation === 'add'){
      vfcDTO=new ViewFixedChargeDTO(this.wProduct, strJOSelectedPlans); //console.log(vfcDTO.productRequest);       console.log(vfcDTO.fixedChargeRequest);
      this.catalogService.addProductWPlans(vfcDTO) //, strJOSelectedPlans
        .subscribe(data => {
          clearTimeout(this.timeAt);
          this.timeAt = setTimeout(() => {
            this.router.navigateByUrl('/products');
          }, 1200);

        });
     }else if (this.wOperation === 'edit'){
       vfcDTO=new ViewFixedChargeDTO(this.wProduct, strJOSelectedPlans); //console.log(vfcDTO.productRequest);       console.log(vfcDTO.fixedChargeRequest);
       this.catalogService.updProductWPlans(vfcDTO) //, strJOSelectedPlans
         .subscribe(data => {
           clearTimeout(this.timeAt);
           this.timeAt = setTimeout(() => {
             this.router.navigateByUrl('/products');
           }, 1200);

         });
     }

  }
  //Util  functions
  promptText(str : any){
    alert(str);
  }
  fcPriceChange(event:any){
    console.log(event.currentTarget.value);

    if(this.wSelectedPlans.length>0){
      for(const sPlan of this.wSelectedPlans){
        if(sPlan.fcSeqId === event.currentTarget.id){
          sPlan.priceCost = event.currentTarget.value;
          console.log('sPlan.fcSeqId=' + sPlan.fcSeqId + '  ** ' + event.currentTarget.value  );
        }else{
          sPlan.productId=this.wProductId;
        }
      }
    }


  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  getBillFreqKodAck( fKod:string):string  {
     for (const billFreq of this.billFreqs){
        if (billFreq['kod']===  fKod ){
          return billFreq['ack'];
        }
     }
    return "";
  }
  // @ts-ignore
  getCategoryAckKod(fAck:string):string{
    for(const category of this.prodCategories){
      if(category['ack']===fAck){
        return category['kod'];
      }
      return "";
    }
  }
}
