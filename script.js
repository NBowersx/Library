const myLibrary = [
    {
        title: 'the help',
        author:'emma stone',
        pages:'204',
        read: 'y',
        description:'',
        cover: 'dune.jpg'
    }
    ,{
        title: 'Dune',
        author: 'Frank Herbert',
        pages: '412',
        read: '',
        description: 'A science fiction masterpiece depicting a desert planet and its inhabitants. It follows the story of Paul Atreides as he navigates political intrigue, betrayal, and the mystical powers of the spice melange, while contending with the fierce nomadic tribes of the desert and the oppressive rule of the Galactic Empire.',
        cover: 'dune.jpg'
    },
    {
        title: 'The Alchemist',
        author: 'Paulo Coelho',
        pages: '208',
        read: '',
        description: 'A philosophical novel about a journey to find one\'s destiny. It tells the story of Santiago, an Andalusian shepherd boy, who embarks on a quest to discover the secrets of the universe and fulfill his personal legend, encountering wise mentors, love, and spiritual enlightenment along the way.',
        cover: 'alc.jpg'
    },
    {
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        pages: '180',
        read: '',
        description: 'A tragic love story set in the roaring twenties. The novel explores themes of wealth, class, and the American Dream through the eyes of narrator Nick Carraway, who becomes entangled in the lives of the mysterious Jay Gatsby and his obsession with the enigmatic Daisy Buchanan, leading to a dramatic climax that exposes the emptiness of the Jazz Age.',
        cover: 'gatsby.jpg'
    },
    {
        title: '1984',
        author: 'George Orwell',
        pages: '328',
        read: '',
        description: 'A dystopian novel depicting a totalitarian regime and its impact on society. Set in a world of perpetual war and government surveillance, it follows the life of Winston Smith as he rebels against the oppressive Party and falls in love with fellow dissident Julia, leading to a harrowing journey of betrayal, torture, and ultimate disillusionment.',
        cover: '1984.jpeg'
    },
    {
        title: 'The Invisible Man',
        author: 'H.G. Wells',
        pages: '176',
        read: '',
        description: 'A science fiction novel exploring the consequences of invisibility. It follows the story of Griffin, a scientist who discovers the secret to invisibility but struggles to control its effects, leading to a descent into madness and violence, as he becomes increasingly isolated and hunted by those who fear his power.',
        cover: 'invis.jpg'
    },
    {
        title: 'Outlawed',
        author: 'Anna North',
        pages: '272',
        read: '',
        description: 'A feminist western novel set in an alternate history. It reimagines the American frontier as a place where women are witches and outlaws, and follows the journey of Ada, a young woman who joins a band of outcasts in search of freedom and justice, challenging societal norms and confronting the forces of prejudice and oppression.',
        cover: 'outlawed.jpg'
    },
    {
        title: 'Django',
        author: 'The Foot Guy',
        pages: '304',
        read: 'y',
        description: '',
        cover: 'alc.jpg'
    }
];
window.addEventListener("load", (event) => {
    updateLibrary();
    console.log("page is fully loaded");
  });
const modal = document.querySelector('.modal')
const openModal = document.querySelector('.open-button')

modal.addEventListener('click', closeAddBook)

openModal.addEventListener('click', (event) => {
    modal.showModal();
    console.log(event.target)
})

//add book proto
function Book(title, author, pages, read) {
    const images = ['dune.jpg', 'alc.jpg', 'gatsby.jpg', '1984.jpeg', 'invis.jpg', 'outlawed.jpg'];
    const randomImage = images[Math.floor(Math.random() * images.length)];
  // the constructor...
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.cover = randomImage;

    this.info = function(){
        return(this.title+' by '+this.author+' is '+this.pages+'pages.')
    }
}

function closeAddBook(event){
    if(event.target == modal){
        console.log('see ya add book function')
        modal.close()
        
    }
}

//updates library 
function addBookToLibrary() {

  //get all input info
  const title = document.getElementById('enterTitle').value;
  const author = document.getElementById('enterAuthor').value;
  const pages = document.getElementById('enterPages').value;
  const read = document.getElementById('enterRead').checked;
  console.log(read)
  
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook)
  updateLibrary();
}

//updates website to show library
function updateLibrary(){
    const bookLibrary = document.getElementById('bookLibrary')
    bookLibrary.innerHTML = '';

    myLibrary.forEach((book, i )=> {
        const bookDiv = document.createElement("div");
        bookDiv.classList.add('book');
        bookDiv.setAttribute('id', i)
        bookDiv.addEventListener('click', ()=> openBook(bookDiv));

       
        const yesOrNO = book.read ? 'yes.png' : 'no.jpg'
        console.log('below')
        console.log(book.read)
        console.log(book.title)
        console.log(book.author)
        console.log(book.description)
        


        bookDiv.innerHTML = `
            <div class="bookCoverWrap">
                <img src="./imgs/${book.cover}" alt="Book Cover">
            </div>
            <div class="info">
                <div class="title">${book.title}</div>
                <div class="authorPages">
                <div class="author">by ${book.author}</div>
                <div class="pages">${book.pages} pages</div>
                </div>
                <div class="description">${book.description}</div>
                <button type="button" class="delete" id="${i}" onclick="deleteBook(this)">Delete</button>
            </div>
            <div class="read">
                <img src="./imgs/${yesOrNO}" alt="book has been read">
            </div>
        `;
        bookLibrary.appendChild(bookDiv);
    });
       
}
//https://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg


//add unique class to all divs in clicked book make new div ssssss
//maybe look into making it a dialog
function openBook(bookDiv){
 console.log('clicked');
 const clonedBookDiv = bookDiv.cloneNode(true);
 clonedBookDiv.classList.add('clicked')

 const bookDes = document.createElement("dialog");
 bookLibrary.appendChild(bookDes);
 bookDes.appendChild(clonedBookDiv);
 bookDes.showModal()

 bookDes.addEventListener('click', (event) =>{
    console.log('helllooo')
    console.log(event.target)
    
    if(event.target == bookDes){
        console.log(event.target)
        console.log('yopoooooo')
        bookDes.close()
        
    }
 })

 

}

function closeBook(){
    var elements = document.querySelectorAll('.clicked');
    elements.forEach(function(element) {
        element.remove();
    });
}
//delete book from library
function deleteBook(book){
    var x = book.getAttribute('id');
    delete myLibrary[x];
    console.log(x);
    console.log('deleted');
    updateLibrary()


}