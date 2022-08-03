import {html} from '../lib.js';
import {login} from "../service/authService.js";

const loginTemplate = (loginHandler) => html`
    <section id="loginPage">
        <form @submit=${loginHandler}>
            <fieldset>
                <legend>Login</legend>

                <label for="email" class="vhide">Email</label>
                <input id="email" class="email" name="email" type="text" placeholder="Email">

                <label for="password" class="vhide">Password</label>
                <input id="password" class="password" name="password" type="password" placeholder="Password">

                <button type="submit" class="login">Login</button>

                <p class="field">
                    <span>If you don't have profile click <a href="#">here</a></span>
                </p>
            </fieldset>
        </form>
    </section>
`;

export const loginView = (context) => {
    const loginHandler = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const {email, password} = Object.fromEntries(formData);
        login(email, password)
            .then(() => {
                context.page.redirect('/')
            })
    }
    context.render(loginTemplate(loginHandler));
}