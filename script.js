
const subBtn = document.getElementById('submit');
const myForm = document.getElementById('my_form');
const addBtn = document.getElementById('add_btn');
const cancelBtn = document.getElementById('cancel');
const libraryContainer = document.getElementById('show_library');
const bookTitle = document.getElementById('title');
const bookAuthor = document.getElementById('author');
const bookPages = document.getElementById('pages');
const bookRead = document.getElementById('read');

//initialise library
let myLibrary = [];

//Book constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = Date.now();
}

//shows the form when you click on the add button and clear the input fields when you click Cancel
function showHideForm() {
    if (addBtn) {
        myForm.style.display = 'block';
     };

    if (addBtn) {
        addBtn.style.display = 'none';
    };
};

cancelBtn.addEventListener('click', (e) => {
    addBtn.style.display = 'block';
    myForm.style.display = 'none';
    myForm.reset();
});

//Hide the form when your click submit
myForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //when the submit button is clicked, addBtn value changes from Cancel to Add Book
    if (subBtn) {

        addBtn.style.display = 'block';
        
        //The form becomes invisible
        myForm.style.display = 'none';
    };

    //argument for addBookToLibrary
    title = bookTitle.value;
    author = bookAuthor.value;
    pages = bookPages.value;
    read = bookRead.checked;
    id = this.id;

    let newBook = new Book(title, author, pages, read);

    //push newBook into myLibrary

    myLibrary.push(newBook);
  
    //render new book on submission
    addToLocalStorage(myLibrary);
    updateLibrary();
    myForm.reset();
});

const updateLibrary = () =>{
    libraryContainer.querySelectorAll('div').forEach(n => n.remove());

    for(let i=0; i< myLibrary.length; i++){
        renderBook(myLibrary[i])
    };
};

// create a book card with the book info
const renderBook = (book) =>{
    const bookCard = document.createElement('div');
    bookCard.setAttribute('id', book.id);
    const readBtn = document.createElement('button');
    const removeBtn = document.createElement('button');
    const bookTitlePara = document.createElement('p');
    const bookAuthorPara = document.createElement('p');
    const bookPagesPara = document.createElement('p');
    const bookReadPara = document.createElement('p');
   
    //classes
    bookCard.classList.add('book_card');
    readBtn.classList.add('read_button');
    removeBtn.classList.add('remove_button');
    bookTitlePara.classList.add('book_title');
    bookAuthorPara.classList.add('book_author');
    bookPagesPara.classList.add('book_pages');
    bookReadPara.classList.add('read');

    bookTitlePara.innerHTML = `<strong>Title</strong>: ${book.title}`;
    bookAuthorPara.innerHTML = `<strong>Author</strong>: ${book.author}`;
    bookPagesPara.innerHTML = `<strong>Pages</strong>: ${book.pages}`;

    removeBtn.innerText = 'REMOVE';

    if(book.read === false){
        readBtn.innerText = 'NOT READ';
        readBtn.style.backgroundColor = 'white';
    }else{
        readBtn.innerText = 'READ';
        readBtn.style.backgroundColor = 'lightGreen';
    }
    
    readBtn.addEventListener('click', () =>{
       book.read = !book.read;
        addToLocalStorage(myLibrary)
        updateLibrary();
    })
    
    removeBtn.addEventListener('click', () => {
        myLibrary.splice(myLibrary.indexOf(book), 1)
        addToLocalStorage(myLibrary);
        updateLibrary();
    })

    bookCard.appendChild(bookTitlePara);
    bookCard.appendChild(bookAuthorPara);
    bookCard.appendChild(bookPagesPara);
    bookCard.appendChild(readBtn);
    bookCard.appendChild(removeBtn);
    libraryContainer.appendChild(bookCard);
}


// Save to the local storage
const addToLocalStorage = (myLibrary) => {
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary))
    updateLibrary();
};

const getFromLocalStorage = () =>{
    myLibrary = JSON.parse(localStorage.getItem('myLibrary'));

    if(myLibrary === null){
        myLibrary = [];
    }else{
        updateLibrary();
    }
}

getFromLocalStorage();