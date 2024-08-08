import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { DataService } from './data.service';
import { ExamplesModule } from './test-component/test-component.module';
import { appRoutes } from './app.routes';
import { NgSelectComponent, NgSelectModule } from '@ng-select/ng-select';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    ExamplesModule,
    NgSelectModule,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    NgbModule,
    RouterModule.forRoot(appRoutes, {
      useHash: true,
    }),
  ],
  providers: [
    DataService,
    provideNativeDateAdapter(),
    NgSelectComponent,
    // {provide: APP_BASE_HREF, useValue: '/ng-select/'}
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
