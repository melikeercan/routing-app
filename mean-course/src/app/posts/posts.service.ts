import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject} from 'rxjs';
import {Post} from './post';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private postUpdated = new Subject<Post[]>();
  private posts: Post[] = [];

  constructor(private http: HttpClient) { }

  getPosts = () => {
    this.http.get('http://localhost:3000/api/posts').subscribe(
      (result: { message: string, data: Post[]}) => {
        console.log(result.message);
        this.posts = result.data;
        this.postUpdated.next([...this.posts]);
      }
    );
  }

  getPostUpdateListener = () => {
    return this.postUpdated.asObservable();
  }
  addPost = (title: string, content: string) => {
    const post: Post = {id: null, title, content};
    this.http.post<{message: string}>('http://localhost:3000/api/posts', post).subscribe((result) => {
      console.log(result.message);
      this.posts.push(post);
      this.postUpdated.next([...this.posts]);
    });
  }

  removePost = (index: number) => {
    this.posts.splice(index, 1);
  }

  updatePost = (index: number, newPost: Post) => {
    this.posts[index] = newPost;
  }
}
