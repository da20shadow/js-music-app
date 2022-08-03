import {html} from '../lib.js';
import {getAlbumById} from "../service/albumService.js";
import {getUser} from "../service/authService.js";

const albumTemplate = (album,isTheOwner) => html`
    <section id="detailsPage">
        <div class="wrapper">
            <div class="albumCover">
                <img src=${album.imgUrl} alt="Album image" />
            </div>
            <div class="albumInfo">
                <div class="albumText">

                    <h1>Name: ${album.name}</h1>
                    <h3>Artist: ${album.artist}</h3>
                    <h4>Genre: ${album.genre}</h4>
                    <h4>Price: $${album.price}</h4>
                    <h4>Date: ${album.releaseDate}</h4>
                    <p>Description: ${album.description}</p>
                </div>

                <!-- Only for registered user and creator of the album-->
                ${ isTheOwner 
                            ? html `<div class="actionBtn">
                                    <a href="/edit/${album._id}" class="edit">Edit</a>
                                    <a href="/delete/${album._id}" class="remove">Delete</a>
                                    </div>`
                            : ''
                }
                
            </div>
        </div>
    </section>
`;

export const albumView = (context) => {

    const id = context.params;

    getAlbumById(id.id).then(res =>{
        const userId = getUser()._id;
        const albumOwnerId = res._ownerId;
        const isTheOwner = userId === albumOwnerId;

        context.render(albumTemplate(res,isTheOwner))
    }).catch(err => {
        console.log(err)
    })
}