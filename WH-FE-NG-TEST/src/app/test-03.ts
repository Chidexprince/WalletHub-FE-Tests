/**
 * Update the following components to meet the requirements : 
 * 
 * * Bind [email] property to input[name="email"]
 * * Bind [password] property to input[name="password"]
 * 
 * Without using angular forms, validate both fields so that :
 * * email is in correct format ( ex: ends with @a.com)
 * * password contains at least one special character, one upper case character, one lower case character, one number and a minium of 8 characters in length
 * * The fields should be validated when trying to submit the form
 * * Prevent the form from doing an actual form submit and instead, after validation pass, turn on the [logged_in] flag
 * 
 * You can add error messages below each field that shows if the field is not valid
 */
import { Component, ElementRef, NgModule, ViewChild  } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector : 'ng-app',
    template : `<form (submit)="loginUser($event)">
                    <h2>Login</h2>
                    <br/>
                    <input type="email" [value]="" name="email"  #email/>
                    <small *ngIf="emailErrorMsg" style="display: block; color: red;">{{emailErrorMsg}}</small>
                    <br/>
                    <input type="password" value="password.value" name="password" #password />
                    <small *ngIf="passwordErrorMsg" style="display: block; color: red;">{{passwordErrorMsg}}</small>
                    <button type="submit">Submit</button>
                    <br/><br/>
                    <div *ngIf="logged_in">Logged In!</div>
                </form>`
})
export class Test03Component {

    @ViewChild("email") email: ElementRef;
    @ViewChild("password") password: ElementRef;

    emailErrorMsg:string = "";
    passwordErrorMsg:string = "";

    emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

    logged_in = false;

    loginUser(event) {
        event.preventDefault();
        const email = this.email.nativeElement.value.trim();
        const password = this.password.nativeElement.value.trim();
        this.emailErrorMsg = ""
        this.passwordErrorMsg = "";
        this.logged_in = false;

        if(!email && !password) {
            this.emailErrorMsg = "Email is required.";
            this.passwordErrorMsg = "Password is required.";
            return;
        }
        
        if (!email) {
            this.emailErrorMsg = "Email is required."
            return;
        }
        if (!this.emailRegex.test(email)) {
            this.emailErrorMsg = "Invalid Email.";
            return;
        }

        if (!password) {
            this.passwordErrorMsg = "Password is required."
            return;
        }

        if (!this.passwordRegex.test(password)) {
            this.passwordErrorMsg = "Invalid Password: Password must contain at least one special character, one uppercase character, one lowercase character, one number and a minimum of 8 characters in length.";
            return;
        }
        this.logged_in = true;
    }
}

@NgModule({
    imports : [
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            {
                path : "",
                component : Test03Component
            }
        ])
    ],
    declarations : [Test03Component]
})
export class Test03Module {};