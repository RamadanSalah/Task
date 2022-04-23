import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {

  transform(value: Date): number {
 let year= new Date(value).getFullYear();
 let today = new Date().getFullYear();
let age = (today-year);
    return age;
  }

}
