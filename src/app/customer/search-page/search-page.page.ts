import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs/index';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.page.html',
  styleUrls: ['./search-page.page.scss'],
})
export class SearchPagePage implements OnInit {

  products = [];
  searchString: string;
  resultsFor: string;
  access_token;
  constructor(private homeService: HomeService, private route: ActivatedRoute, private sanitizer: DomSanitizer,
  ) {
    this.access_token = localStorage.getItem('access_token');
    this.searchString = this.route.snapshot.params.search_string;
    if (this.searchString == 'nan') {
      this.searchString = '';
    }
  }

  ngOnInit() {
    this.search()
  }

  search() {
    if (this.searchString.trim().length && this.searchString != 'nan') {
      this.homeService.findProductByName(this.access_token, { productName: this.searchString }).subscribe((res) => {
        this.resultsFor = this.searchString;
        this.products = res
        console.log(res);

      });
    } else {
      this.products = [];
    }
  }

  transform(base64Image) {
    let imageBase64String = btoa(base64Image);
    let image = 'data:image/jpeg;base64,' + imageBase64String;
    return 'data:image/jpg;base64,' + (this.sanitizer.bypassSecurityTrustResourceUrl(imageBase64String) as any).changingThisBreaksApplicationSecurity;
  }

}
