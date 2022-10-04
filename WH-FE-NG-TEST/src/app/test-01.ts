import { FormsModule } from '@angular/forms';
/**
 * In the following component, update the code so that when the value of the [loan-amount] is changed:
 * * If it's blank or 0, the values of [monthly_payment] and [late_payment] becomes "N/A",
 * * If it has a value, the value of [monthly_payment] becomes 2% of [loan-ammount] and the value of [late_payment] becomes 5% of [monthly_payment].
 * * Both [monthly_payment] and [late_payment] should print in the template in currency format : $1,234
 */

import { CommonModule } from '@angular/common';
import { Component, NgModule  } from '@angular/core';
import { RouterModule } from "@angular/router";

@Component({
    selector : 'ng-app',
    template : `<div>
                    <h2>Loan Details</h2>
                    <div>
                        <label for="amount">Enter loan amount: </label><br/>
                        <input type="number/" name="amount" id="amount" [(ngModel)]="loan_amount"
                            (keyup)="calculatePayment()"/>
                    </div>
                    <b>Monthly Payment:</b> {{monthly_payment !== -1 ? ((monthly_payment) | currency) : 'N/A' }} <br/>
                    <b>Late Payment Fee:</b>  {{late_payment !== -1 ? ((late_payment) | currency) : 'N/A'}}<br/>
                </div>`
})
export class Test01Component {

    loan_amount:number = 1000;
    monthly_payment:number = 200;
    late_payment = 10;

    calculatePayment() {
        if (this.loan_amount && this.loan_amount > 0) {
          this.monthly_payment = 0.02 * this.loan_amount;
          this.late_payment = 0.05 * this.monthly_payment;
        } else {
          this.monthly_payment = -1;
          this.late_payment = -1;
        }
    }
}

@NgModule({
    imports : [
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            {
                path : "",
                component : Test01Component
            }
        ])
    ],
    declarations : [Test01Component]
})
export class Test01Module {}