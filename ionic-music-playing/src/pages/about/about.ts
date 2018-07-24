import {Component, ViewChild, ElementRef} from '@angular/core';
import {NavController, Slides, Content} from 'ionic-angular';
import {ApiService} from "../../services/api-services";
import {RadioService} from "../../services/radio-service";

declare var $;

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  @ViewChild(Content) content: Content;
  schedules: any = {}
  showSlider: number = -1;
  currentDay: number = new Date().getDay();
  scheduleData: any = [];
  

  constructor(public navCtrl: NavController, public apiServices: ApiService, public radioService: RadioService) {
    this.apiServices.getScheduleData().subscribe(data => {
      let d: any = data;
      let sch = JSON.parse(d._body);
      sch.forEach(value => {
        if (value.day_of_show instanceof Array) {
          value.day_of_show.forEach(day => {
            var scheduleData: any = {};
            scheduleData.start_time = value.start_time;
            scheduleData.end_time = value.end_time;
            scheduleData.title = value.title.rendered;
            scheduleData.presenter_image = value.presenter_image.guid;
            scheduleData.presenters_name = value.presenters_name
            scheduleData.about_show = value.about_show
            scheduleData.songUrl = value.podcast_listen
            scheduleData.day = day
            if (this.schedules.hasOwnProperty(day)) {
              this.schedules[day].push(scheduleData)
            } else {
              var dataArray = []
              dataArray.push(scheduleData)
              this.schedules[day] = dataArray
              //this.schedules.push(scheduleData)
            }

          })
        }else{
          var scheduleData: any = {};
          scheduleData.start_time = value.start_time;
          scheduleData.end_time = value.end_time;
          scheduleData.title = value.title.rendered;
          scheduleData.presenter_image = value.presenter_image.guid;
          scheduleData.presenters_name = value.presenters_name
          scheduleData.about_show = value.about_show
          scheduleData.songUrl = value.podcast_listen
          scheduleData.day = value.day_of_show
          if (this.schedules.hasOwnProperty(value.day_of_show)) {
            this.schedules[value.day_of_show].push(scheduleData)
          } else {
            var dataArray = []
            dataArray.push(scheduleData)
            this.schedules[value.day_of_show] = dataArray
            //this.schedules.push(scheduleData)
          }
        }
      });
      Object.keys(this.schedules).map((key, index) => {
        let schedule = this.schedules[key];
        let sortedArray = schedule.sort((a, b) => {
          let start1 = +a.start_time.split(':')[0]; 
          let start2 = +b.start_time.split(':')[0]; 
          return start1 - start2;
        })
        this.schedules[key] = sortedArray;
      })
    })
  }

  openSlide(){
    let currentDate = new Date().getDate();
    for(let i in this.scheduleData){
      let date = this.scheduleData[i].date;
      date = date.toString();
      date = date.replace('th','');
      date = date.replace('nd','');
      date = date.replace('st','');
      date = date.replace('rd','');
      if(date == currentDate){
        console.log(date)
        console.log(i)
        this.showHideSlide(i);
        console.log(document.getElementById(i))
        let element = document.getElementById(i);
        let rect = element.getBoundingClientRect();
        console.log(rect.top, rect.right, rect.bottom, rect.left);
        this.content.scrollTo(0,rect.top)
      }
    }
  }
  ionViewDidEnter(){
   this.openSlide()
  }

  ionViewDidLoad() {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let week = this.getWeek(new Date());
    this.scheduleData = []
    for (let i = 0; i < week.length; i++) {
      let day = ''
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

      let dayLastNumber = week[i].getDate().toLocaleString().slice(-1);
      let currentDate = week[i].getDate().toLocaleString();
      console.log(dayLastNumber)
      if (dayLastNumber == "1"){
        if(currentDate=="11"){
          currentDate+='th'
        }else {
          currentDate +='st';
        }
      } else if (dayLastNumber == "2"){
        if(currentDate=="12"){
          currentDate+='th'
        }else {
          currentDate +='nd';
        }
      } else if (dayLastNumber == "3"){
        if(currentDate=="13"){
          currentDate+='th'
        }else {
          currentDate +='rd';
        }
      } else {
        currentDate +='th';
      }

      let obj = {day: day, date: currentDate, dayOfWeek: i, month: months[week[i].getMonth()], year: week[i].getFullYear() }
      this.scheduleData.push(obj)
    }
  }

  getWeek(fromDate) {
    let sunday = new Date(fromDate.setDate(fromDate.getDate() - fromDate.getDay()))
      , result = [new Date(sunday)];
    while (sunday.setDate(sunday.getDate() + 1) && sunday.getDay() !== 0) {
      result.push(new Date(sunday));
    }
    return result;
  }


  showHideSlide(id) {
    if (id == this.showSlider) {
      this.showSlider = -1
    } else {
      this.showSlider = id
    }
  }
}
