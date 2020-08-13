import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  examples: MenuItem[];
  activeExample: MenuItem;

  ngOnInit(): void {
    this.examples = [
      { label: 'Basic (Client Side)', icon: 'pi pi-fw pi-table', routerLink: '/basic-client-side' },
      { label: 'Basic (Server Side)', icon: 'pi pi-fw pi-table', routerLink: 'basic-server-side' },
      { label: 'Complete (Client Side)', icon: 'pi pi-fw pi-table', routerLink: 'complete-client-side' },
      { label: 'Complete (Server Side)', icon: 'pi pi-fw pi-table', routerLink: 'complete-server-side' },
    ];

    this.activeExample = this.examples[0];
  }

}
