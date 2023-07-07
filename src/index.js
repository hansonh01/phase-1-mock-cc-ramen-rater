// write your code here
const baseAPIUrl = 'http://localhost:3000';
document.addEventListener('DOMContentLoaded',(e)=>{
    e.preventDefault();

    function fetchRamen(){
        const menu = document.getElementById('ramen-menu');
        menu.innerText = '';
        fetch(`${baseAPIUrl}/ramens`)
            .then(resp=>resp.json())
            .then(ramens=>{
                ramens.forEach((ramen,index)=>{
                    menu.appendChild(ramenMenu(ramen));
                    if(index === 0){
                        ramenCard(ramen);
                    };
                });
            });
    };

    function ramenMenu(ramen){
        const img = document.createElement('img');
        img.src = ramen.image;
        img.addEventListener('click',()=>ramenCard(ramen))
        return img;
    };

    function ramenCard(ramen){

        const img = document.querySelector('#ramen-detail .detail-image');
        img.src = ramen.image;
        img.alt = ramen.name;

        const name = document.querySelector('#ramen-detail .name');
        name.textContent = ramen.name;

        const restaurant = document.querySelector('#ramen-detail .restaurant');
        restaurant.textContent = ramen.restaurant;

        const rating = document.getElementById('rating-display');
        rating.textContent = ramen.rating;

        const comment = document.getElementById('comment-display');
        comment.textContent = ramen.comment;
    };
    
    function newRamenForm(){
        const newRamen = document.getElementById('new-ramen');
        newRamen.addEventListener('submit',(e)=>{
            e.preventDefault();

            const name = document.getElementById('new-name');
            const restaurant = document.getElementById('new-restaurant');
            const image = document.getElementById('new-image');
            const rating = document.getElementById('new-rating');
            const comment = document.getElementById('new-comment');

            fetch(`${baseAPIUrl}/ramens`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    name:name.value,
                    restaurant:restaurant.value,
                    image:image.value,
                    rating:rating.value,
                    comment:comment.value
                })
            })
                .then(resp=>resp.json())
                .then(ramen=>{
                    ramenMenu(ramen);
                    fetchRamen();
                })
        });
        newRamen.reset();
    };

    document.querySelector('#new-ramen input').addEventListener('click',()=>newRamenForm());

    function editRamenForms(ramenId){
        const editRamen = document.getElementById('edit-ramen');
        editRamen.addEventListener('submit',(e)=>{
            e.preventDefault();
            updateRamen(ramenId);
        })
    };
    function updateRamen(ramenId){
        const newRating = document.getElementById('new-ratings');
        const newComment = document.getElementById('new-comments');
        fetch(`${baseAPIUrl}/ramens/${ramenId}`,{
            method:'PATCH',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                rating:newRating.value,
                comment:newComment.value
            })
                .then(resp=>resp.json())
                .then((updatedRamen)=>{
                    const rating = document.getElementById('rating-display');
                    rating.textContent = updatedRamen.rating;
                    const comment = document.getElementById('comment-display');
                    comment.textContent = updatedRamen.comment;
                })
        });
    };
    fetchRamen();
});