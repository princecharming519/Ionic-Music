/**
 * Created by ankittater on 28/03/18.
 */

import {Pipe, PipeTransform} from '@angular/core';
import {format} from 'date-fns'

/**
 * Generated class for the DateConvertorPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'calanderConvertor',
})
export class CalanderConvertorPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: Date, args: string) {
    if (!args) {
      return format(value, 'MMM DD,YYYY')
    }
    if (args == "DAY") {
      return this.getNameOfDay(value.getDay())
    }
    if (args == "DATE") {
      return this.ordinal_suffix_of(value.getDate())
    }
  }


  ordinal_suffix_of(i) {
    var j = i % 10,
      k = i % 100;
    if (j == 1 && k != 11) {
      return i + "st";
    }
    if (j == 2 && k != 12) {
      return i + "nd";
    }
    if (j == 3 && k != 13) {
      return i + "rd";
    }
    return i + "th";
  }

  getNameOfDay(day) {
    switch (day) {
      case 1:
        return "Monday"
      case 2:
        return "Tuesday"
      case 3:
        return "Wednesday"
      case 4:
        return "Thursday"
      case 5:
        return "Friday"
      case 6:
        return "Saturday"
      case 7:
        return "Sunday"
      default:
        return ""

    }
  }

}
