import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'subProductPagination'
})
export class SubproductPaginationPipe implements PipeTransform {

  transform(value: any, leftItem: any, fSelectedPage:number) {
    //Here value is referred to 'products' array, not product obj
    if(value.length === 0 ||  value.length < 7 ){
      return value;
    }

    //leftItem is an array and represents items that are dragged to right side as SELECTED.
    const wFilteredProducts=[];
    let wProductSelected: boolean=false;
    let wIdxProduct:number=0;
    for(const [i, product] of value.entries()){
      wProductSelected=false;
      if( (i+1) > ( (fSelectedPage-1)* 6 )
        && (i+1) <=  ( fSelectedPage* 6)
      ){
         if(leftItem.length >0){
           for(let j=0; j< leftItem.length;j++ ){
              let mSelectedProduct = leftItem[j].data;//console.log(mSelectedProduct[0]['productName']);/*
                if(product['productName'].toUpperCase() === mSelectedProduct[0]['productName'].toUpperCase() ){
                  wProductSelected=true;
                  wIdxProduct=i;
                }
           }
         }
        if(wProductSelected){
          continue;
        }
        wFilteredProducts.push(product);
      }

    }
    if(wProductSelected){
      value.splice(wIdxProduct, 1);
    }

    return wFilteredProducts;

  }

}
