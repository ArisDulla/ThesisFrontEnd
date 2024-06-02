import { Component, OnInit } from '@angular/core';
import { CityzenService } from '../services/cityzen.service'
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../authentication/services/auth.service'

@Component({
  selector: 'app-view-list',
  templateUrl: './view-list.component.html',
  styleUrl: './view-list.component.css'
})
export class ViewListComponent implements OnInit {
  cityzensList: any[] = [];

  constructor(private auth: AuthService, private authService: CityzenService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.getAllCityzens();

    this.auth.$refreshTokenReceived.subscribe(() => {
      this.getAllCityzens();
    });

  }

  getAllCityzens() {
    this.authService.getCityzens().subscribe((res: any) => {

      this.cityzensList = res;
    },
      (error: any) => {

        // Error catch at interceptor

      });
  }

  async editCityzen(cityzenId: string): Promise<void> {
    await this.router.navigate(['/cityzen-edit'], { state: { cityzenId: cityzenId } });
  }

}
