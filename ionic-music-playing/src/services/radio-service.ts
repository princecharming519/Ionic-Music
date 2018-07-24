import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {MusicControls, MusicControlsOptions} from "@ionic-native/music-controls";
import {Platform} from "ionic-angular";
import {ApiService} from "./api-services";

/**
 * Created by ankittater on 26/03/18.
 */

declare var $;

@Injectable()
export class RadioService {

  private lastFMKey = 'ab68e9a71c1bb15efaa9c706b646dee4';
  private lastFM = 'http://ws.audioscrobbler.com/2.0/?method=track.search&format=json&limit=1&api_key=' + this.lastFMKey + '&track=';
  public url = "http://maxfm1023.thrilliant.com.ng:9193/"
  public itune = "https://itunes.apple.com/search?limit=10&media=music&entity=album&term=";
  public isLivePlaying: boolean = false
  public isPlaying: boolean = false
  public coverArtAnimation: boolean = false
  public schedulePlaying: boolean = false
  public interval:any;
  public coverArtInterval:any;
  public lowFiUrl = "http://maxfm1023.thrilliant.com.ng:9193/";
  radioOptions: any = {song: "", name: "", albumArt: '', region: 'Lagos', datasaver: false}
  currentPlaying: any = {song: "", name: "", schedule: "", albumArt: ''}
  file: any = new Audio(this.url + "stream")
  public showData: any = {startTime: '', endTime: '', title: ''};
  lastSong: string;
  playerCreated: boolean = false;




  constructor(public http: Http, private musicControls: MusicControls, private platform: Platform, public apiServices: ApiService) {
    this.getStreamInfo(this.url)
  }

  playLive() {
    this.file = new Audio(this.url + "stream")
    this.file.play()
    this.isPlaying = true
    this.isLivePlaying = true
    this.schedulePlaying = false
  }

  pauseLive() {
    this.file.pause()
    this.isPlaying = false
    this.isLivePlaying = false
    this.schedulePlaying = false
  }

  playSchedule(songUrl, startTime, endTime, title) {
    this.showData.startTime = startTime;
    this.showData.endTime = endTime;
    this.showData.title = title
    this.file.src = songUrl
    this.schedulePlaying = true
    this.playAudio(false)
  }

  applyCSS() {
    $('.max-video-upcomming-list').addClass("red");
    $('.max-equalizer').toggleClass("show");
    $('.max-play-btn').toggleClass("hide");
    $('img.playBtn').toggleClass("hide");
    let button = $('img.playStop');
    if (button.hasClass("show")) {
      $('img.playStop').toggleClass("show");
    } else {
      window.setTimeout(function () {
        $('img.playStop').toggleClass("show");
      }, 500);

    }
    setTimeout(function () {
      $('.max-video-upcomming-list.audio i').fadeOut(350);

      setTimeout(function () {
        $('.max-video-upcomming-list').removeClass("red");
        $('.max-video-upcomming-list i').show();
      }, 400);
    }, 500);
  }

  playAudio(value) {
    this.musicControls.updateIsPlaying(true);
    $('#logo-image').css('background-image',"url('')");
    this.applyCSS()
    this.file.play()
    this.isPlaying = true;
    this.coverArtAnimation = true;
    this.coverArtInterval = setInterval(() => {
      this.coverArtAnimation = !this.coverArtAnimation;
    }, 7000);
    /*if (!this.schedulePlaying) {
      this.isLivePlaying = true
    }*/
    if (value == true) {
      this.schedulePlaying = false;
      this.isLivePlaying = true
    } else {
      this.schedulePlaying = true;
      this.isLivePlaying = false
    }
  }

  pauseAudio() {
    if (this.playerCreated) {
      this.musicControls.updateIsPlaying(false);
    }
    this.applyCSS()
    this.file.pause()
    this.isPlaying = false
    if (!this.schedulePlaying) {
      this.isLivePlaying = false
    }
    this.coverArtAnimation = false;
    if(this.coverArtInterval != undefined){
      clearInterval(this.coverArtInterval);
      $('#logo-image').css('background-image',"url('assets/img/static-background.png')");
    }
  }

  parseStreamResponse(response) {
    let data: any = response
    var regex = data._body.match(/<body[^>]*>((.|[\n\r])*)<\/body>/im)[1];
    var parts = regex.split(',');
    if (parts.length == 7) {
      return parts[6];
    }
    return null;
  }

  getAlbumArt(songTitle){
    let newtitle = songTitle.split(' ').join('+'); 
    console.log("url is "+this.itune + newtitle);
    
    // This is call to itune first
    
    this.http.get(this.itune + newtitle).subscribe(data => {
      let d: any = data;
      let response: any = {}
      if (d._body) {
        response = JSON.parse(d._body)
      }
      console.log(response)
      // here we are checking the resultCount of the response whether it has any response or not if yes then it will enter in this block and
      //set the image for displaying
      if(response.resultCount > 0){
        // Itune response with data
        if(response.results[0].artworkUrl100 != undefined){

          let lastSlash = response.results[0].artworkUrl100.lastIndexOf('/');
          response.results[0].artworkUrl100 = response.results[0].artworkUrl100.substr(0, lastSlash);
          this.radioOptions.albumArt = response.results[0].artworkUrl100 + '/600x600bb.jpg';
          console.log(this.radioOptions.albumArt);
          var splitSong = songTitle.split('-')
          console.log(splitSong)
          if (splitSong.length > 1) {
            this.radioOptions.song = splitSong[1]
            this.radioOptions.name = splitSong[0]
          } else {
            this.radioOptions.song = songTitle
          }
        }else{
          this,this.getAlbumArtFromFM(songTitle);
        }
      }else{
        // If we got 0 response then we call Last FM 
        
        this.getAlbumArtFromFM(songTitle)
      }
    }, err => {
      console.log(err);
    })
  }

  getAlbumArtFromFM(songTitle) {
    console.log("song title is : "+songTitle);
    //here we call the LastFM Api to get the response
    this.http.get(this.lastFM + encodeURIComponent(songTitle)).subscribe(data => {
      let d: any = data;
      let response: any = {}
      if (d._body) {
        response = JSON.parse(d._body)
      }
      console.log("Last FM")
      console.log(response);
      if (response.error) {
        console.log(songTitle)
        console.log("album title called")
        var splitSong = songTitle.split('-')
        console.log(splitSong)
        if (splitSong.length > 1) {
          this.radioOptions.song = splitSong[1]
          this.radioOptions.name = splitSong[0]
        } else {
          this.radioOptions.name = songTitle
        }
      } else {
        if (response.results) {
          if (response.results.trackmatches != "\n") {
            if (response.results.trackmatches.track[0] && response.results.trackmatches.track[0].image !== undefined) {
              this.radioOptions.albumArt = response.results.trackmatches.track[0].image[3]['#text'];
              console.log(songTitle)
              console.log("album title called")
              var splitSong = songTitle.split('-')
              console.log(splitSong)
              if (splitSong.length > 1) {
                this.radioOptions.song = splitSong[1]
                this.radioOptions.name = splitSong[0]
              } else {
                this.radioOptions.song = songTitle
              }

            } else {
              console.log(songTitle)
              console.log("album title called")
              var splitSong = songTitle.split('-')
              console.log(splitSong)
              if (splitSong.length > 1) {
                this.radioOptions.song = splitSong[1]
                this.radioOptions.name = splitSong[0]
              } else {
                this.radioOptions.song = songTitle
              }
            }
          } else {
            console.log(songTitle)
            console.log("album title called")
            var splitSong = songTitle.split('-')
            console.log(splitSong)
            if (splitSong.length > 1) {
              this.radioOptions.song = splitSong[1]
              this.radioOptions.name = splitSong[0]
            } else {
              this.radioOptions.song = songTitle
            }
          }
        }
      }
      this.toggleMusicPlayer();
    });
  }

  getStreamInfo(url) {
    if(this.interval != undefined){
      clearInterval(this.interval);
    }
    this.getInfo(url);
    this.interval = setInterval(() => {
      this.getInfo(url)
    }, 20000);
  }


  getInfo(url) {
    var streamingUrl = url;
    var streamingDataUrl = streamingUrl + '7.html';
    this.http.get(streamingDataUrl).subscribe((data: any) => {
      console.log("Song info");
      console.log(data);
      var song = this.parseStreamResponse(data);
      if (song === '') {
      } else {
        if (this.lastSong != song) {
          console.log(song)
          console.log("does not matched")
          this.lastSong = song;
          this.getAlbumArt(song)
        }

      }
    }, err => {
    });
  }


  toggleMusicPlayer() {
    if (this.platform.is("cordova")) {
      if (!this.playerCreated) {
        this.musicControls.create(this.getMusicPlayerOption()).then(data => {
          this.playerCreated = true
        }, err => {
          this.playerCreated = false
        });
        this.setupMusicPlayer()
      } else {
        this.musicControls.destroy().then(data => {
          this.musicControls.create(this.getMusicPlayerOption()).then(data => {
            this.playerCreated = true
          }, err => {
            this.playerCreated = false
          });
        }, err => {

        })
      }
    }
  }


  getMusicPlayerOption(): MusicControlsOptions {
    let musicPlayerOption = <MusicControlsOptions>{};
    musicPlayerOption.track = this.radioOptions.name + " - " + this.radioOptions.song
    musicPlayerOption.artist = ""
    musicPlayerOption.cover = this.radioOptions.albumArt
    musicPlayerOption.isPlaying = this.isPlaying
    musicPlayerOption.dismissable = false
    musicPlayerOption.hasPrev = false
    musicPlayerOption.hasNext = false
    musicPlayerOption.hasClose = false
    musicPlayerOption.album = ""
    musicPlayerOption.hasSkipForward = false
    musicPlayerOption.hasSkipBackward = false
    musicPlayerOption.ticker = ""
    musicPlayerOption.playIcon = 'media_play'
    musicPlayerOption.pauseIcon = 'media_pause'
    musicPlayerOption.prevIcon = 'media_prev'
    musicPlayerOption.nextIcon = 'media_next'
    musicPlayerOption.closeIcon = 'media_close'
    musicPlayerOption.notificationIcon = 'notification'
   console.log("song change");
    return musicPlayerOption
  }


  setupMusicPlayer() {
    this.musicControls.subscribe().subscribe(action => {
      console.log(action)
      let a = JSON.parse(action);
      let message = a.message
      console.log(message)
      console.log(message)
      switch (message) {
        case 'music-controls-next':
          // Do something
          break;
        case 'music-controls-previous':
          // Do something
          break;
        case 'music-controls-pause':
          console.log("music pause button called")
          this.pauseAudio()

          // Do something
          break;
        case 'music-controls-play':
          console.log("music play button called")
          this.playAudio(true)
          // Do something
          break;
        case 'music-controls-destroy':
          // Do something
          break;

        // External controls (iOS only)
        case 'music-controls-toggle-play-pause' :
          // Do something
          break;
        case 'music-controls-seek-to':
          const seekToInSeconds = JSON.parse(action).position;
          this.musicControls.updateElapsed({
            elapsed: seekToInSeconds,
            isPlaying: true
          });
          // Do something
          break;
        case 'music-controls-skip-forward':
          // Do something
          break;
        case 'music-controls-skip-backward':
          // Do something
          break;

        // Headset events (Android only)
        // All media button events are listed below
        case 'music-controls-media-button' :
          // Do something
          break;
        case 'music-controls-headset-unplugged':
          // Do something
          break;
        case 'music-controls-headset-plugged':
          // Do something
          break;
        default:
          break;
      }
    })

    this.musicControls.listen(); // activates the observable above
  }
}
