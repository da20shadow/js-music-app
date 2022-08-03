import {html} from '../lib.js';
import {edit, getAlbumById} from "../service/albumService.js";
import {getUser} from "../service/authService.js";

const editTemplate = (editHandler, isTheOwner, album) => html`
    <section class="editPage">
        ${isTheOwner ? html`
                    <form @submit=${editHandler}>
                        <fieldset>
                            <legend>Edit Album</legend>

                            <div class="container">
                                <label for="name" class="vhide">Album name</label>
                                <input id="name" name="name" class="name" type="text" value=${album.name}>

                                <label for="imgUrl" class="vhide">Image Url</label>
                                <input id="imgUrl" name="imgUrl" class="imgUrl" type="text"
                                       value=${album.imgUrl}>

                                <label for="price" class="vhide">Price</label>
                                <input id="price" name="price" class="price" type="text" value=${album.price}>

                                <label for="releaseDate" class="vhide">Release date</label>
                                <input id="releaseDate" name="releaseDate" class="releaseDate" type="text"
                                       value=${album.releaseDate}>

                                <label for="artist" class="vhide">Artist</label>
                                <input id="artist" name="artist" class="artist" type="text" value=${album.artist}>

                                <label for="genre" class="vhide">Genre</label>
                                <input id="genre" name="genre" class="genre" type="text"
                                       value=${album.genre}>

                                <label for="description" class="vhide">Description</label>
                                <textarea name="description" class="description" rows="10"
                                          cols="10">${album.description}</textarea>

                                <button class="edit-album" type="submit">Edit Album</button>
                            </div>
                        </fieldset>
                    </form>`
                : ''
        }

    </section>
`;

export const editView = (context) => {

    const id = context.params.id;

    const editHandler = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const albumData = Object.fromEntries(formData);

        if (invalidFields(albumData)){
            alert('All fields are required!');
            return;
        }

        edit(albumData,id).then(res => {
            context.page.redirect(`/album/${id}`)
        }).catch(err => {
            console.log(err)
            alert(err.message)
        })
    }

    getAlbumById(id).then(album => {
        const userId = getUser()._id;
        const albumOwnerId = album._ownerId;
        const isTheOwner = userId === albumOwnerId;

        context.render(editTemplate(editHandler, isTheOwner, album));

    }).catch(err => {
        console.log(err)
    })

}
const invalidFields = (albumData) => {
    const requiredFields = ['name','imgUrl','price','releaseDate','artist','genre','description'];
    return requiredFields.some(x => !albumData[x]);
}