import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { BehaviorSubject } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { UserAuth } from "src/app/services/user-auth.service";
import { LoadingHelperService } from "src/app/services/loading-helper.service";
import { UserDetailsService } from "src/app/services/user-details.service";
import { NavController } from "@ionic/angular";
import { DomSanitizer } from "@angular/platform-browser";
import { ConstantsService } from "src/app/services/constants.service";
import { Camera, CameraResultType } from "@capacitor/core";
import { take } from "rxjs/operators";
import * as moment from "moment";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"],
})
export class ProfilePage implements OnInit {
  user_id;
  loadingForm;
  fromSignUp;

  basicDetails: FormGroup;
  familyDetails: FormGroup;
  churchDetails: FormGroup;
  personalDetails: FormGroup;
  physicalDetails: FormGroup;
  shouldLoad: BehaviorSubject<Boolean> = new BehaviorSubject<Boolean>(null);

  annulIncome;
  martialStatus;
  bloodGroup;
  bodyType;
  denomination;
  occupation;
  partnerExpectation;
  language;
  height;
  diet;
  complexion;
  highestEducation;
  countries;
  cities;
  states;
  ministry;

  cityDisabled = true;
  stateDisabled = true;
  photoFormData = new FormData();

  profilePicture;
  pic1Picture;
  pic2Picture;
  pic3Picture;
  baseImageUrl;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userAuth: UserAuth,
    private formBuilder: FormBuilder,
    private loadingService: LoadingHelperService,
    private userDetails: UserDetailsService,
    private navCtrl: NavController,
    private sanitizer: DomSanitizer,
    private constant: ConstantsService
  ) {
    this.baseImageUrl = this.constant.baseImageUrl;
    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.fromSignUp = this.router.getCurrentNavigation().extras.state.signup.signup;
        if (this.fromSignUp) {
          this.shouldLoad.next(true);
        }
      }
    });
  }

  setFormValue(form, controlName, value) {
    form.controls[`${controlName}`].setValue(value);
  }

  async takePicture(paramName) {
    const image = await Camera.getPhoto({
      quality: 20,
      resultType: CameraResultType.DataUrl,
    });
    if (paramName == "profile_pic") {
      this.profilePicture = image.dataUrl;
    }
    let base64 = image.dataUrl.split(",")[1];
    let blob = this.b64toBlob(base64, "image/" + image.format, 512);
    this.uploadImages(paramName, blob);
  }

  b64toBlob(b64Data, contentType = "", sliceSize = 512): Blob {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  uploadImages(paramName, image) {
    this.photoFormData.set(paramName, image);
  }
  async loadDropdownValues() {
    await this.loadingService.presentLoading();
    try {
      this.martialStatus = await this.userDetails.getMartialStatus().pipe(take(1)).toPromise();
      this.annulIncome = await this.userDetails.getAnnualIncome().pipe(take(1)).toPromise();
      this.bloodGroup = await this.userDetails.getBloodGroup().pipe(take(1)).toPromise();
      this.bodyType = await this.userDetails.getBodyType().pipe(take(1)).toPromise();
      this.denomination = await this.userDetails.getDenomination().pipe(take(1)).toPromise();
      this.occupation = await this.userDetails.getOccupation().pipe(take(1)).toPromise();
      this.partnerExpectation = await this.userDetails.getPartnerExpectation().pipe(take(1)).toPromise();
      this.language = await this.userDetails.getLanguage().pipe(take(1)).toPromise();
      this.height = await this.userDetails.getHeight().pipe(take(1)).toPromise();
      this.diet = await this.userDetails.getDiet().pipe(take(1)).toPromise();
      this.complexion = await this.userDetails.getComplexion().pipe(take(1)).toPromise();
      this.highestEducation = await this.userDetails.getHighestEducation().pipe(take(1)).toPromise();
      this.countries = await this.userDetails.getCountries().pipe(take(1)).toPromise();
      this.ministry = await this.userDetails.getMinistry().pipe(take(1)).toPromise();
      await this.loadingService.dismissLoader();
    } catch (e) {
      await this.loadingService.dismissLoader();
    }
  }
  loadPhotos(id) {
    this.userDetails.getUserPhotos(id).subscribe(async (res) => {
      this.profilePicture = this.constant.baseImageUrl + res.profile_pic;
      this.pic1Picture = this.constant.baseImageUrl + res.image1;
      this.pic2Picture = this.constant.baseImageUrl + res.image2;
      this.pic3Picture = this.constant.baseImageUrl + res.image3;
    });
  }

  loadUserDetails(id) {
    this.userDetails.getBasicDetails(id).subscribe(async (res) => {
      this.setFormValue(this.basicDetails, "name", res.name);
      this.setFormValue(this.basicDetails, "surname", res.surname);
      this.setFormValue(this.basicDetails, "dob", res.dob);
      this.setFormValue(this.basicDetails, "gender", res.gender);
      this.setFormValue(this.basicDetails, "martial_status", res.martial_status);
      this.setFormValue(this.basicDetails, "mobile_no", res.mobile_no);
      if (res.state != "") {
        this.basicDetails.get("state").enable();
        this.states = await this.userDetails.getSates(res.country).pipe(take(1)).toPromise();
      }
      if (res.city != "") {
        this.basicDetails.get("city").enable();
        this.cities = await this.userDetails.getCities(res.city).pipe(take(1)).toPromise();
      }
      this.setFormValue(this.basicDetails, "country", res.country);
      this.setFormValue(this.basicDetails, "state", res.state);
      this.setFormValue(this.basicDetails, "city", res.city);
      this.setFormValue(this.basicDetails, "postal_code", res.postal_code);
      this.loadingForm = false;
      //change form status here so that it fire the onchange calls on city and country controls
    });

    this.userDetails.getFamilyDetails(id).subscribe((res) => {
      this.setFormValue(this.familyDetails, "fathers_name", res.fathers_name);
      this.setFormValue(this.familyDetails, "mothers_name", res.mothers_name);
      this.setFormValue(this.familyDetails, "no_brothers", res.no_brothers);
      this.setFormValue(this.familyDetails, "no_sisters", res.no_sisters);
      this.setFormValue(this.familyDetails, "parent_contact", res.parent_contact);
    });

    this.userDetails.getChurchDetails(id).subscribe((res) => {
      this.setFormValue(this.churchDetails, "name_church_priest", res.name_church_priest);
      this.setFormValue(this.churchDetails, "church_contact_no", res.church_contact_no);
      this.setFormValue(this.churchDetails, "denomination", res.denomination);
      this.setFormValue(this.churchDetails, "name_church", res.name_church);
      this.setFormValue(this.churchDetails, "church_add", res.church_add);
      this.setFormValue(this.churchDetails, "year_baptism", res.year_baptism);
      this.setFormValue(this.churchDetails, "ministry", res.ministry);
    });

    this.userDetails.getPersonalDetails(id).subscribe((res) => {
      this.setFormValue(this.personalDetails, "highest_edu", res.highest_edu);
      this.setFormValue(this.personalDetails, "partner_expectation", res.partner_expectation);
      this.setFormValue(this.personalDetails, "specialization", res.specialization);
      this.setFormValue(this.personalDetails, "occupation", res.occupation);
      this.setFormValue(this.personalDetails, "designation", res.designation);
      this.setFormValue(this.personalDetails, "annual_income", res.annual_income);
      this.setFormValue(this.personalDetails, "language", res.language);
      this.setFormValue(this.personalDetails, "mother_tongue", res.mother_tongue);
      this.setFormValue(this.personalDetails, "drink", res.drink);
      this.setFormValue(this.personalDetails, "smoke", res.smoke);
      this.setFormValue(this.personalDetails, "diet", res.diet);
    });

    this.userDetails.getPhysicalDetails(id).subscribe((res) => {
      this.setFormValue(this.physicalDetails, "height", res.height);
      this.setFormValue(this.physicalDetails, "weight", res.weight);
      this.setFormValue(this.physicalDetails, "complexion", res.complexion);
      this.setFormValue(this.physicalDetails, "blood_group", res.blood_group);
      this.setFormValue(this.physicalDetails, "body_type", res.body_type);
      this.setFormValue(this.physicalDetails, "disability", res.disability);
    });
  }

  ngOnInit() {
    this.basicDetails = this.formBuilder.group({
      user_id: [this.user_id],
      name: [""],
      surname: [""],
      dob: [""],
      gender: [""],
      martial_status: [""],
      mobile_no: [""],
      country: [""],
      state: [{ value: "", disabled: this.stateDisabled }],
      city: [{ value: "", disabled: this.stateDisabled }],
      postal_code: [""],
    });

    this.familyDetails = this.formBuilder.group({
      user_id: [this.user_id],
      fathers_name: [""],
      mothers_name: [""],
      no_brothers: [""],
      no_sisters: [""],
      parent_contact: [""],
    });

    this.churchDetails = this.formBuilder.group({
      user_id: [this.user_id],
      name_church_priest: [""],
      church_contact_no: [""],
      denomination: [""],
      name_church: [""],
      church_add: [""],
      year_baptism: [""],
      ministry: [""],
    });
    this.personalDetails = this.formBuilder.group({
      user_id: [this.user_id],
      highest_edu: [""],
      partner_expectation: [""],
      specialization: [""],
      occupation: [""],
      designation: [""],
      annual_income: [""],
      mother_tongue: [""],
      language: [""],
      drink: [""],
      smoke: [""],
      diet: [""],
    });
    this.physicalDetails = this.formBuilder.group({
      user_id: [this.user_id],
      height: [""],
      weight: [""],
      complexion: [""],
      name_church: [""],
      blood_group: [""],
      body_type: [""],
      disability: [""],
    });
    this.initializeData();
  }

  async initializeData() {
    this.user_id = await this.userAuth.getUserId();
    this.photoFormData.append("userId", this.user_id);
    this.shouldLoad.subscribe(async (fromSignUp) => {
      this.loadingForm = true;
      await this.loadDropdownValues();
      this.loadUserDetails(this.user_id);
      this.loadPhotos(this.user_id);
    });
  }



  async countryChanged(event) {
    if (this.loadingForm) {
      return;
    }
    await this.loadingService.presentLoading();

    this.cities = [];
    this.states = [];
    try {
      this.states = await this.userDetails.getSates(event.target.value).pipe(take(1)).toPromise();
      this.basicDetails.get("state").enable();
      this.basicDetails.get("city").disable();
      await this.loadingService.dismissLoader();
    } catch (error) {
      await this.loadingService.dismissLoader();
      this.loadingService.presentAlert("Attention", "Something went wrong");
    }
  }
  
  async stateChanged(event) {
    if (this.loadingForm) {
      return;
    }
    await this.loadingService.presentLoading();
    try {
      this.cities = [];
      this.cities = await this.userDetails.getCities(event.target.value).pipe(take(1)).toPromise();
      this.basicDetails.get("state").enable();
      this.basicDetails.get("city").enable();
      await this.loadingService.dismissLoader();
    } catch (error) {
      await this.loadingService.dismissLoader();
      this.loadingService.presentAlert("Attention", "Something went wrong");
    }
  }

  async saveAll(){
    try{
      await this.loadingService.presentLoading();
      if (this.basicDetails.get("dob").value != "") {
        this.setFormValue(this.basicDetails, "dob", moment(this.basicDetails.get("dob").value).format("YYYY-MM-DD"));
      }
      await this.userDetails.saveUserPhotos(this.photoFormData).toPromise();
      await this.userDetails.saveBasicDetails(this.basicDetails.getRawValue()).toPromise();
      await this.userDetails.saveFamilyDetails(this.familyDetails.getRawValue()).toPromise();
      await this.userDetails.saveChurchDetails(this.churchDetails.getRawValue()).toPromise();
      await this.userDetails.savePersonalDetails(this.personalDetails.getRawValue()).toPromise();
      await this.userDetails.savePhysicalDetails(this.physicalDetails.getRawValue()).toPromise();
      await this.loadingService.dismissLoader();
      this.loadingService.presentAlert("Attention", "Successfully updated profile");
    }catch(e){
      await this.loadingService.dismissLoader();
      this.loadingService.presentAlert("Attention", "Something went wrong");
    }
    
  }
}
