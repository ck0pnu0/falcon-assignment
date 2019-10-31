import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { SweetAlert2Module } from "@sweetalert2/ngx-sweetalert2";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FooterComponent } from "./footer/footer.component";
import { reducer } from "./home/game/store/app.reducer";
import { HomeModule } from "./home/home.module";

@NgModule({
  declarations: [AppComponent, FooterComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    StoreModule.forRoot({ game: reducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    }),
    SweetAlert2Module.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
