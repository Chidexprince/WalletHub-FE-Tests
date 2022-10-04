import { FormsModule } from '@angular/forms';
/**
 * Update the following components to meet the requirements : 
 * * Bind `field` of [textfield] component to its text input
 * * Pass value of `field` from [textfield] component to [title] property of component [ng-app]
 */
import { Component, EventEmitter, Input, NgModule, Output  } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';

@Component({
    selector : 'textfield',
    template : '<input type="text" [(ngModel)]="field" name="field" (input)="outputData()"/>'
})
export class TextField {
    field = "";
    @Output() fieldTxt = new EventEmitter<string>();

    outputData() {
        this.fieldTxt.emit(this.field);
    }
}

@Component({
    selector : 'child-component',
    template : `<h2>Title: {{title}}<h2><br/><textfield (fieldTxt)="handleFieldValue($event)"></textfield>`
})
export class ChildComponent {
    title = "";
    @Output() fieldValue = new EventEmitter<string>();

    handleFieldValue(value: string) {
        this.title = value;
        this.fieldValue.emit(value);
    }
}


@Component({
    selector : 'ng-app',
    template : `<div>
                    <child-component (fieldValue)="getTitle($event)"></child-component> <br/>
                    Title is {{title}}
                </div>`
})
export class Test02Component {

    title:string = "";

    getTitle(value: string) {
        this.title = value;
    }
}

@NgModule({
    imports : [
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            {
                path : "",
                component : Test02Component
            }
        ])
    ],
    declarations : [Test02Component,ChildComponent,TextField]
})
export class Test02Module {};