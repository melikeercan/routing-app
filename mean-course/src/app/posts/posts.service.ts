import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject} from 'rxjs';
import { map } from 'rxjs/operators';

import {Post} from './post';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private postUpdated = new Subject<Post[]>();
  private posts: Post[] = [];

  constructor(private http: HttpClient) { }

  getPosts = () => {
    this.http.get<{ message: string, data: any[]}>('http://localhost:3000/api/posts')
      .pipe(map((postData) => {
        return postData.data.map(post => {
          return {
            title: post.title,
            content: post.content,
            id: post._id,
          };
        });
      }))
      .subscribe(
      (result: Post[]) => {
        console.log(result);
        this.posts = result;
        this.postUpdated.next([...this.posts]);
      }
    );
  }

  getPostUpdateListener = () => {
    return this.postUpdated.asObservable();
  }
  addPost = (title: string, content: string) => {
    const post: Post = {id: null, title, content};
    this.http.post<{message: string, postId: string}>('http://localhost:3000/api/posts', post).subscribe((result) => {
      console.log(result.message);
      post.id = result.postId;
      this.posts.push(post);
      this.postUpdated.next([...this.posts]);
    });
  }

  deletePost = (id: string) => {
    this.http.delete<{message: string}>('http://localhost:3000/api/posts/' + id).subscribe((result) => {
      console.log(result.message);
      const updatedPosts = this.posts.filter(post => post.id !== id);
      this.posts = updatedPosts;
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
