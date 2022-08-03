import { render } from '../lib.js';
import { navigationTemplate } from "../components/navigation.js";

const header = document.getElementById('navigation');
const main = document.getElementById('main-content');

const renderTemplate = (template) => render(template,main);

export const renderNavigation = (context, next) => {
    render(navigationTemplate(context.isLogged),header);
    context.render = renderTemplate;
    next();
}