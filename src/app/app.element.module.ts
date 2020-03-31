
import {RouterModule} from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';
import {TreeComponent} from './tree.component';

import {TransferHttpCacheModule} from '@nguniversal/common';
import { DxTreeListModule, DxCheckBoxModule } from 'devextreme-angular';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';

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
    DxCheckBoxModule,
    BrowserModule
  ],
  providers: [{provide: APP_BASE_HREF, useValue: '/'}],
  entryComponents: [TreeComponent],
//  bootstrap: [TreeComponent]
})

export class AppElementModule {
  constructor(private injector: Injector) {
    const myElement = createCustomElement(TreeComponent, { injector });
    customElements.define('app-tree', myElement);
  }
  ngDoBootstrap() {}
}