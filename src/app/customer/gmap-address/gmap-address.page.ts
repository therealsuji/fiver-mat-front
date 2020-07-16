import { Component, OnInit, NgZone, ElementRef, ViewChild } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { GlobalVar } from 'src/app/global';
import { GmapsService } from 'src/app/services/gmaps.service';
declare var google: any;
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Router } from '@angular/router';

declare var $: any;


@Component({
  selector: 'app-gmap-address',
  templateUrl: './gmap-address.page.html',
  styleUrls: ['./gmap-address.page.scss'],
})
export class GmapAddressPage implements OnInit {

  GoogleAutocomplete: google.maps.places.AutocompleteService;
  autocomplete: { input: string; };
  autocompleteItems: any[];
  location: any;
  placeid: any;
  city;
  country;
  homeAddress = true;
  officeAddress = false;

  api_key = GlobalVar.google_js_api_key;
  map: any;
  currentLatitude: number
  currentLoginude: number
  description;
  currentUserDetails: any;
  savedLocationsList = [];
  address;

  @ViewChild('map', { read: ElementRef, static: false }) mapRef: ElementRef;
  @ViewChild('searchString', { read: ElementRef }) public searchString: ElementRef;

  locationSaveForm: FormGroup = new FormGroup({
    addressLine1: new FormControl(null),
    addressLine2: new FormControl(null),
    no: new FormControl(null),
    city: new FormControl(null),
    addressName: new FormControl(null)
  });

  savedLocationForm: FormGroup = new FormGroup({
    addressLine1: new FormControl(null),
    addressLine2: new FormControl(null)
  });

  constructor(public zone: NgZone, private router: Router, private alertController: AlertController, private modalController: ModalController, private gMapService: GmapsService, private geolocation: Geolocation) {
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];
  }

  ngOnInit() {
    //this.getUserDetails();
    this.getPeviousAddresses();


  }

  ionViewDidEnter() {
    this.showMap();
  }

  showMap() {
    const access_token = localStorage.getItem('access_token');


    this.geolocation.getCurrentPosition().then((resp) => {
      this.currentLatitude = resp.coords.latitude;
      this.currentLoginude = resp.coords.longitude;
      let location = new google.maps.LatLng(this.currentLatitude, this.currentLoginude);
      const options = {
        center: location,
        zoom: 15,
        disableDefaultUI: true
      }
      this.map = new google.maps.Map(this.mapRef.nativeElement, options);
      const pos = {
        lat: this.currentLatitude,
        lng: this.currentLoginude
      }
      this.map.setCenter(pos)

      let mapMarker = new google.maps.Marker({
        position: location,
        title: "Current Position",
        latitude: this.currentLatitude,
        longitude: this.currentLoginude
      });
      mapMarker.setMap(this.map);
      this.addInfoWindowToMarker(mapMarker);
      //console.log(resp.coords.longitude)
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  ngAfterViewInit() {
    this.getPlaceAutocomplete();
  }

  private getPlaceAutocomplete() {

    const autocomplete = new google.maps.places.Autocomplete(this.searchString.nativeElement,
      {
        componentRestrictions: { country: 'LK' } // 'establishment' / 'address' / 'geocode'
      });
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      const place = autocomplete.getPlace();
      this.zone.run(() => {
        const place: google.maps.places.PlaceResult = autocomplete.getPlace();


        let addressArr: any[] = place.formatted_address.split(',')
        if (addressArr.length == 2) {
          this.locationSaveForm.controls['addressLine1'].setValue(addressArr[addressArr.length - 2]);
          this.locationSaveForm.controls['addressLine2'].setValue(addressArr[addressArr.length - 1]);
        } else if (addressArr.length == 3) {
          this.locationSaveForm.controls['addressLine1'].setValue(addressArr[addressArr.length - 3]);
          this.locationSaveForm.controls['addressLine2'].setValue(addressArr[addressArr.length - 2] + ', ' + addressArr[addressArr.length - 1]);
        } else if (addressArr.length == 4) {
          this.locationSaveForm.controls['addressLine1'].setValue(addressArr[addressArr.length - 4]);
          this.locationSaveForm.controls['addressLine2'].setValue(addressArr[addressArr.length - 3] + ', ' + addressArr[addressArr.length - 2] + ', ' + addressArr[addressArr.length - 1]);
        }
        this.city = addressArr[addressArr.length - 2];
        this.country = addressArr[addressArr.length - 1];

        const location = place['geometry']['location'];
        this.currentLatitude = location.lat();
        this.currentLoginude = location.lng();

        const pos = {
          lat: this.currentLatitude,
          lng: this.currentLoginude
        }
        this.map.setCenter(pos)
        this.addMarkersToMap();
      })
    });
  }



  // updateSearchResults() {
  //   if (this.autocomplete.input == '') {
  //     this.autocompleteItems = [];
  //     return;
  //   }

  //   this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
  //     (predictions, status) => {
  //       this.autocompleteItems = [];
  //       this.zone.run(() => {
  //         predictions.forEach((prediction) => {
  //           this.autocompleteItems.push(prediction);
  //         });
  //       });
  //     });
  // }

  // selectSearchResult(item) {
  //   //console.log(item)
  //   this.location = item
  //   this.placeid = this.location.place_id
  //   this.signUPForm.controls['addressLine1'].setValue(item.structured_formatting.main_text);
  //   this.signUPForm.controls['addressLine2'].setValue(item.structured_formatting.secondary_text);
  //   this.autocomplete = { input: item.description };
  //   this.autocompleteItems.length = 0;
  //   this.description = item.description;
  //   const place: google.maps.places.PlaceResult = item
  //   console.log(place)

  //   //$('.searchbar-input').val(item.description);  
  //   this.searchedAddressData();
  //   //console.log($('.searchbar-input').text())
  // }

  // GoTo() {
  //   return window.location.href = 'https://www.google.com/maps/place/?q=place_id:' + this.placeid;
  // }

  // searchedAddressData() {

  //   const location = new google.maps.LatLng(6.921660, 79.852084);
  //   const options = {
  //     center: location,
  //     zoom: 15,
  //     disableDefaultUI: true
  //   }
  //   this.map = new google.maps.Map(this.mapRef.nativeElement, options);

  //   const searchInput = this.searchString.nativeElement;


  //   const autocomplete = new google.maps.places.Autocomplete(searchInput, {
  //     componentRestrictions: {
  //       country: 'LK',
  //     }
  //   });

  //   console.log(autocomplete)

  //   autocomplete.addListener('place_changed', () => {
  //     this.zone.run(() => {
  //       const place: google.maps.places.PlaceResult = autocomplete.getPlace();
  //       console.log(place)


  //       let addressArr: any[] = place.formatted_address.split(',')
  //       if (addressArr.length == 2) {
  //         this.signUPForm.controls['addressLine1'].setValue(addressArr[addressArr.length - 2]);
  //         this.signUPForm.controls['addressLine2'].setValue(addressArr[addressArr.length - 1]);
  //       } else if (addressArr.length == 3) {
  //         this.signUPForm.controls['addressLine1'].setValue(addressArr[addressArr.length - 3]);
  //         this.signUPForm.controls['addressLine2'].setValue(addressArr[addressArr.length - 2] + ', ' + addressArr[addressArr.length - 1]);
  //         console.log(addressArr[addressArr.length - 1])
  //       } else if (addressArr.length == 4) {
  //         this.signUPForm.controls['addressLine1'].setValue(addressArr[addressArr.length - 4]);
  //         this.signUPForm.controls['addressLine2'].setValue(addressArr[addressArr.length - 3] + ', ' + addressArr[addressArr.length - 2] + ', ' + addressArr[addressArr.length - 1]);
  //       }
  //       this.city = addressArr[addressArr.length - 2];
  //       this.country = addressArr[addressArr.length - 1];

  //       const location = place['geometry']['location'];
  //       this.currentLatitude = location.lat();
  //       this.currentLoginude = location.lng();

  //       const pos = {
  //         lat: this.currentLatitude,
  //         lng: this.currentLoginude
  //       }
  //       this.map.setCenter(pos)
  //       this.addMarkersToMap();
  //     })
  //   })
  // }

  addMarkersToMap() {

    let position = new google.maps.LatLng(this.currentLatitude, this.currentLoginude);
    let mapMarker = new google.maps.Marker({
      position: position,
      title: this.description,
      //latitude: this.currentLatitude,
      //longitude: this.currentLoginude,
      draggable: true,
      animation: google.maps.Animation.DROP
    });

    google.maps.event.addListener(mapMarker, 'dragend', () => {
      const pos = {
        lat: this.map.center.lat(),
        lng: this.map.center.lng()
      }

      this.currentLatitude = mapMarker.getPosition().lat();
      this.currentLoginude = mapMarker.getPosition().lng();

      this.gMapService.getLocationAddress(this.currentLatitude, this.currentLoginude).subscribe(res => {
        if (!res.isError) {
          console.log(res.results[0].formatted_address)
          this.autocomplete.input = res.results[0].formatted_address;

          let addressArr: any[] = res.results[0].formatted_address.split(',')
          if (addressArr.length == 2) {
            this.locationSaveForm.controls['addressLine1'].setValue(addressArr[addressArr.length - 2]);
            this.locationSaveForm.controls['addressLine2'].setValue(addressArr[addressArr.length - 1]);
          } else if (addressArr.length == 3) {
            this.locationSaveForm.controls['addressLine1'].setValue(addressArr[addressArr.length - 3]);
            this.locationSaveForm.controls['addressLine2'].setValue(addressArr[addressArr.length - 2] + ', ' + addressArr[addressArr.length - 1]);
          } else if (addressArr.length == 4) {
            this.locationSaveForm.controls['addressLine1'].setValue(addressArr[addressArr.length - 4]);
            this.locationSaveForm.controls['addressLine2'].setValue(addressArr[addressArr.length - 3] + ', ' + addressArr[addressArr.length - 2] + ', ' + addressArr[addressArr.length - 1]);
          }
        }
      })
      console.log(pos)
      this.map.setCenter(pos);
    });

    // google.maps.event.addListener(this.map, 'drag', function () {
    //   mapMarker.setPosition(this.getCenter());
    // });

    // google.maps.event.addListener(this.map, 'dragend', function () {
    //   mapMarker.setPosition(this.getCenter());
    // });


    mapMarker.setMap(this.map);
    this.addInfoWindowToMarker(mapMarker);
  }

  addInfoWindowToMarker(marker) {

    let infoWindowContent = '<div id="content">' +
      '<h2 id="firstHeading" class"firstHeading">' + marker.title + '</h2>' +
      '<p>Latitude: ' + marker.latitude + '</p>' +
      '<p>Longitude: ' + marker.longitude + '</p>' +
      '</div>';

    let infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent
    });

    marker.addListener('click', () => {
      infoWindow.open(this.map, marker);
    });
  }


  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  saveLocation() {
    const access_token = localStorage.getItem('access_token');

    let addressObj = {
      address1: this.locationSaveForm.value.addressLine1,
      address2: this.locationSaveForm.value.addressLine2,
      city: this.city,
      latitude: this.currentLatitude,
      longitude: this.currentLoginude,
      country: this.country,
      addressName: this.locationSaveForm.value.addressName
    }

    console.log(addressObj)

    this.gMapService.updateBillingAddress(access_token, addressObj).subscribe(res1 => {
      if (!res1.isError) {
        this.gMapService.saveShippingAddress(access_token, addressObj).subscribe(res2 => {
          if (!res2.isError) {
            this.dismiss();
          }
        })
        //this.dismiss();
      }
    })

    // const alert = await this.alertController.create({
    //   header: 'Are you sure',
    //   message: 'Do you need to save this location',
    //   buttons: [{
    //     text: 'Cancel',
    //     role: 'cancel'
    //   }, {
    //     text: 'Save',
    //     handler: () => {
    //       this.gMapService.saveBillingAddress(access_token, addressObj).subscribe(res => {
    //         if (!res.isError) {
    //           this.router.navigateByUrl('app/tabs/home');
    //         }
    //       })
    //     }
    //   }]
    // })
    // await alert.present
  }

  getUserDetails() {
    const access_token = localStorage.getItem('access_token');
    this.gMapService.getCurrentUserDetails(access_token).subscribe(res => {
      if (!res.isError) {
        this.currentUserDetails = res.object;
        this.locationSaveForm.controls['addressLine1'].setValue(this.currentUserDetails.mbcuAddress);
        this.locationSaveForm.controls['addressLine2'].setValue(this.currentUserDetails.mbcuAddresstwo);
      }
    })
  }

  getPeviousAddresses() {
    //     mbspCustomerId: 903
    // mbspDefault: null
    // mbspDeliveryTime: null
    // mbspDistance: null
    // mbspId: 965
    // mbspLocationLat: 7.0777359
    // mbspLocationLng: 80.8905632
    // mbspShippingAddress: "Walapane - Nildandahinna Rd"
    // mbspShippingAddresstwo: " Sri Lanka"
    // mbspShippingCity: null
    // mbspShippingCompany: "YOYO"
    // mbspShippingCountry: null
    // mbspShippingFname: "Prashantha"
    // mbspShippingLandphone: null
    // mbspShippingLname: "Thilakarathne"
    // mbspShippingPhone: "0713288156"
    // mbspShippingState: null
    // mbspTelCountryCode: null

    const access_token = localStorage.getItem('access_token');
    this.gMapService.getSavedAddresses(access_token).subscribe(res => {
      if (!res.isError) {
        console.log(res.items)
        this.savedLocationsList = res.items;
      }
    })

  }

  updateLocation(location: any, form: NgForm) {
    const access_token = localStorage.getItem('access_token');

    let addressObj = {
      address1: form.value.addressLine1,
      address2: form.value.addressLine2,
      city: location.mbspShippingCity,
      latitude: location.mbspLocationLat,
      longitude: location.mbspLocationLng,
      country: location.mbspShippingCountry,
      addressName: location.mbspShippingCompany
    }
    console.log(addressObj)
    this.gMapService.updateBillingAddress(access_token, addressObj).subscribe(res => {
      if (!res.isError) {
        this.getPeviousAddresses();
        this.dismiss();
      }
    })

  }

  removeAddress(location: any) {
    const access_token = localStorage.getItem('access_token');
    this.gMapService.removeAddress(access_token, location.mbspId).subscribe(res => {
      if (!res.isError) {
        this.getPeviousAddresses();
      }
    })
  }


}
