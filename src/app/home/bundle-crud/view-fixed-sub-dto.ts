import {ProductReqResponse} from "../product/product-req-response";
import {ViewFixedCharge} from "../product-crud/view-fixed-charge";
export class ViewFixedSubProductDTO  {
  constructor(public productRequest: ProductReqResponse,
              public fixedChargeRequest : string,
              public subProductList: Array<ViewFixedCharge>) {

  }
}
