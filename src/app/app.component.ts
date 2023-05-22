import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './post.model';
import { PostService } from './post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts:any = [];
  dataToBeUpdated: any = [];
  model:any=[];

  showLoading:boolean = false;

  constructor(private http: HttpClient, private postService: PostService) {}

  ngOnInit() {
    this.fetchPost();
  }



  onCreatePost(postData: {title:string, content:string}){
    // console.log(postData);
    this.postService.onCreatePost(postData);
  }

  onUpdatePost(postData:any){
    console.log(postData);
    this.model[this.dataToBeUpdated.id].title= postData.title;
    this.model[this.dataToBeUpdated.id].content= postData.content;
    console.log(this.model)

    this.postService.onUpdatePost(this.model);
  }

  //initiate array data yang mau diupdate, untuk dimunculkan di html
  updateData(p:any){
    this.dataToBeUpdated = p;

    var obj ={
      [this.dataToBeUpdated.id]: {
        title : this.dataToBeUpdated.title,
        content: this.dataToBeUpdated.content
      }
    }
    this.model = obj;
    console.log(obj);
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPost();
  }

  private fetchPost(){
    this.showLoading = true;
    this.postService.fetchPosts()
    .subscribe(
      (posts:any) =>{
        setTimeout(() => {
          this.showLoading = false
        }, 2000);
        this.loadedPosts = posts;
      }
    )
  }

  onClearPosts() {
    // Send Http request
  }
}
