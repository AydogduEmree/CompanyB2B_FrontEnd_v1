import { Component } from '@angular/core';
import {CatalogService} from "../../shared-services/catalog/catalog.service";
import {PriceBookReqResponse} from "../pricebook/pricebook-req-response";
import {ProductReqResponse} from "./product-req-response";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  /*Form-Payload Correlation*/
  products:Array<ProductReqResponse>=[];


  /*UI Control*/
  vDropDown :number =10;
  bShowDropDown = false;
  bAddProduct:boolean=false;
  /*Pagination*/
  bShowPageList:boolean=false;
  vSelectedPage:string="1";
  vTotalPage:number=1;
  V_PAGINATION:number=25;
  vPageArr:[]=[];
  vPageOptionsArr:[]=[];
  vSlot1:string="1";
  vSlot2:string="2";
  vSlot3:string="3";
  vSlot4:string="...";
  bRemoveSlot2:boolean=true;
  bRemoveSlot3:boolean=true;
  bRemoveSlot4:boolean=true;

  /* Product Column Filters*/
  bShowFilter:boolean=false;
  wRadioOptions:string='1'; //'1' --> contains , '2' --> equals
  wFilterTempAck:string='';
  wFilterAck:string='';
  bPressedSearch: boolean =true;
  constructor(private catalogService : CatalogService,
              private router: Router){
    // @ts-ignore
    catalogService.getAllProducts()
      .subscribe(data=>{
        this.products=data;
        this.setPaginationDefaults();

      });

  }

  setPaginationDefaults(){
    //getCountProducts() management under 100 total rows
    if(this.getCountProducts() <=10){
      this.V_PAGINATION=10;
      this.bRemoveSlot2=false;
      this.bRemoveSlot3=false;
      this.bRemoveSlot4=false;
    }else if(this.getCountProducts() >10 && this.getCountProducts() <=25){
      this.V_PAGINATION=25;
      this.bRemoveSlot2=false;
      this.bRemoveSlot3=false;
      this.bRemoveSlot4=false;
    }else if(this.getCountProducts() >50 && this.getCountProducts() <=100){
      this.V_PAGINATION=25;
      this.bRemoveSlot3=false;
      this.bRemoveSlot4=false;
    }else if(this.getCountProducts() >100){
      this.V_PAGINATION=25;
    }
    this.vDropDown=this.V_PAGINATION;
    this.vTotalPage=this.getPageCount(this.V_PAGINATION);
    console.log(this.vTotalPage);
    // @ts-ignore
    this.vPageArr = Array( this.vTotalPage).fill().map((x,i)=>i+1);
    this.setPageOptionsArr(Number(this.vSelectedPage));
  }
  showPageList()  {
    this.bShowPageList=!this.bShowPageList;
  }
  setPageOptionsArr(selectedPage:number){
    this.vPageOptionsArr=[];
    if(this.vTotalPage>4){
      if(selectedPage<4){
        // @ts-ignore
        this.vPageOptionsArr=Array( this.vTotalPage-3).fill().map((x,i)=>this.vTotalPage-i).reverse();
      }else{
          if(selectedPage===this.vTotalPage){
            // @ts-ignore
            this.vPageOptionsArr=Array( this.vTotalPage-2).fill().map((x,i)=>i+1);
          }else if(selectedPage<this.vTotalPage){

            for (let i = 0; i < this.vTotalPage ; i++) {
              if( (i=== selectedPage-2)){
                continue;
              }
              if( (i=== selectedPage-1)){
                continue;
              }
              if( (i=== selectedPage)){
                continue;
              }
                // @ts-ignore
              this.vPageOptionsArr.push(i+1); //                this.vPageOptionsArr[i]=i+1;
            }
          }
       }
      }

    }

  selectPagination(slotNo:number,slotValue:string){
    this.vSelectedPage=slotValue;
    this.setSlotValues();
  }
  selectPaginationInList(slotValue:number){
    this.vSelectedPage=String(slotValue);
    this.showPageList();
    this.setSlotValues();
    this.setPageOptionsArr(Number(this.vSelectedPage));
     console.log(slotValue);
  }
  setSlotValues(){
    if(this.vTotalPage===1){
      this.bRemoveSlot2=false;
      this.bRemoveSlot3=false;
      this.bRemoveSlot4=false;
      this.vSlot1=String(1);
    }else if(this.vTotalPage===2){
      this.bRemoveSlot3=false;
      this.bRemoveSlot4=false;
      this.vSlot1=String(1);
      this.vSlot2=String(2);
    }
    else if(this.vTotalPage===3){
      this.bRemoveSlot2=true;
      this.bRemoveSlot3=true;
      this.bRemoveSlot4=false;
      this.vSlot1=String(1);
      this.vSlot2=String(2);
      this.vSlot3=String(3);
    }else if(this.vTotalPage>3){
      this.bRemoveSlot2=true;
      this.bRemoveSlot3=true;
      this.bRemoveSlot4=true;
      if(Number(this.vSelectedPage)<4){
        this.vSlot1=String(1);
        this.vSlot2=String(2);
        this.vSlot3=String(3);
        //change list '...' here
      }
      if(Number(this.vSelectedPage)>3){
        this.vSlot1=String(Number(this.vSelectedPage)-1);
        this.vSlot2=String(Number(this.vSelectedPage));
        this.vSlot3=String(Number(this.vSelectedPage)+1);
        //change list '...' here
      }
      if(Number(this.vSelectedPage)===this.vTotalPage){

        this.vSlot1=String(Number(this.vSelectedPage)-1);
        this.bRemoveSlot2=false;
        this.vSlot2='';
        this.vSlot3= this.vSelectedPage;
        //change list '...' here
      }
    }
    //commented this.setPageOptionsArr(Number(this.vSelectedPage));
  }
  pageNext(){

    if(Number(this.vSelectedPage)=== this.vTotalPage){
      console.log("Restriction");
      return;
    }
    this.vSelectedPage=String(Number(this.vSelectedPage)+1);
    this.setSlotValues();
    this.setPageOptionsArr(Number(this.vSelectedPage));
  }
  pagePrevious(){
    if(Number(this.vSelectedPage)=== 1){
      console.log("Restriction");
      this.setPageOptionsArr(Number(this.vSelectedPage));
      return;
    }
    this.vSelectedPage=String(Number(this.vSelectedPage)-1);
    this.setSlotValues();
    this.setPageOptionsArr(Number(this.vSelectedPage));
  }
  setPageRows(fValue :number){
    this.showDropDown(fValue);
    this.V_PAGINATION=fValue;
    this.vSelectedPage='1';
    this.vTotalPage=this.getPageCount(this.V_PAGINATION);
    this.setSlotValues();
    this.setPageOptionsArr(Number(this.vSelectedPage));
    if(this.bShowPageList === true){
      this.bShowPageList=!this.bShowPageList;
    }
  }
  /* Product Column Filters*/
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

  /*UI Control Functions*/
  showDropDown(mValue :number) :boolean {
    this.vDropDown=mValue;
    this.bShowDropDown=!this.bShowDropDown;
    return this.bShowDropDown ;
  }
  openProductDetails(mId:string,mOperation:string){
    this.bAddProduct=!this.bAddProduct;
      if(mOperation ==='I'){
        this.router.navigate(['/products', 'add', '' ]);
      }else if (mOperation ==='U'){
        this.router.navigate(['/products', 'edit', mId ]);
      }
  }


  getCountProducts():number{
    return this.products.length;
  }
  showAddProduct(){
    this.bAddProduct=!this.bAddProduct;
  }
  //Common Utility Functions
  getPageCount(pListCount:number):number{
    let totalCount= this.getCountProducts();
    let mainPage=  ( totalCount - ( totalCount % pListCount) ) / pListCount;

     if (( totalCount % pListCount) === 0 ){
       return  mainPage ;
     }
    return ( mainPage+1) ;
  }
  refresh(): void {
    window.location.reload();
  }
  promptText(str : any){
    alert(str);
  }
}
