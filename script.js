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
window.addEventListener("load", () => {
    updateLibrary();
  });
const enterInfo = document.querySelector('.enter')
const openModal = document.querySelector('.open-button')
//close add book model on outside click
enterInfo.addEventListener('click', closeAddBook)

openModal.addEventListener('click', () => {
    enterInfo.showModal();
})

let daft = 0;


//updates take book info sent it to prototype and then run library update
function addBookToLibrary() {

  //get all input info
  const title = document.getElementById('enterTitle').value;
  const author = document.getElementById('enterAuthor').value;
  const pages = document.getElementById('enterPages').value;
  const read = document.getElementById('enterRead').checked;
  
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook)
  updateLibrary();
}
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

    updateLibrary()
}
//close the add book function when clicked outside
function closeAddBook(event){
    if(event.target == enterInfo){
        enterInfo.close()
    }
}


//updates website to show library of books
function updateLibrary(){
    const bookLibrary = document.getElementById('bookLibrary')
    bookLibrary.innerHTML = '';
    
    myLibrary.forEach((book, i )=> {
        const bookDiv = createBookDiv(book, i);
        bookLibrary.appendChild(bookDiv)
    });
        
}

function createBookDiv(book, index){
    const bookDiv = document.createElement('div')
    bookDiv.classList.add('book')
    bookDiv.setAttribute('id', index)
    bookDiv.addEventListener('click', (event) => {
        handleBookClick(event , book, bookDiv)
    });
    const yesOrNo = book.read ? 'yes.svg' : 'no.svg';

    bookDiv.innerHTML = `
        <div class="bookCoverWrap">
            <img class='bookCover' id="cover" src="./imgs/${book.cover}" alt="Book Cover">
            <img class='bookCover' id="bk" src="./imgs/${book.cover}" alt="Book Cover">
        </div>
        <div class="info">
            <div class="title">${book.title}</div>
            <div class="authorPages">
                <div class="author">by ${book.author}</div>
                <div class="pages">${book.pages} pages</div>
            </div>
            <div class="description">${book.description}</div>
            <button type="button" class="delete" onclick="deleteBook(this)" data-index="${index}">Delete Book from Library</button>
        </div>
        <div class="read">
            <img class="readIcons" src="./imgs/${yesOrNo}" alt="book has/nt been read">
        </div>
    `;
    return bookDiv;
}

function handleBookClick(event, book, bookDiv) {
    //change read icons on click
    if (event.target.classList.contains('readIcons')) {
        readIcon(book, 'x');
    } else {
        openBook(bookDiv, book);
    }
}
            
function openBook(bookDiv, book){    
    const clonedBookDiv = bookDiv.cloneNode(true);
    clonedBookDiv.classList.add('clicked')
    const bookDes = document.createElement("dialog");
    bookLibrary.appendChild(bookDes);
    bookDes.appendChild(clonedBookDiv);
    bookDes.showModal()


    bookDes.addEventListener('click', (event) =>{
        console.log(event.target)

        if (event.target.classList.contains('readIcons')){
            console.log(book.read)
            readIcon(book, bookDiv)
        }
        if(event.target == bookDes){
        console.log(event.target)
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
    var x = book.getAttribute('data-index');
    const title = document.querySelector('.clicked .title').textContent
    console.log('deleted');
    console.log(title);

    const deleteConfirm = document.createElement('dialog')
    const deleteConfirmButton = document.createElement('button')
    const doNotDeleteButton = document.createElement('button')

    deleteConfirm.innerText = 'Are you sure you want to delete '+title + '?';
    deleteConfirmButton.innerText = 'Yes Remove From Library'
    doNotDeleteButton.innerText = 'No Keep in Library'

    deleteConfirm.classList.add('confirmDelete')
    document.body.appendChild(deleteConfirm)
    deleteConfirm.appendChild(deleteConfirmButton)
    deleteConfirm.appendChild(doNotDeleteButton)
    deleteConfirm.showModal()

    deleteConfirm.addEventListener('click', (event) =>{
        console.log(event.target)
        if(event.target == deleteConfirmButton){
           deleteConfirm.close()
           delete myLibrary[x];
           updateLibrary()
        }  
        else{

            deleteConfirm.close()
        }
        }
    
    )
   
}


function readIcon(book, bookDiv){
    book.read = !book.read
   
    Book(book)

    
}



