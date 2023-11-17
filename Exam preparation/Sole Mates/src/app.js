import page from '../node_modules/page/page.mjs';
import {html, render}  from '../node_modules/lit-html/lit-html.js';
import {AuthService} from './services/AuthService.js';
import {SessionService} from './services/SessionService.js';
import {NavComponent} from './components/nav/nav.js'
import { navTemplate } from './components/nav/navTemplate.js';
import { homeTemplate } from './components/home/homeTemplate.js';
import { HomeComponent } from './components/home/home.js';
import {LoginComponent} from './components/login/login.js'
import {loginTemplate} from './components/login/loginTemplate.js';
import { BaseCrudApiService } from './services/BaseCrudApiService.js';
import { dashBoardTemplate } from './components/dashboards/dashboardTemplate.js';
import { DashboardComponent } from './components/dashboards/dashboard.js';

const main = document.querySelector('#wrapper main');
const nav = document.querySelector('#wrapper header'); 

let router = {
    navigare: page.show,
    redirect: page.redirect
};

const baseUrl = 'http://localhost:3030';

let renderBody = (template) => render(template, main);
let renderNav = (template) => render(template, nav); 

let sessionService = new SessionService();
let authService = new AuthService(baseUrl, sessionService);
let shoesService = new BaseCrudApiService(baseUrl, '/data/shoes', sessionService);

let navComponent = new NavComponent(authService, renderNav, navTemplate, router);
let homeComponent = new HomeComponent(renderBody, homeTemplate);
let loginComponent = new LoginComponent(authService, renderBody, loginTemplate, router);
let dashboardComponent = new DashboardComponent(shoesService, renderBody, dashBoardTemplate)

page('/index.html', '/');
page( navComponent.showView);
page('/', homeComponent.showView);
page('/login', loginComponent.showView);
page('/dashboard', dashboardComponent.showView);
page.start();