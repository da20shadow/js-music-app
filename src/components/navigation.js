import {html} from '../lib.js'

const guestNavigation = html `
    <li><a href="/login">Login</a></li>
    <li><a href="/register">Register</a></li>
`;

const userNavigation = html `
    <li><a href="/create">Create Album</a></li>
    <li><a href="#">Logout</a></li>
`;

export const navigationTemplate = (isLogged) => html `
        <nav>
            <img src="./images/headphones.png">
            <a href="/">Home</a>
            <ul>
                <!--All user-->
                <li><a href="/catalog">Catalog</a></li>
                <li><a href="/search">Search</a></li>
                ${ isLogged ? userNavigation : guestNavigation }
            </ul>
        </nav>
`;