import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { InicioPage } from '../inicio/inicio';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = InicioPage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
