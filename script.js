const myLibrary = [];
const modal = document.querySelector('.modal')
const openModal = document.querySelector('.open-button')

openModal.addEventListener('click', () => {
    modal.showModal();
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
    this.cover = randomImage

    this.info = function(){
        return(this.title+' by '+this.author+' is '+this.pages+'pages.')
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
        bookDiv.setAttribute('id', i )
        bookDiv.addEventListener('click', ()=> openBook(bookDiv));

       
        const yesOrNO = book.read ? 'yes.png' : 'no.jpg'
        console.log('below')
        console.log(book.read)
        console.log(book.title)
        console.log(book.author)
        


        bookDiv.innerHTML = `
            <div class="bookCoverWrap">
                <img src="./imgs/${book.cover}" alt="Book Cover">
            </div>
            <div class="info">
                <div class="title">${book.title}</div>
                <div class="author">by ${book.author}</div>
                <div class="pages">${book.pages}</div>
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