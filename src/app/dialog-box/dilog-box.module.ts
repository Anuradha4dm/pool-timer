import { NgModule } from "@angular/core";
import { FormsModule, NgModel } from "@angular/forms";
import { DialogBoxComponent } from "./dialog-box.component";
import { BrowserModule } from "@angular/platform-browser";


@NgModule({
    declarations: [
        DialogBoxComponent
    ],
    imports:[
        BrowserModule,
        FormsModule
    ],
    exports:[DialogBoxComponent]
})
export class DialogBoxModule {}