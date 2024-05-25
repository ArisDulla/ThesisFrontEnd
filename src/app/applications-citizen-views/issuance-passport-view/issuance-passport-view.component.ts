import { Component, OnInit } from '@angular/core';
import { PassportViewService } from '../services/passport-view.service'
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-issuance-passport-view',
  templateUrl: './issuance-passport-view.component.html',
  styleUrls: ['./issuance-passport-view.component.css']
})
export class IssuancePassportViewComponent implements OnInit {
  passportId: string | null = null;
  passportDetails: any;
  isLoading: boolean = true;
  errorMessage: string | null = null;
  application_type: string | null = null;

  constructor(private authService: PassportViewService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    const navigation = window.history.state;
    this.passportId = navigation.passportId;
    this.application_type = navigation.application_type;

    //
    // Retrive view of issuance passpor
    //
    if (this.passportId == null || this.passportId === undefined) {

      this.errorMessage = "Oops! Something went wrong.";

    } else {
      this.errorMessage = null;

      this.getIssuancePassport();
      this.authService.$refreshTokenReceived.subscribe(() => {
        this.getIssuancePassport();
      });

    }
  }

  downloadFile(docType: string, passportId: number, application_type: string): void {

    this.authService.getIssuancePassportFile(docType, passportId, application_type).subscribe(
      response => {

        this.downLoadFile22(response, "application/ms-excel");
      },
      error => {

        this.errorMessage = 'Oops! Something went wrong';

      }
    );
  }
  downLoadFile22(data: any, type: string) {

    let blob = new Blob([data], { type: type });
    let url = window.URL.createObjectURL(blob);
    let pwa = window.open(url);
    if (!pwa || pwa.closed || typeof pwa.closed == 'undefined') {
      alert('Please disable your Pop-up blocker and try again.');
    }
  }

  formatDate(dateString: string | null): string {
    return dateString ? this.datePipe.transform(dateString, 'medium') ?? '' : '';
  }

  getIssuancePassport() {
    this.authService.getIssuancePassportView(this.passportId, this.application_type).subscribe((res: any) => {

      this.passportDetails = res;

    },
      (error: any) => {
        // Error catch at interceptor
      });
  }
}
