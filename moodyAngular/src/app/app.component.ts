import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import {TwitterService} from './service/twitter.service';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {WebcamImage} from 'ngx-webcam';
import { ToasterService } from 'angular5-toaster';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'app';


  constructor(private HttpClient:HttpClient,  private toaster: ToasterService
  ) {




   }



handle : String;
myDay : String;

Status: String;
twitterData: any;
dayData: any;

public isSubmitted = false;

Movies = {
  happy: ['Finding Nemo', 'Rocky', 'October Sky', 'Pay It Forward', 'Life of Pi'],
  sad: ['The Pursuit of Happyness', 'Forrest Gump', 'The Incredibles', 'Home Alone', 'Back to the Future'],
  neutral: ['Prisoners', 'Se7en', 'Memento', 'Get Out', 'Gone Girl']
}


Songs = {
  happy: "https://play.anghami.com/tag/75",
  sad: "https://play.anghami.com/tag/68",
  neutral: "https://play.anghami.com/tag/24"
}


Books = {
  happy: ['The Great Gatsby', 'To Kill a Mockingbird', 'On the Road'],
  sad: ['The Happiness Project', 'The Art of Happiness', 'Eat, Pray, Love'],
  neutral: ['Ender\'s Game', 'Frankenstein', 'Neuromancer']
}

  getUserStatus() {
    var twitter = this.twitterData.data;
    var day = this.dayData.data;
    var isPos = (twitter.Positive + day.Positive) / 2;
    var isNeg = (twitter.Negative + day.Negative) / 2;
    var isNut = (twitter.Neutral + day.Neutral) / 2;

    var max = Math.max(isPos, isNeg, isNut);

    var status = (max == isPos)? "Happy" : (max == isNeg)? "Sad" : "Neutral";

    // console.log(status);

    return status;
  }

  RecommendMovie() {
    // console.log(this.Movies.happy[Math.floor(Math.random() * Math.floor(5))]);
    // console.log(this.twitterData)
    // console.log(this.dayData)
    // console.log(this.getUserStatus())
    status = this.getUserStatus();

    var movie = (status == "Happy")? this.Movies.happy[Math.floor(Math.random() * Math.floor(5))] :
                (status == "Sad")? this.Movies.sad[Math.floor(Math.random() * Math.floor(5))]:
                this.Movies.neutral[Math.floor(Math.random() * Math.floor(5))];


  this.toaster.pop({
        type: 'success',
        title: "Success!",
        body: "I recommend this movie for you " + movie,
        timeout: 5000
      });


  }

  RecommendSong() {
    status = this.getUserStatus();

    var song = (status == "Happy")? this.Songs.happy :
                (status == "Sad")? this.Songs.sad:
                this.Songs.neutral;


    this.toaster.pop({
          type: 'success',
          title: "Success!",
          body: "I recommend this playlist for you " + song,
          timeout: 5000
        });
  }

  RecommendBook() {
    status = this.getUserStatus();

    var book = (status == "Happy")? this.Books.happy[Math.floor(Math.random() * Math.floor(3))] :
                (status == "Sad")? this.Books.sad[Math.floor(Math.random() * Math.floor(3))]:
                this.Books.neutral[Math.floor(Math.random() * Math.floor(3))];

  this.toaster.pop({
        type: 'success',
        title: "Success!",
        body: "I recommend this book for you " + book,
        timeout: 5000
      });
  }



   Submit()
  {


    if(!this.handle || !this.myDay )
    {
      this.toaster.pop({
            type: 'error',
            title: "Missing Data!",
            body: "You must fill all spaces!!",
            timeout: 5000
          });


    }
    else
    {


 console.log(this.handle);
 console.log(this.myDay);



 this.HttpClient.get('http://localhost:3000/api/tweet/' + this.handle).subscribe(data => {
   console.log(data);

   this.twitterData = data;





 });

 this.HttpClient.get('http://localhost:3000/api/text/' + this.myDay).subscribe(data => {
   console.log(data);

    this.dayData = data;


    });


 this.isSubmitted = true;


}

  }



   // toggle webcam on/off
     public showWebcam = true;

     // latest snapshot
     public webcamImage: WebcamImage = null;

     // webcam snapshot trigger
     private trigger: Subject<void> = new Subject<void>();

     public triggerSnapshot(): void {
       this.trigger.next();
     }


     public handleImage(webcamImage: WebcamImage): void {
       console.info('received webcam image', webcamImage);
  

       this.toaster.pop({
             type: 'success',
             title: "Success!",
             body: "Image captured Successfully!",
             timeout: 5000
           });
     }

     public get triggerObservable(): Observable<void> {
       return this.trigger.asObservable();
     }
   }
