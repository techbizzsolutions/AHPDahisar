import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, IonicApp, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage;
  @ViewChild(Nav) nav: Nav;
  showedAlert: boolean = false;
  confirmAlert: any;
  user: any;
  pages: Array<{
    title: string,
    component?: any,
    icon: any
  }>;
  constructor(public platform: Platform, statusBar: StatusBar, public alertCtrl: AlertController, private ionicApp: IonicApp, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      statusBar.backgroundColorByHexString("#ff9933");
      splashScreen.hide();
      this.pages = [
        {
          title: 'Home',
          component: HomePage,
          icon: 'ios-home'
        },
        {
          title: 'About Us',
          component: 'PartyDetailsPage',
          icon: 'ios-paper'
         },
          {
          title: 'Become Member',
          component: 'JoinNowPage',
          icon: 'md-add-circle'
         },
         {
          title: 'Contact Us',
          component: 'ContactusPage',
          icon: 'ios-contacts'
         }
      ];
      platform.registerBackButtonAction(() => {
        let activePortal = this.ionicApp._loadingPortal.getActive() || this.ionicApp._overlayPortal.getActive();
        if (activePortal) {
          activePortal.dismiss();
          activePortal.onDidDismiss(() => { });
          //return;
        }

        if (this.ionicApp._modalPortal.getActive()) {
          this.ionicApp._modalPortal.getActive().dismiss();
          this.ionicApp._modalPortal.getActive().onDidDismiss(() => { });
          return;
        }
        if (this.nav.length() == 1) {
          if (!this.showedAlert) {
            this.confirmExitApp();
          } else {
            this.showedAlert = false;
            this.confirmAlert.dismiss();
          }
        }
        if (this.nav.canGoBack()) {
          this.nav.pop();
        }

      });
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page we wouldn't want the back button
    // to show in this scenario
    switch (page.title) {
      case 'Home':
        this.nav.setRoot(page.component);
        break;
      case 'About Us':
        this.nav.push(page.component,{
          title:'अंतर्राष्ट्रीय हिन्दू परिषद्',
          shortdec:'दृष्टिकोण (Vision ) : हिन्दू ही आगे लक्ष्य ( Goal ) :हिन्दू समृद्धि , सुरक्षा और सम्मान ',
          longdesc:`<p>१. देश विदेश के हर जाती, भाषा, राज्य, पंथ, वर्ग, सामाजिक-आर्थिक स्थिति , व्यवसाय, लिंग के हर हिंदुओंकी सांस्कृतिक /धार्मिक/व्यक्तिगत / पारिवारिक / सामाजिक / आर्थिक / राजनितिक आकांक्षाओं और अधिकारों के लिए आवाज / मंच / समर्थन और बल देना |
          </p><p>२. छुआछूतमुक्त भारत और समरस , जातिभेद मुक्त समाज का उद्देश्य लेकर कार्य आगे बढ़ाना |
          </p><p>३. किसी भी समाज और देश के संवैधानिक और सामाजिक रचनाओं में कुछ प्रणालियाँ ( Systems ) पराम् महत्व रखती है | उन का व्यक्ति के समाज के धर्म और देश के संपूर्ण जीवन पर नियंत्रण / प्रभाव होता है | ये है : न्यायव्यवस्था , शिक्षा व्यवस्था , परिवार, सरकार और धर्म - आस्था - संस्कृति | इन सभी पांचो में " हिन्दू ही आगे " का लक्ष्य लेकर सभी तबकों के और अजीविकाओंके सभी हिन्दुओं की समृद्धि , सुरक्षा और सम्मान सुनिश्चित करना |</p>`,
          img:'assets/imgs/6.jpg'
        });
        break;  
      default:
        {
          this.nav.push(page.component);
        }
    }
  }

  // confirmation pop up to exit from app
  confirmExitApp() {
    this.showedAlert = true;
    this.confirmAlert = this
      .alertCtrl
      .create({
        subTitle: "Do you want to exit from the app?",
        buttons: [
          {
            text: 'NO',
            handler: () => {
              this.showedAlert = false;
              return;
            }
          }, {
            text: 'YES',
            handler: () => {
              this
                .platform
                .exitApp();
            }
          }
        ]
      });
    this
      .confirmAlert
      .present();
  }
}

