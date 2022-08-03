import {html} from '../lib.js';
import {register} from "../service/authService.js";

const registrationTemplate = (regHandler) => html `
    <section id="registerPage">
        <form @submit=${regHandler}>
            <fieldset>
                <legend>Register</legend>

                <label for="email" class="vhide">Email</label>
                <input id="email" class="email" name="email" type="text" placeholder="Email">

                <label for="password" class="vhide">Password</label>
                <input id="password" class="password" name="password" type="password" placeholder="Password">

                <label for="conf-pass" class="vhide">Confirm Password:</label>
                <input id="conf-pass" class="conf-pass" name="conf-pass" type="password" placeholder="Confirm Password">

                <button type="submit" class="register">Register</button>

                <p class="field">
                    <span>If you already have profile click <a href="#">here</a></span>
                </p>
            </fieldset>
        </form>
    </section>
`;

export const registerView = (context) => {
    const regHandler = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const {email,password} = Object.fromEntries(formData);

        if (password !== document.getElementById('conf-pass').value){
            return;
        }
        if (email === '' || password === ''){
            alert('All fields are required!');
            return;
        }

        register(email,password,context)
    }
    context.render(registrationTemplate(regHandler));
}