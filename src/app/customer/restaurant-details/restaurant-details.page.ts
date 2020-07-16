import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BrandDetailsService } from 'src/app/services/brand-details.service';
import { DomSanitizer } from '@angular/platform-browser';
import { GlobalVar } from 'src/app/global';
import { IonContent } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.page.html',
  styleUrls: ['./restaurant-details.page.scss'],
})
export class RestaurantDetailsPage implements OnInit {

  brandId;
  brandName;
  brandMealsList: BehaviorSubject<Array<any>> = new BehaviorSubject(new Array());
  mealsLoading: BehaviorSubject<boolean> = new BehaviorSubject(true);
  categoryList: BehaviorSubject<Array<any>> = new BehaviorSubject(new Array());

  imageUrl;
  brandImage;
  brandStatus;
  mainMenueItems = [];
  selectedCatId;
  selectedCatName = '';
  @ViewChild('melHeader', { read: ElementRef }) header: ElementRef;
  @ViewChild('fixedTopChips', { read: ElementRef }) fixedChipsHolder: ElementRef;
  @ViewChild('floatingChips', { read: ElementRef }) floatingChipsHolder: ElementRef;
  @ViewChild(IonContent) ionContent: IonContent;
  imageUrlBase = GlobalVar.backend_image_url;
  visibleHeader = false;
  dom: HTMLElement;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private brandDetailsService: BrandDetailsService,
    private sanitizer: DomSanitizer,
    elementRef: ElementRef) {
    this.dom = elementRef.nativeElement;
  }
  showCartStrip = false;

  ngOnInit() {
    this
    this.brandName = '';
    this.showCartStrip = this.activatedRoute.snapshot.params.fromCatPage;
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('brandId')) {
        return;
      }
      this.brandId = paramMap.get('brandId');
      this.brandName = paramMap.get('brandName');
      if (!this.brandMealsList.value.length) {
        this.brandDetails();
      }
    })
  }

  brandDetails() {
    const access_token = localStorage.getItem('access_token');
    this.brandDetailsService.getBrandDetails(access_token, this.brandId).subscribe(response => {
      if (!response.isError) {
        console.log(response);

        this.brandImage = GlobalVar.backend_image_url;
        this.brandImage = this.brandImage + response.object.brandLogoPath;
        this.brandStatus = response.object.status;
        this.mainMenueItems = response.object.mainMenu;
      }
    });




    this.brandDetailsService.geCategories(access_token, this.brandId).subscribe(async response => {
      if (!response.isError) {
        const catList = response.items;
        const list = await Promise.all(response.items.map(async (item) => {
          let productsList = await this.brandDetailsService.getProductsForCategory(access_token, { brandId: item.mbcatBrandId, categoryId: item.mbcatId }).toPromise();

          return {
            catID: item.mbcatId,
            catName: item.mbcatName,
            items: productsList.items
          }
        }));
        this.mealsLoading.next(false);
        this.brandMealsList.next(list);
        this.categoryList.next(catList);

        if (this.categoryList.value.length > 0 && this.categoryList != undefined) {
          this.selectedCategory(this.categoryList.value[0]);
        }
      }
    });

  }

  selectedCategory(category: any) {
    this.selectedCatId = category.mbcatId;
    let event = document.getElementById(category.mbcatId);
    if (event != null) {
      let eventOffset = event.offsetTop;
      this.ionContent.scrollToPoint(0, eventOffset - 75, 700);
    }
  }

  scrollCategories() {
    const elements = this.dom.querySelectorAll('.meal-cat');
    let inViewElements = [];
    for (let i = 0; i < elements.length; i++) {
      if (this.isElementInViewport(elements[i])) {
        inViewElements.push(elements[i]);
      }
    }
    const lastElement: Element = inViewElements[0];
    if (lastElement != undefined) {
      let floatingChip: HTMLElement = document.querySelector('#chf' + lastElement.id);
      let fixedChip: HTMLElement = document.querySelector('#ch' + lastElement.id);
      this.selectedCatId = lastElement.id;
      if (floatingChip != null) {
        this.floatingChipsHolder.nativeElement.scrollTo({ left: floatingChip.offsetLeft - 25, top: 0, behavior: 'smooth' });
        this.fixedChipsHolder.nativeElement.scrollTo({ left: fixedChip.offsetLeft - 25, top: 0, behavior: 'smooth' });
      }
    }
  }

  isElementInViewport(el: Element) {
    var rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  isCatHeaderInViewPort() {
    var rect = this.header.nativeElement.getBoundingClientRect(), top = rect.top, height = rect.height,
      el = this.header.nativeElement.parentNode
    // Check if bottom of the element is off the page
    if (rect.bottom < 0) return false
    // Check its within the document viewport
    if (top > document.documentElement.clientHeight) return false
    do {
      rect = el.getBoundingClientRect()
      if (top <= rect.bottom === false) return false
      // Check if the element is out of view due to a container scrolling
      if ((top + height) <= rect.top) return false
      el = el.parentNode
    } while (el != document.body)
    return true
  }

  logScrolling(ev) {
    this.visibleHeader = !this.isCatHeaderInViewPort();
    this.scrollCategories();
  }

}
