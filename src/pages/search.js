import { html } from '../lib.js';
import {search} from "../service/albumService.js";
import {getUser} from "../service/authService.js";

const searchTemplate = (searchHandler,albums,userId) => html `
    <section id="searchPage">
        <h1>Search by Name</h1>

        <div class="search">
            <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
            <button class="button-list" @click=${searchHandler}>Search</button>
        </div>

        <h2>Results:</h2>

        <!--Show after click Search button-->
        <div class="search-result">
            <!--If have matches-->
            ${ albums.length > 0 
                        ? albums.map(a => albumTemplate(a,userId))
                        : html `<p class="no-result">No result.</p>`
            }
        </div>
    </section>
`;

const albumTemplate = (album,userId) => html`
    <div class="card-box">
        <img src=${album.imgUrl} alt="album image"/>
        <div>
            <div class="text-center">
                <p class="name">Name: ${album.name}</p>
                <p class="artist">Artist: ${album.artist}</p>
                <p class="genre">Genre: ${album.genre}</p>
                <p class="price">Price: $${album.price}</p>
                <p class="date">Release Date: ${album.releaseDate}</p>
            </div>
            ${
                album._ownerId === userId 
                        ? html`<div class="btn-group">
                            <a href="/album/${album._id}" id="details">Details</a>
                        </div>`
                        : ''
            }
            
        </div>
    </div>
`;

export const searchView = (context) => {
    const searchHandler = (e) => {
        e.preventDefault();
        const searchInput = document.getElementById('search-input');
        let userId;
        if (getUser() === undefined){
            userId = '0';
        }else {
            userId = getUser()._id;
        }
        if (searchInput.value === ''){
            alert('Empty Search Input!')
            return;
        }

        search(searchInput.value).then(albums => {
            context.render(searchTemplate(searchHandler,albums,userId))
        }).catch(err => {
            console.log(err.message)
        })
    }
    context.render(searchTemplate(searchHandler,[]));
}