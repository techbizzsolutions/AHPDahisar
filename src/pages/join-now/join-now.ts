import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SocialSharing } from '@ionic-native/social-sharing';

@IonicPage()
@Component({
  selector: 'page-join-now',
  templateUrl: 'join-now.html',
})
export class JoinNowPage {
  private register : FormGroup;
  party:any;
  constructor(public navCtrl: NavController, private socialSharing: SocialSharing, public formBuilder: FormBuilder,public toastCtrl: ToastController, public navParams: NavParams) {
    this.register = this.formBuilder.group({
      Name:['', Validators.required],
      FatherORHusbandName:['', Validators.required],
      AdharNumber:['', Validators.required],
      LocalAddress:['', Validators.required],
      PermanentAddress:['', Validators.required],
      Occupation:['', Validators.required],
      Qualification:['', Validators.required],
      MemberofPoliticalParty:['', Validators.required],
      ReasontoJoinAHP:['', Validators.required],
      Email: ["", Validators.compose([
        Validators.required,
        Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
      ])],
      Mobile: ['',Validators.compose([Validators.required, Validators.pattern('^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$'), Validators.maxLength(15)])]
    });
  }

  close()
  {
    this.navCtrl.pop();
  }

  logForm()
  {
    if(!this.party)
    {
      let toast = this.toastCtrl.create({
        message: 'Please select Type of Sale',
        position: 'top',
        duration: 3000
      });
      toast.present();
      return;
    }
    this.register.value.Party = this.party;
    var rowdata = ["************"];
    var index = 0;

    for(var prop in this.register.value) {
      rowdata.push(index +'. ' + prop + ": " + this.register.value[prop]);
      index ++;
    }

    console.log(rowdata.join('\r\n'));
    // Check if sharing via email is supported
    this.socialSharing.canShareViaEmail().then(() => {
      // Sharing via email is possible
      // Share via email
      this.socialSharing.shareViaEmail(rowdata.join('\r\n'), 'Become Member', ['hrdrawat8@gmail.com']).then(() => {
        // Success!
      }).catch(() => {
        // Error!
      });
    }).catch(() => {
      // Sharing via email is not possible
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad JoinNowPage');
  }

}
