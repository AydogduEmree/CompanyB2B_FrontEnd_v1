

export interface ProductReqResponse {

  productName: string;
  description : string;
  productCost:number;
  defaultBillFreq:number;
  productHiearchType:string;
  productCategoryCode:string;
  chargeLevel?:string;
  subproducts?:string;
  disabled?:string;
  imageLink?:string;
  productId?:string;

}
