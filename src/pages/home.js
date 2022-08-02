import {html} from '../lib.js';

const main = document.querySelector('#main-content');
const homeTemplate = () => html `
    <section id="welcomePage">
        <div id="welcome-message">
            <h1>Welcome to</h1>
            <h1>My Music Application!</h1>
        </div>

        <div class="music-img">
            <img src="./images/musicIcons.webp">
        </div>
    </section>
`;

export const homeView = (context) => {
    context.render(homeTemplate())
}