import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams, LoadingController, ModalController, ViewController, Nav} from 'ionic-angular';
import {ApiService} from "../../services/api-services";
import {ServicesProvider} from "../../providers/services/services";
import {Http} from "@angular/http";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import $ from "jquery";

/**
 * Generated class for the NewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {
  @ViewChild(Nav) nav: Nav
  pet: any;
  topStories: any;
  id: any;
  page: number;
  slug:string;
  relatedPosts: any;
  categoryPost: any;
  businessPost: any;
  categoryTitle: any;

  constructor(public http: Http, public navCtrl: NavController, public navParams: NavParams, private apiService: ApiService, public loadingCtrl: LoadingController, public service: ServicesProvider, public modalCtrl: ModalController) {
    this.getCategoryTitle();
  }

  ionViewDidLoad() {

  }

  getBusinessPost(page, petTitle) {
    this.page=page
    this.slug=petTitle;
    this.pet = petTitle;
    console.log(this.pet);
    this.service.getPosts(petTitle)
      .then((results: any) => {
        this.businessPost = results.posts
        if (petTitle == "photos") {
          $('#scrollable').scrollLeft($('#segment_' + petTitle).position().left)
        }
      });
    console.log(this.businessPost);
  }

  doInfinite(infiniteScroll) {
    this.page = Number(this.page)+1;
    console.log(this.page);
    console.log(typeof this.page);
    return new Promise((resolve,reject) => {
      setTimeout(() => {
        this.service.getPaginationPosts(this.slug ,this.page)
          .then((results: any) => {
            this.businessPost = [...this.businessPost,...results.posts]
            console.log(results.posts)
            console.log(this.businessPost)
            resolve();
          }).catch(err=>{
            reject(err)
        });
      }, 500);
    })
  }

  getCategoryTitle() {
    this.service.getCategory().then((results: any) => {
      this.categoryTitle = results;
      if (results && results.categories) {
        if (this.navParams.get("items")) {
          this.getBusinessPost("1", "photos")
        } else {
          this.getBusinessPost("1", this.categoryTitle.categories[0].slug)
        }
      }
      console.log(results);
    });
  }

  openModelData(post) {
    let customModal = this.modalCtrl.create(ShowModelPage, {post: post});
    customModal.present();
  }

  /*  getMostPopNews(id,page){
      this.service.getRelatedPosts(1,1)
        .then((results) => {this.relatedPosts = results});
    }

    getCategoryNews(id,page){
      this.service.getCategoryPost(id,page)
        .then((results) => {
          let categoryData: any = results
          this.categoryPost = JSON.parse(categoryData._body)
        });
    }

    getTopStories(page){
      this.service.getTopPosts(page).then((results) => {
        let storiesData: any = results
        this.topStories = JSON.parse(storiesData._body)
        console.log(this.topStories);
        });
    }*/

}


@Component({
  selector: 'page-showModel',
  templateUrl: 'showModel.html',
})
export class ShowModelPage {
  modelData: any;
  post: any
  item:any

  constructor(public viewCtrl: ViewController, public navParams: NavParams, public http: Http, public modalCtrl: ModalController, private service: ServicesProvider) {
    console.log(this.navParams.get("post"))
    this.post = this.navParams.get("post")
    this.item = this.navParams.get("item")
    console.log(this.item)
    //this.getModelData(this.navParams.get("postID"));

  }

  ionViewDidLoad() {
    console.log(this.navParams.get("post"))
    this.post = this.navParams.get("post")
  }


  getModelData(postID) {
    /*    this.service.getModelPost(postID)
          .then((results: any) => {
            this.modelData = results.post
            console.log(this.modelData);
          });*/

  }

  public dismiss() {
    this.viewCtrl.dismiss();
  }
}
