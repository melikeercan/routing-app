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
  private postUpdated = new Subject<{posts: Post[], count: number}>();
  private posts: Post[] = [];

  constructor(private http: HttpClient, private router: Router) { }

  getPosts = (pageSize, page) => {
    const queryParams = `?pageSize=${pageSize}&page=${page}`;
    this.http.get<{ message: string, posts: { _id: string, title: string, content: string, imagePath: string }[], count: number}>('http://localhost:3000/api/posts' + queryParams)
      .pipe(map((postData) => {
        return {
          posts: postData.posts.map(post => {
            return {
              title: post.title,
              content: post.content,
              id: post._id,
              imagePath: post.imagePath
            };
          }),
          count: postData.count
        };
      }))
      .subscribe(
      (result: {posts: Post[], count: number}) => {
        this.posts = result.posts;
        this.postUpdated.next({posts: [...result.posts], count: result.count});
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
      this.router.navigate(['/']).then(r => console.log(r));
    });
  }

  deletePost = (id: string) => {
    return this.http.delete<{message: string}>('http://localhost:3000/api/posts/' + id);
  }

  removePost = (index: number) => {
    this.posts.splice(index, 1);
  }

  updatePost = (id: string, title: string, content: string, image: string | File) => {
    let postData: Post | FormData;
    if (typeof(image) === 'object') {
      postData = new FormData();
      postData.append('id', id);
      postData.append('title', title);
      postData.append('content', content);
      postData.append('image', image);
    } else {
      postData = { id, title, content, imagePath: image };
    }
    this.http.put<{ message: string, post: { _id: string, title: string, content: string, imagePath: string }}>('http://localhost:3000/api/posts/' + id, postData).subscribe((result) => {
      this.router.navigate(['/']).then(r => console.log(r));
    });
  }

  getPost = (postId: string) => {
    return this.http.get<{message: string, post: { _id: string, title: string, content: string, imagePath: string }}>
    ('http://localhost:3000/api/posts/' + postId);
  }
}
