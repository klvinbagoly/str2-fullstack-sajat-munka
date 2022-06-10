import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'simpleFilter'
})
export class SimpleFilterPipe implements PipeTransform {

  transform(value: any[], phrase: string): any[] {
    if (!value || !phrase) return value;

    return value.filter(item => ('' + item.first_name).includes(phrase))
  }

}
