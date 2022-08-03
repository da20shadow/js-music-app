import {html} from '../lib.js';
import {getAll} from "../service/albumService.js";

const catalogTemplate = (albums,isLogged) => html `
    <section id="catalogPage">
        <h1>All Albums</h1>

            ${ albums.length > 0 
                    ? albums.map(a => html`
                        <div class="card-box">
                            <img src=${a.imgUrl} alt="image"/>
                            <div>
                                <div class="text-center">
                                    <p class="name">Name: ${a.name}</p>
                                    <p class="artist">Artist: ${a.artist}</p>
                                    <p class="genre">Genre: ${a.genre}</p>
                                    <p class="price">Price: $${a.price}</p>
                                    <p class="date">Release Date: ${a.releaseDate}</p>
                                </div>
                                ${
                                    isLogged 
                                            ? html `
                                                <div class="btn-group">
                                                    <a href="/album/${a._id}" id="details">Details</a>
                                                </div>`
                                            : ''
                                }
                                
                            </div>
                        </div>
                    `)
                    : html `<p>No Albums in Catalog!</p>`
        }
    </section>
`;

export const catalogView = (context) => {

    let albums;
    async function getAlbums(){
        await getAll().then(res => {
                console.log(res)
                albums = res;
            }).catch(err => {
                console.log(err)
            })
    }
    getAlbums().then(() =>{
        context.render(catalogTemplate(albums,context.isLogged));
    }).catch(err => {
        console.log(err)
    })
}