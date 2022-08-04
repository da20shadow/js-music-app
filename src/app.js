import page from '../node_modules/page/page.mjs';
import {renderNavigation} from "./middlewares/remderMiddleware.js";
import {homeView} from "./pages/home.js";
import {loginView} from "./pages/login.js";
import {logoutView} from "./pages/logoutView.js";
import {registerView} from "./pages/registration.js";
import {searchView} from "./pages/search.js";
import {catalogView} from "./pages/catalog.js";
import {detailsView} from "./pages/details.js";
import {isLogged} from "./middlewares/authMiddleware.js";
import {createView} from "./pages/create.js";
import {albumView} from "./pages/albumView.js";
import {editView} from "./pages/edit.js";
import {deleteView} from "./pages/delete.js";

page(isLogged);
page(renderNavigation);

page('/',homeView);
page('/login',loginView);
page('/logout',logoutView);
page('/register',registerView);
page('/catalog',catalogView);
page('/album/:id',albumView);
page('/search',searchView);
page('/details/:id',detailsView);
page('/create',createView);
page('/edit/:id',editView);
page('/delete/:id',deleteView);
// page('/account',accountView);

page.start()