import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="navigationbar-top">
      <a routerLink="home" routerLinkActive="active-link">Home</a>
      <a routerLink="customers" routerLinkActive="active-link">Customer Management</a>
      <a routerLink="dataprotection" routerLinkActive="active-link">Data Protection Declaration</a>
    </div>

    <router-outlet></router-outlet>

  `,
  styles: [`
    .navigationbar-top {
      background-color: darkblue;
      overflow: hidden;
    }

    .navigationbar-top a {
      float: left;
      color: white;
      text-align: center;
      padding: 14px 16px;
      text-decoration: none;
      font-size: 17px;
    }

    .navigationbar-top a:hover {
      background-color: lightskyblue;
      color: black;
    }

    .active-link {
      background-color: dodgerblue;
    }
  `]
})
export class AppComponent {
}
