import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/Rx';
import {Http} from "@angular/http";
/*import {media} from "@ionic-native/media";*/
import {MusicControls} from "@ionic-native/music-controls";
/*
  Generated class for the ServicesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServicesProvider {
  url: any = '';
  page: any;
  topStories: any;
  relatedPosts: any;
  categoryPost: any;
  businessPost: any;

  constructor(public http: Http,public musicControls: MusicControls) {

    this.url = 'https://max1023.fm';

    console.log('Hello ServicesProvider Provider');

  }

  getCategoryPost(id: any, page: any) {

    return new Promise(resolve => {
      this.http.get(this.url + '/api/core/get_category_posts/?'+ 'id=' + id + '&page=' + page)
        .subscribe(data => {
          this.categoryPost = data;
          resolve(this.categoryPost);
        });
    });
  }

  getRecentPosts(page)
{
    return new Promise(resolve => {
      this.http.get(this.url + '/api/core/get_recent_posts/?' + 'page=' + page + '&count=20').map(res => res.json())
        .subscribe(data => {
          this.businessPost = data;
          resolve(this.businessPost);
        });
    });
  }

  getTopPosts(page) {
    return new Promise(resolve => {
      this.http.get(this.url + '/api/core/get_tag_posts/?' + 'page=' + page + '&slug=top-story&count=20').map(res => res.json())
        .subscribe(data => {
          this.topStories = data;
          resolve(this.topStories);
        });
    });
  }

  getRelatedPosts(id,page) {

    return new Promise(resolve => {
      this.http.get(this.url + '/api/core/get_category_posts/?'+ 'id=' + id + '&page=' + page).map(res => res.json())
        .subscribe(data => {
          this.relatedPosts = data;
          resolve(this.relatedPosts);
        });
    });
  }

  getCategory() {
    return new Promise(resolve => {
      this.http.get(this.url + '/api/core/get_category_index/').map(res => res.json()).subscribe(data => {
          resolve(data);
        });
    });
  }

  getFetured() {
    console.log("getFetured");
    return new Promise(resolve => {
      this.http.get(this.url + '/?json=get_tag_posts&tag_slug=featured').map(res => res.json()).subscribe(data => {
        resolve(data);
      });
    });
  }

  getPosts(slug) {
    console.log(slug)
    console.log("************************************************************************")
    return new Promise(resolve => {
      this.http.get(this.url + '/api/core/get_category_posts/?1=&slug='+slug).map(res => res.json()).subscribe(data => {
        resolve(data);
      });
    });
  }
  // With pagination
  getPaginationPosts(slug, page) {
    console.log(`/api/core/get_category_posts/?page=${page}=&slug=${slug}`)
    console.log("************************************************************************")
    return new Promise(resolve => {
      this.http.get(this.url + `/api/core/get_category_posts/?page=${page}=&slug=${slug}`).map(res => res.json()).subscribe(data => {
        resolve(data);
      });
    });
  }
 
  getSlider() {
    console.log("getSlider");
    return new Promise(resolve => {
      this.http.get(this.url + '/?json=get_tag_posts&tag_slug=photos').map(res => res.json()).subscribe(data => {
        resolve(data);
      });
    });
  }

  getPost(){
    return new Promise(resolve => {
      this.http.get(this.url + '/api/core/get_recent_posts/?page=1').map(res => res.json()).subscribe(data => {
        resolve(data);
      });
    });

  }

  getModelPost(postID) {
    return new Promise(resolve => {
      this.http.get(this.url + '/api/core/get_post/?id='+postID).map(res => res.json()).subscribe(data => {
        resolve(data);
      });
    });

  }

  getRegionData(){
    return new Promise(resolve => {
      this.http.get(this.url + '/wp-json/wp/v2/region').map(res => res.json()).subscribe(data => {
        resolve(data);
      });
    });
  }


}
