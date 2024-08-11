import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { RouterModule } from "@angular/router";
import { routes } from "./app.routes";
import { BrowserModule } from "@angular/platform-browser";
import { DialogBoxModule } from "./dialog-box/dilog-box.module";


@NgModule({
    declarations:[AppComponent],
    bootstrap:[AppComponent],
    imports:[
        RouterModule.forRoot(routes),
        BrowserModule,
        DialogBoxModule
    ]
})
export class AppModule{ }