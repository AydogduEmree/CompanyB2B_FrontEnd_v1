import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceBookFilter'
})
export class PriceBookFilterPipe implements PipeTransform {

  transform(value: any, fFilterString:string, fOperator:string) {
    //Here value is referred to 'users' array, not user obj
    if(value.length === 0 || fFilterString === '' ||  fFilterString.length === 0 ){
      return value;
    }
    const wFilteredPlans=[];
    for(const plan of value){
      if (Number(fOperator) === Number("1")) {
        if (plan['planName'].toUpperCase().includes(fFilterString.trim().toUpperCase())) {
          wFilteredPlans.push(plan);
        }
      }else if(Number(fOperator) === Number("2")){
        if(plan['planName'].toUpperCase()===fFilterString.trim().toUpperCase()){
          wFilteredPlans.push(plan);
        }
      }


    }
    return wFilteredPlans;
  }

}
