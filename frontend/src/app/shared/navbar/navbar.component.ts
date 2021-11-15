import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { onSideNavChange, animateText } from 'src/app/animations/animations';
import { SidenavService } from 'src/app/services/navbar.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [onSideNavChange, animateText]
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private _sidenavService: SidenavService, private observer: BreakpointObserver) { }

  public sideNavState: boolean = true;
  public linkText: boolean = true;

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  ngOnInit(): void {
  }

  logout(): void{
    this.authService.logout().subscribe(
      () => {
        this.router.navigate(['/']);
      }
    );

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches && this.sideNavState == true) {
        this.onSidenavToggle();
      }
      else if (!res.matches && this.sideNavState == false) {
        this.onSidenavToggle();
      }
    });
  }

  onSidenavToggle() {
    this.sideNavState = !this.sideNavState;

    setTimeout(() => {
      this.linkText = this.sideNavState;
    }, 200);
    this._sidenavService.sideNavState$.next(this.sideNavState);
  }
}
