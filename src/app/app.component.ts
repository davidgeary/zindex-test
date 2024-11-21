import { Component, OnInit } from '@angular/core';
import { AlertController, IonApp, IonRouterOutlet, LoadingController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {
  constructor(private _loadingController: LoadingController,
              private _alertController: AlertController) {}

  async ngOnInit(): Promise<void> {
    const loading = await this._loadingController.create({
      message: 'Please wait...'
    });
    await loading.present();

    await this.showAlert();
    loading.dismiss();
  }

  async showAlert(): Promise<boolean> {
    /* Wrap in a promise so the page waits until a response has been given */
    return new Promise(async (resolve) => {
      const alert = await this._alertController.create({
        header: 'Proceed?',
        message: 'Are you sure you really want to do this!??!',
        buttons: [
          { text: 'OK',
            role: 'confirm',
            handler: () => {
              return resolve(true);
            }
          },
          { text: 'Cancel',
            role: 'cancel',
            handler: () => {
              return resolve(false);
            }
          }
        ],
      });

      await alert.present();
    });
  }

}
