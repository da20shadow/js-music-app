import {html} from '../lib.js';
import {logout} from "../service/authService.js";

export const logoutView = (context) => {
    logout().then(res => {
        context.page.redirect('/');
    })
}