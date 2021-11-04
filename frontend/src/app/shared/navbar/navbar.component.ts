import { Component, OnInit } from '@angular/core';
import { onSideNavChange, animateText } from 'src/app/animations/animations';
import { SidenavService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [onSideNavChange, animateText]
})
export class NavbarComponent implements OnInit {

  public sideNavState: boolean = true;
  public linkText: boolean = true;

  constructor(private _sidenavService: SidenavService) { }

  ngOnInit(): void {
  }

  onSidenavToggle() {
    this.sideNavState = !this.sideNavState;

    setTimeout(() => {
      this.linkText = this.sideNavState;
    }, 200);
    this._sidenavService.sideNavState$.next(this.sideNavState);
  }

}
