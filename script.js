const myLibrary = [];


//add book proto
function Book(title, author, pages) {
  // the constructor...
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.info = function(){
        return(this.title+' by '+this.author+' is '+this.pages+'pages.')
    }
}

//updates library 
function addBookToLibrary() {
  const title = document.getElementById('enterTitle').value;
  const author = document.getElementById('enterAuthor').value;
  const pages = document.getElementById('enterPages').value;
  const read = document.getElementById('enterRead').value;//fix
  const newBook = new Book(title, author, pages);
  myLibrary.push(newBook)
  console.log(newBook.info())
  console.log(title, author, pages);
  updateLibrary();
}

//updates website to show library
function updateLibrary(){
    const bookLibrary = document.getElementById('bookLibrary')
    bookLibrary.innerHTML = '';

    myLibrary.forEach(book => {
        const bookDiv = document.createElement("div");
        bookDiv.classList.add('book');
        bookDiv.addEventListener('click', ()=> openBook(bookDiv));
       
        bookDiv.innerHTML = `
            <div class="bookCoverWrap">
                <img src="./imgs/dune.jpg" alt="Book Cover">
            </div>
            <div class="info">
                <div class="title">${book.title}</div>
                <div class="author">by ${book.author}</div>
                <div class="pages">${book.pages}</div>
            </div>
        `;
        bookLibrary.appendChild(bookDiv);
    });
       
}

//add unique class to all divs in clicked book
function openBook(bookDiv){
 console.log('fde');
 bookDiv.classList.add('clicked')
}