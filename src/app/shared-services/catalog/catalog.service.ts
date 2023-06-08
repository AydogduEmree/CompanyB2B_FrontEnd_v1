import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PriceBookReqResponse} from "../../home/pricebook/pricebook-req-response";
import {Observable} from "rxjs";
import {ReferencePayload} from "../../home/pricebook/reference.payload";
import { map, tap } from 'rxjs/operators';
import {ServiceExecutionResult} from "../../service_result/ServiceExecutionResult";
import {LocalStorageService} from "ngx-webstorage";
import {ProductReqResponse} from "../../home/product/product-req-response";
import {FixedReqResponse} from "../../home/product-crud/fixed-req-response";
import {ViewFixedCharge} from "../../home/product-crud/view-fixed-charge";
import {ViewFixedChargeDTO} from "../../home/product-crud/view-fixed-charge-dto";
import {ViewFixedSubProductDTO} from "../../home/bundle-crud/view-fixed-sub-dto";

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  //------------- Price Plans --------------- //
  private addPriceBookURL : string = "http://localhost:8080/api/catalog/addPricePlan";
  private updPriceBookURL : string = "http://localhost:8080/api/catalog/updPricePlan";
  private getCurrencyListURL : string = "http://localhost:8080/api/catalog/curriencies";
  private getAllPlansURL : string = "http://localhost:8080/api/catalog/plans2";
  private getPricePlanWithIdURL : string = "http://localhost:8080/api/catalog/pricePlan/";


  //------------- Products --------------- //
  private getAllProductsURL : string = "http://localhost:8080/api/catalog/products";
  private getProductByIdURL : string = "http://localhost:8080/api/catalog/product/";
  private getRefBillFreqURL : string = "http://localhost:8080/api/catalog/refBillFreqs";
  private getRefProdCategoryURL : string = "http://localhost:8080/api/catalog/refProdCategories";

  private addProductWPlanURL : string = "http://localhost:8080/api/catalog/addProduct";
  private updProductWPlanURL : string = "http://localhost:8080/api/catalog/updProduct";
  //------------- Bundles --------------- //
  private getAllBundlesURL : string = "http://localhost:8080/api/catalog/bundles";
  private getBundleByIdURL : string = "http://localhost:8080/api/catalog/bundle/";

  private addProductWSubProductURL : string = "http://localhost:8080/api/catalog/addBundle";
  private updProductWSubProductURL : string = "http://localhost:8080/api/catalog/updBundle/";

  private getUnAssignedSubProdsURL : string = "http://localhost:8080/api/catalog/getUnAssignedSubProducts/";
  private getSubProductsURL : string = "http://localhost:8080/api/catalog/getSubProducts/";


  //------------- Fixed Charges --------------- //
  private getFCByProductIdURL : string = "http://localhost:8080/api/catalog/fixedCharges2/";

  constructor(private httpClient: HttpClient,
              private localStorage:LocalStorageService) {

  }
  //------------- Price Plans --------------- //
  addPriceBook(priceBookReqResponse : PriceBookReqResponse): Observable<any>{
    return this.httpClient
      .post<ServiceExecutionResult>(this.addPriceBookURL, priceBookReqResponse)
      .pipe(map(data=>{
          this.localStorage.store('data', data);
          this.localStorage.store('errorMessage', data.message);
          this.localStorage.store('errorCode', data.errorCode);
          this.localStorage.store('successCode', data.successCode);
      }));
  }
  updPriceBook(priceBookReqResponse : PriceBookReqResponse): Observable<any>{
    return this.httpClient
      .post<ServiceExecutionResult>(this.updPriceBookURL, priceBookReqResponse)
      .pipe(map(data=>{
        this.localStorage.store('data', data);
        this.localStorage.store('errorMessage', data.message);
        this.localStorage.store('errorCode', data.errorCode);
        this.localStorage.store('successCode', data.successCode);
      }));
  }
  getCurrencies():Observable<Array<ReferencePayload>>{
    return this.httpClient
      .get<Array<ReferencePayload>>(this.getCurrencyListURL);
  }
  getAllPlans():Observable<Array<PriceBookReqResponse>>{
    return this.httpClient.get<Array<PriceBookReqResponse>>(this.getAllPlansURL);
  }
  getPricePlanWithId(planId:number):Observable<PriceBookReqResponse>{
    return this.httpClient.get<PriceBookReqResponse>(this.getPricePlanWithIdURL+planId);
  }
  getErrorMessage() {
    return this.localStorage.retrieve('errorMessage');
  }
  //------------- Bundles --------------- //
  getAllBundles():Observable<Array<ProductReqResponse>>{
    return this.httpClient.get<Array<ProductReqResponse>>(this.getAllBundlesURL);
  }
  getBundleById(mId:string):Observable<ProductReqResponse>{
    return this.httpClient.get<ProductReqResponse>(this.getBundleByIdURL+mId);
  }
  getUnAssignedSubProds(mId:string):Observable<Array<ViewFixedCharge>>{
    return this.httpClient.get<Array<ViewFixedCharge>>(this.getUnAssignedSubProdsURL+mId);
  }
  getSubProducts(mId:string):Observable<Array<ViewFixedCharge>>{
    return this.httpClient.get<Array<ViewFixedCharge>>(this.getSubProductsURL+mId);
  }
  //------------- Products --------------- //
  getAllProducts():Observable<Array<ProductReqResponse>>{
    return this.httpClient.get<Array<ProductReqResponse>>(this.getAllProductsURL);
  }
  getProductById(mId:string):Observable<ProductReqResponse>{
    return this.httpClient.get<ProductReqResponse>(this.getProductByIdURL+mId);
  }
  getBillFreqs():Observable<Array<ReferencePayload>>{
    return this.httpClient
      .get<Array<ReferencePayload>>(this.getRefBillFreqURL);
  }
  getProdCategories():Observable<Array<ReferencePayload>>{
    return this.httpClient
      .get<Array<ReferencePayload>>(this.getRefProdCategoryURL);
  }
  addProductWPlans(  vfcDTO:ViewFixedChargeDTO//productReqResponse : ProductReqResponse, pJSONObj:Object

                 ): Observable<any>{
    return this.httpClient
      .post<ServiceExecutionResult>(this.addProductWPlanURL, vfcDTO );
  }
  updProductWPlans(  vfcDTO:ViewFixedChargeDTO  ): Observable<any>{
    return this.httpClient
      .post<ServiceExecutionResult>(this.updProductWPlanURL, vfcDTO );
  }
  addProductWSubProducts(  vfcDTO:ViewFixedSubProductDTO): Observable<any>{
    return this.httpClient
      .post<ServiceExecutionResult>(this.addProductWSubProductURL, vfcDTO );
  }

  //------------- Fixed Charges --------------- //
  getFCByProductId(fProductId:string):Observable<Array<ViewFixedCharge>>{
    return this.httpClient
      .get<Array<ViewFixedCharge>>(this.getFCByProductIdURL+fProductId);
  }
}
