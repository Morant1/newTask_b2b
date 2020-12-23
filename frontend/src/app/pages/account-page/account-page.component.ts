import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from 'src/app/services/http-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss']
})
export class AccountPageComponent implements OnInit {
  banksNum = [[],[],[]]
  loggedInUser = null;
  banksInfo = {
    hold:'50%',
    banks: []
  };
  constructor(private httpService: HttpServiceService, private router: Router) { }

  ngOnInit(): void {
    this.httpService.getCurrUser().subscribe(loggedInUser => {
      this.loggedInUser = loggedInUser;
    })
  }

  addInput() : void {
    this.banksNum.push([]);
  }

  removeInput({ id, idx }) : void {
    const banksNum = this.banksNum;
    const banksInfo = this.banksInfo.banks;

    if (this.banksNum.length === 1) return;

    const bankIdx = banksInfo.findIndex(bank => bank.id === id)
    if (bankIdx !== -1) banksInfo.splice(bankIdx, 1)
    banksNum.splice(idx, 1)

    this.banksNum = banksNum;
    this.banksInfo.banks = banksInfo;

  }

  retrive(bankInfo) : void {
    const idx = this.banksInfo.banks.findIndex(bank => bank.id === bankInfo.id)
    if (idx === -1) this.banksInfo.banks.push(bankInfo);
    else this.banksInfo.banks.splice(idx, 1, bankInfo)
  }

  goBack(){
    this.router.navigateByUrl('/info');
  }

  async onUpdate() : Promise<void> {
    console.log("Banking data to update:",this.banksInfo)

    const user = {...this.loggedInUser};
    user.bankingInfo = this.banksInfo;
    
    const updatedUser = await this.httpService.updateUser(user);
    updatedUser.subscribe(user=>{
      console.log("updatedUser: ",user)
    })
  }

}
