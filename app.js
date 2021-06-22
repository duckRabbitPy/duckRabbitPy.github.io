
// Get node list of parent containers and image id's
const mushroomID = document.querySelectorAll(".mushroom-id");
const parents = document.querySelectorAll('.img-parent-elem')
const books = Array.from(document.querySelectorAll(".books")[0].children);
const review = document.getElementById('review');



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


//when book is hovered over, check id of child element and add visible class to show review
books.forEach(item => {item.addEventListener("click", event => {
    let bookID = event.target.id;

    if(bookID === "entangled"){
        review.innerHTML = "<blockquote> Entangled Life is a revelation. It is a radical, hopeful and important book and I couldn't put it down. With elegance, wit and clarity Sheldrake engages us in the hidden world of fungi, a miraculous web of connections, interactions and communication that changes the way we need to look at life, the planet and ourselves <i> - Isabella Tree, author of Wilding </i> <br><br> Fungi are everywhere, and Merlin Sheldrake is an ideal guide to their mysteries. He's passionate, deeply knowledgeable and a wonderful writer'- <i>Elizabeth Kolbert, author of The Sixth Extinction </i> </blockquote>"
    }
    else if(bookID === "underland"){
        review.innerHTML = "<blockquote> Every book by Macfarlane since his first has felt less like a new start than the natural extension of a growing landscape. With Underland, it expands downwards to take in barrows, caves, tunnels and catacombs. The experience is, as always, exhilarating and a little terrifying. - <i>The Daily Telegraph </i> There are some simply wonderful chapters here, combining natural and human history, a love of places and names… - <i> The Times </i> <br><br> Underland is an epic and occasionally portentous descent into a series of underground and underwater landscapes - <i>The Financial Times</i> <br><br> Macfarlane has invented a new kind of book, really a new genre entirely - <i>The Irish Times </i> <br><br> He is the great nature writer, and nature poet, of this generation - <i>The Wall Street Journal</i> </blockquote>"
    }
    else if(bookID === "fungarium"){
        review.innerHTML = "<blockquote> Fungarium is a fun-tastic frolic through the endless field of fungi! This amazingly detailed book will capture the imagination of budding fungi fans and may help to create the next generation of mushroom hunters! The text offers just enough in-depth precise information to be able to expand a young scientist’s mind, but the artwork is what really brings this book alive. The illustrations are fascinating, with some fungi looking like sea creatures while others look like eyeballs. This book is superbly brought together and belongs on every STEAM shelf. It must be included in art book sections too as the drawings are worthy of hanging in a museum and offer hours of exploration. This irresistible, oversized introduction to fungi is a beautiful coffee table book that children and adults will enjoy exploring. I cannot wait to share this with my mushroom loving friends! - <i>Amazon review</i></blockquote>"
    }
  else if(bookID === "alice"){
        review.innerHTML = "<blockquote>Alice's Adventures in Wonderland and Through the Looking Glass endure as some of history's most beloved children's storytelling, full of timeless philosophy for grown-ups and inspiration for computing pioneers. The illustrations that have accompanied Lewis Carroll's classics over the ages have become iconic in their own right, from Leonard Weisgard's stunning artwork for the first color edition of the book to Salvador Dali's little-known but breathtaking version. Now, from Penguin UK and Yayoi Kusama, Japan's most celebrated contemporary artist, comes a striking contender for the most visually captivating take on Alice's Adventures in Wonderland yet. - <i>The Atlantic</i></blockquote>"
    }

})})

//change header colour
const input = document.getElementById('customBackground');
const header = document.querySelector('header');
const title = document.querySelector('h1');

function handleUpdate() {
    title.style.backgroundColor = input.value;
    header.style.backgroundColor = input.value;

//sets colour of title
 if(backgroundDark(input.value)){
    title.style.color = "white"
    }else{
      title.style.color = "black"
    }
   
};


input.addEventListener('change', handleUpdate);

//determines if background is dark enough for light colour
function backgroundDark(hexVal){
 let r = parseInt(hexVal.substr(1,2),16);
 let g = parseInt(hexVal.substr(3,2),16);
 let b = parseInt(hexVal.substr(4,2),16);
 let brightness = ((r*299)+(g*587)+(b*114))/1000;
 return (brightness < 80) ? true : false;
}




