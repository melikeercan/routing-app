import {HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import { Subject} from 'rxjs';
import { map } from 'rxjs/operators';

import {Post} from './post';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private postUpdated = new Subject<Post[]>();
  private posts: Post[] = [];

  constructor(private http: HttpClient, private router: Router) { }

  getPosts = () => {
    this.http.get<{ message: string, data: { _id: string, title: string, content: string, imagePath: string }[]}>('http://localhost:3000/api/posts')
      .pipe(map((postData) => {
        return postData.data.map(post => {
          return {
            title: post.title,
            content: post.content,
            id: post._id,
            imagePath: post.imagePath
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

  addPost = (title: string, content: string, image: File) => {
    const postData = new FormData();
    postData.append('title', title);
    postData.append('content', content);
    postData.append('image', image, title);

    this.http.post<{message: string, post: Post}>('http://localhost:3000/api/posts', postData).subscribe((result) => {
      console.log(result.message);
      const post: Post = {id: result.post.id, title: result.post.title, content: result.post.content, imagePath: result.post.imagePath};
      this.posts.push(post);
      this.postUpdated.next([...this.posts]);
      this.router.navigate(['/']).then(r => console.log(r));
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

  updatePost = (id: string, title: string, content: string) => {
    console.log('updatePost');
    const newPost: Post = { id, title, content, imagePath: null };
    this.http.put('http://localhost:3000/api/posts/' + id, newPost).subscribe((result) => {
      console.log(result);
      const updatedPosts = [...this.posts];
      const index = updatedPosts.findIndex(p => p.id === newPost.id);
      updatedPosts[index] = newPost;
      this.posts = updatedPosts;
      this.postUpdated.next([...this.posts]);
      this.router.navigate(['/']).then(r => console.log(r));
    });
  }

  getPost = (postId: string) => {
    console.log('getPost');
    return this.http.get<{message: string, post: { _id: string, title: string, content: string }}>
    ('http://localhost:3000/api/posts/' + postId);
  }
}
