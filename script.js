const myLibrary = [];


//add book proto
function Book(title, author, pages, read) {
  // the constructor...
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
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

        const images = ['dune.jpg', 'alc.jpg', 'gatsby.jpg', '1984.jpeg', 'invis.jpg', 'outlawed.jpg'];
        const randomImage = images[Math.floor(Math.random() * images.length)];
       
        const yesOrNO = book.read ? 'yes.png' : 'no.jpg'
        console.log('below')
        console.log(book.read)
        console.log(book.title)
        console.log(book.author)
        


        bookDiv.innerHTML = `
            <div class="bookCoverWrap">
                <img src="./imgs/${randomImage}" alt="Book Cover">
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

 document.body.appendChild(clonedBookDiv);
 event.stopPropagation();
 

}

function closeBook(){
    var elements = document.querySelectorAll('.clicked');
    elements.forEach(function(element) {
        element.remove();
    });
}
//delete book from library
function deleteBook(boo){
    var x = boo.getAttribute('id');
    delete myLibrary[x];
    console.log(x);
    console.log('deleted');
    console.log(myLibrary);
    updateLibrary()


}