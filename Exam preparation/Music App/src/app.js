import page from '../node_modules/page/page.mjs';
import { authMiddleWare } from './middlewares/authMiddleWare.js';
import { renderNavigationMiddleware, renderContentMiddleware } from './middlewares/render.js';
import { catalogView } from './views/catalog.js';
import { createView } from './views/create.js';
import { deleteView } from './views/delete.js';
import { detailsView } from './views/details.js';
import { editView } from './views/edit.js';
import { homeView } from './views/home.js';
import { loginView } from './views/login.js';
import { logoutView } from './views/logout.js';
import { registerView } from './views/register.js';
import { searchView } from './views/search.js';

page(authMiddleWare);
page(renderNavigationMiddleware);
page(renderContentMiddleware);

page('/', homeView);
page('/login', loginView)
page('/register', registerView);
page('/logout', logoutView);
page('/catalog', catalogView);
page('/create', createView);
page('/search', searchView)
page('/albums/:albumId', detailsView);
page('/albums/:albumId/edit', editView);
page('/albums/:albumId/delete', deleteView)

page.start();