import {del} from "../service/albumService.js";

export const deleteView = (context) => {

    const albumId = context.params.id;
    const selected = confirm('Are You Sure?');

    if (selected){

        del(albumId).then(()=> {
            context.page.redirect('/catalog')
        }).catch(err => {
            alert(err.message)
        })
    }
}