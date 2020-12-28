import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html'
})
export class ServerComponent implements OnInit{
  allowNewServer = false;
  serverCreationStatus = 'No server was created';
  serverName = '';
  username = '';
  serverCreated = false;
  users = ['User 1', 'User 2'];

  constructor() {
    setTimeout(() => {
      this.allowNewServer = true;
    }, 2000);
  }

  ngOnInit(): void {
  }

  onCreateServer = () => {
    this.serverCreated = true;
    this.serverCreationStatus = 'Server is created';
    this.allowNewServer = false;
  }

  onUpdateServer = (event: Event) => {
    this.serverName = (event.target as HTMLInputElement).value;
  }

  onUserNameChange = (event: Event) => {
    this.username = (event.target as HTMLInputElement).value;
  }

  getColor = () => {
    return this.username.length > 4 ? 'green' : 'yellow';
  }

  addUser = () => {
    this.users.push(this.username);
    this.username = '';
  }
}
