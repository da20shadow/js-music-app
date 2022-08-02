import {html} from '../lib.js'

const guestNavigation = html `
    <li><a href="#">Login</a></li>
    <li><a href="#">Register</a></li>
`;

const userNavigation = html `
    <li><a href="#">Create Album</a></li>
    <li><a href="#">Logout</a></li>
`;

const headerTemplate = (isLogged) => html `
    <header>
        <nav>
            <img src="./images/headphones.png">
            <a href="#">Home</a>
            <ul>
                <!--All user-->
                <li><a href="#">Catalog</a></li>
                <li><a href="#">Search</a></li>
                ${ isLogged 
                        ? userNavigation
                        : guestNavigation
                }
            </ul>
        </nav>
    </header>
`;