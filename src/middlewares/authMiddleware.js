import {getUser} from "../service/authService.js";

export const isLogged = (context, next) => {
    context.isLogged = Boolean(getUser());
    next();
}