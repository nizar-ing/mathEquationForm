import { AbstractControl } from "@angular/forms";

export class AdditionValidators {

    static addition(operand1: string, operand2: string, target: string){
      return (form: AbstractControl) => {
        const sum = form.value[target];
        const op1 = form.value[operand1];
        const op2 = form.value[operand2];
        if( op1 + op2 === parseInt(sum)){
        return null;
        }
        return {additionError: true};
      }  
    }
}
