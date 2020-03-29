import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';
import {TreeComponent} from './tree.component';
import {TransferHttpCacheModule} from '@nguniversal/common';
import { DxTreeListModule, DxCheckBoxModule } from 'devextreme-angular';

@NgModule({
  declarations: [
    TreeComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'my-app'}),
    RouterModule.forRoot([
      { path: '', component: TreeComponent, pathMatch: 'full'},
    ]),
    TransferHttpCacheModule,
    DxTreeListModule, 
    DxCheckBoxModule 
  ],
  providers: [{provide: APP_BASE_HREF, useValue: '/'}],
  bootstrap: [TreeComponent]
})
export class AppModule { }
