const myLibrary = [];

function Book(title, author, pages) {
  // the constructor...
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.info = function(){
        return(this.title+' by '+this.author+' is '+this.pages+'pages.')
    }
}

function addBookToLibrary() {
  // do stuff here
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

function updateLibrary(){
    const bookLibrary = document.getElementById('bookLibrary')
    bookLibrary.innerHTML = '';

    myLibrary.forEach(book => {
        const bookDiv = document.createElement("div");
        bookDiv.classList.add('book');
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