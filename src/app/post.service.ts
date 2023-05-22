import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core'

import {map} from 'rxjs/operators'
import {Observable, Subject} from 'rxjs'

import { Post } from './post.model';

@Injectable({providedIn: 'root'})
export class PostService{
  endPointUrl: string = 'https://dayfive-http-default-rtdb.asia-southeast1.firebasedatabase.app/'
  postUrl: string = this.endPointUrl+'post.json';


  constructor(private http: HttpClient){}

  onCreatePost(postData: {title:string, content:string}){
    console.log(postData);
    this.http.post<{name: string}>(this.postUrl,postData).subscribe(
      (data)=>{
        console.log(data);
      }
    )
  }

  onUpdatePost(postData:any){
    // console.log(postData);
    this.http.patch(this.postUrl,postData).subscribe(
      (data)=>{
        console.log(data);
        window.location.reload();
      }
    )

  }

  //fetching data
  fetchPosts(){
    return this.http.get<{[key:string]: Post}>(this.postUrl)
    .pipe(
      map((responseData:any)=>{
        const postArray:Post[] =[];
        for(const key in responseData){
          if(responseData.hasOwnProperty(key)){
            postArray.push({...responseData[key], id:key})
          }
        }
        return postArray;
      })
    )
  }


}
