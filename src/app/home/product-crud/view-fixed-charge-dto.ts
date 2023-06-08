import {ProductReqResponse} from "../product/product-req-response";
export class ViewFixedChargeDTO  {
  constructor(public productRequest: ProductReqResponse, public fixedChargeRequest : string) {

  }
}
