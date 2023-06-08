import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productPagination'
})
export class ProductPaginationPipe implements PipeTransform {

  transform(value: any, fSelectedPage:string,fPagination:number,fFilterString:string, fOperator:string,fPressedStr:boolean ){ // , ...args: unknown[]
    //Here value is referred to 'products' array, not product obj
    if(value.length === 0 || fSelectedPage === '' ||  fSelectedPage.length === 0 || fPagination === 0 ){
      return value;
    }


    const wFilteredProducts=[];
    const wMainPage=[];
    for(const [i, product] of value.entries()){
      if( (i+1) >= ( (Number(fSelectedPage)-1)* fPagination )
            && (i+1) <  ( Number(fSelectedPage)* fPagination)
        ){

          if( (fFilterString != '' ||  fFilterString.length != 0)){
            if(fPressedStr === true){
              if (Number(fOperator) === Number("1")) {
                if (product['productName'].toUpperCase().includes(fFilterString.trim().toUpperCase())) {
                  wFilteredProducts.push(product);
                }
              }else if(Number(fOperator) === Number("2")){
                if(product['productName'].toUpperCase()===fFilterString.trim().toUpperCase()){
                  wFilteredProducts.push(product);
                }
              }
            }else{

                if (product['productName'].toUpperCase().includes(fFilterString.trim().toUpperCase())) {
                  wFilteredProducts.push(product);
                }


              //wMainPage.push(product);
            }

          } else{
                wMainPage.push(product);
          }


      }

    }
    if(fPressedStr === false){
      if(wFilteredProducts.length>0){
        return wFilteredProducts;
      }else{
        return wMainPage;
      }
    }
    if(wMainPage.length>0){
      return wMainPage;
    }else{
      return wFilteredProducts;
    }

  }

}
