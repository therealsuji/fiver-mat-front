import { Injectable } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoadingHelperService {

  constructor(private loadingController: LoadingController,private alertCtrl: AlertController) { }

  async presentLoading() {
    const loading = await this.loadingController.create({
      spinner: "crescent",
      message: "Please wait...",
      translucent: true,
      showBackdrop: true
    });
    await loading.present();
    return true;
  }

  // dismiss loader
  async dismissLoader() {
    setTimeout(async () => {
      await this.loadingController.getTop().then(loader => loader.dismiss());
    }, 500);
  }

  // before doing anything after dismissing the loader check if it has actually dismissed
  async onDidDismiss() {
    await this.loadingController.getTop().then(async loader => {
      await loader.onDidDismiss();
      return true;
    });
  }

  async presentAlert(header:string,message:string) {
    const alert = await this.alertCtrl.create({
      header: header,
      message: message,
      buttons: [{
        text: 'Ok',
        cssClass: 'main_btn',
      }]
    });
    await alert.present();
    await alert.onDidDismiss();
  }
}
