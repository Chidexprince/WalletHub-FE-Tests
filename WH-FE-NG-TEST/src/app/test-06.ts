/**
 * Fix the following component so that it meets the requirements:
 * * The [textarea] becomes a user inputed property.
 * * The content that user inputs will preserve its whitespaces and linebreaks when printed under the [review_content] property
 * * It should not allow rendering of html tags to prevent a security vulnerability (keep the inner text however)
 * * If the user enters a link in the content (ex : https://wallethub.com) it should become an anchor element when printed in the page 
 */
import { Component, NgModule  } from '@angular/core';
import { RouterModule} from "@angular/router";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector : 'ng-app',
    template : `
                <h2>User Review:</h2>
                <textarea class="textfield" placeholder="Write your Review" [(ngModel)]="review_input" (blur)="transformLinks()"></textarea>
                <br/><br/>
                <h3>Output:</h3>
                <pre class="output" [innerHTML]="review_content"></pre>
                `,
    styles : [
        `.textfield {
            width: 600px;
            height: 220px;
            padding: 10px;
            box-sizing: border-box;
        }`,
        `.output { 
            max-width: 100%;
            width: 600px;
            border: solid 1px #f9f6f6;
            padding: 5px;
            background: #ecebeb; 
        }`
    ]
})
export class ReviewComponent {
    review_input = ""; 

    review_content = "";

    ngOnInit() {
        
    }

    transformLinks() {
        const review = this.review_input;
        
        const urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
        const detectURL = review.match(urlRegex);
        
        this.review_content = review;
        if(detectURL) {
            detectURL.forEach(url => {
                this.review_content = this.review_content.replace(url, '<a href= "' + url + '" target="_blank" role="link" > ' + url.trim() + '</a>');
            }) 
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
                component : ReviewComponent
            }
        ])
    ],
    declarations : [ReviewComponent]
})
export class ReviewModule {}