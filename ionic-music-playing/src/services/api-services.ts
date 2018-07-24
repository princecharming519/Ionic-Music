import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Subject} from "rxjs";

@Injectable()
export class ApiService {
  public url = "https://max1023.fm";
  private categoryUrl = this.url+"/wp-json/wp/v2/posts?categories=1"
  private scheduleUrl = this.url+"/wp-json/wp/v2/schedule"
  private postUrl = this.url+"/api/core/get_recent_posts/?page=1"
  scheduleData: any = [];
  day: string

  public changeBGImage = new Subject<any[]>();
  public emitChange(data: any){
    this.changeBGImage.next(data)
  }

  constructor(private http: Http) {
    const date = new Date().getDay()
    this.day = this.getToday(date)
    this.getCurrentSchedule();
  }

  changeJsonUrl(url){
    this.url = url;
    this.categoryUrl = this.url+"/wp-json/wp/v2/posts?categories=1"
    this.scheduleUrl = this.url+"/wp-json/wp/v2/schedule"
    this.postUrl = this.url+"/api/core/get_recent_posts/?page=1"
  }

  getCategoryData() {
    return this.http.get(this.categoryUrl);
  }

  getScheduleData() {
    return this.http.get(this.scheduleUrl);
  }

  getPostData() {
    return this.http.get(this.postUrl);
  }


  getCurrentSchedule() {
    this.getScheduleData().subscribe(data => {
      let d: any = data;
      let sch = JSON.parse(d._body);
      sch.forEach(value => {
        if (value.day_of_show instanceof Array) {
          value.day_of_show.forEach(day => {
            if (this.day == day) {
              var scheduleData: any = {};
              scheduleData.start_time = value.start_time;
              scheduleData.end_time = value.end_time;
              scheduleData.title = value.title.rendered;
              scheduleData.presenter_image = value.presenter_image.guid;
              scheduleData.presenters_name = value.presenters_name
              scheduleData.about_show = value.about_show
              scheduleData.songUrl = value.podcast_listen
              scheduleData.day = day
              this.scheduleData.push(scheduleData)
            }
          })
        } else {
          if (this.day == value.day_of_show) {
            var scheduleData: any = {};
            scheduleData.start_time = value.start_time;
            scheduleData.end_time = value.end_time;
            scheduleData.title = value.title.rendered;
            scheduleData.presenter_image = value.presenter_image.guid;
            scheduleData.presenters_name = value.presenters_name
            scheduleData.about_show = value.about_show
            scheduleData.songUrl = value.podcast_listen
            scheduleData.day = value.day_of_show
            this.scheduleData.push(scheduleData)
          }
        }
      });
      this.scheduleData = this.scheduleData.sort(this.compare)
      //console.log("Schedule Data " + JSON.stringify(this.scheduleData))
      this.currentRunningSchedule()
      this.emitChange({
        onAirNow: 'ON AIR NOW',
        img: this.scheduleData[0].presenter_image,
        name: this.scheduleData[0].presenters_name,
        song: this.scheduleData[0].title
      })
    })

  }

  compare(a, b) {
    if (a.start_time < b.start_time)
      return -1;
    if (a.start_time > b.start_time)
      return 1;
    return 0;
  }


  getToday(i) {
    var day = ""
    if (i == 0) {
      day = 'Sunday'
    } else if (i == 1) {
      day = 'Monday'
    }
    else if (i == 2) {
      day = 'Tuesday'
    }
    else if (i == 3) {
      day = 'Wednesday'
    }
    else if (i == 4) {
      day = 'Thursday'
    }
    else if (i == 5) {
      day = 'Friday'
    }
    else {
      day = 'Saturday'
    }
    return day
  }

  currentRunningSchedule() {
    var date = new Date()
    var hour = date.getHours()
    var count = 0;
    this.scheduleData.forEach(value => {
      var time1 = parseInt(value.start_time.split(":")[0])
      var time2 = parseInt(value.end_time.split(":")[0])
      if (time1 <= hour && time2 > hour) {
        //console.log("Current Date" + JSON.stringify(value))
        this.rotateCalendar(count)
      }
      count++

    })
  }

  rotateCalendar(position) {
    //console.log(position)
    this.scheduleData = this.scheduleData.concat(this.scheduleData.splice(0,position));
    //console.log(this.scheduleData);   return cal;
    if(this.scheduleData[0].hasOwnProperty('presenter_image')){
      this.emitChange({
        onAirNow: 'ON AIR NOW',
        img: this.scheduleData[0].presenter_image,
        name: this.scheduleData[0].presenters_name,
        song: this.scheduleData[0].title
      })
    }

    return
  }

}
