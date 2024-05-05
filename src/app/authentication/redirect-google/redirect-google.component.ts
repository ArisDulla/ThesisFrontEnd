import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-redirect-google',
  templateUrl: './redirect-google.component.html',
  styleUrls: ['./redirect-google.component.css']
})
export class RedirectGoogleComponent implements OnInit {
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(async params => {
      const code = params['code'];
      const state = params['state'];

      try {

        await this.authService.handleGoogleRedirect(code, state);

      } catch (error) { }
    });
  }
}