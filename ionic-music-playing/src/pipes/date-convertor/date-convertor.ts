import {Pipe, PipeTransform} from '@angular/core';
import {format} from 'date-fns'

/**
 * Generated class for the DateConvertorPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'dateConvertor',
})
export class DateConvertorPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, args: string) {
    if (!args) {
      return format(new Date(value), 'MMM DD,YYYY')
    }
    if (args == "HOURS") {
      let d:any=new Date()
      let d1:any=new Date(value)
      return this.timeConversion(d-d1)
    }
    if (args == "DAY") {
      return format(new Date(value), 'MMM DD') + " at " + format(new Date(value), 'hh:mm a')
    }

    if(args=='time'){
      let timeString = value;
      let hourEnd = timeString.indexOf(":");
      let H = +timeString.substr(0, hourEnd);
      let h = H % 12 || 12;
      let ampm = H < 12 ? "AM" : "PM";
      timeString = h + timeString.substr(hourEnd, 3) + ampm;
      return timeString;
    }
  }

  timeConversion(millisec) {

    let seconds: number = parseInt((millisec / 1000).toFixed(1));

    let minutes: number = parseInt((millisec / (1000 * 60)).toFixed(1));

    let hours: number =parseInt((millisec / (1000 * 60 * 60)).toFixed(1));

    let days: number = parseInt((millisec / (1000 * 60 * 60 * 24)).toFixed(1));

    if (seconds < 60) {
      return seconds + " Sec";
    } else if (minutes < 60) {
      return minutes + " Min";
    } else if (hours < 24) {
      return hours + " Hrs";
    } else {
      return days + " Days"
    }
  }

  ordinal_suffix_of(i:number) {
    var j:number = i % 10,
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

    }
  }

}
