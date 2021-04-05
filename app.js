
// Get node list of parent containers and image id's
const mushroomID = document.querySelectorAll(".mushroom-id");
const parents = document.querySelectorAll('.img-parent-elem')


//when parent is hovered over, check the id of the child element and add visible class to show caption
parents.forEach(item => {item.addEventListener("mouseover", event => {
    let imageID = event.target.id
    if(mushroomID[imageID]){
    mushroomID[imageID].classList.add("visible")
    }
})
})

//when parent is no longer being hovered over, remove visible class from all
parents.forEach(item => {item.addEventListener("mouseout", event => {
    mushroomID.forEach(item => item.classList.remove("visible"))
})
})




