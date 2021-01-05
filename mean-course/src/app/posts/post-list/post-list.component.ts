import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import {Subscription} from 'rxjs';
import {Post} from '../post';
import {PostsService} from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  isLoading = false;
  posts: Post[] = [];
  subscription: Subscription;
  totalPosts = 10;
  postsPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];

  constructor(public postsService: PostsService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
    this.subscription = this.postsService.getPostUpdateListener().subscribe( (postData: {posts: Post[], count: number}) => {
      this.posts = postData.posts;
      this.totalPosts = postData.count;
      this.isLoading = false;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onDelete(id: string): void {
    this.isLoading = true;
    this.postsService.deletePost(id).subscribe(() => {
      this.postsService.getPosts(this.postsPerPage, this.currentPage);
    });
  }

  onChangedPage(pageEvent: PageEvent): void {
    this.isLoading = true;
    this.currentPage = pageEvent.pageIndex + 1;
    this.postsPerPage = pageEvent.pageSize;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
  }
}
