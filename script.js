const subBtn = document.getElementById("submit");
const myForm = document.getElementById("my_form");
const addBtn = document.getElementById("add_btn");
const cancelBtn = document.getElementById("cancel");
const libraryContainer = document.getElementById("show_library");
const bookTitle = document.getElementById("title");
const bookAuthor = document.getElementById("author");
const bookPages = document.getElementById("pages");
const bookRead = document.getElementById("read");

let myLibrary = [];

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = Date.now();
  }
}

addBtn.addEventListener("click", () => {
  myForm.style.display = "block";
  addBtn.style.display = "none";
});

cancelBtn.addEventListener("click", () => {
  addBtn.style.display = "block";
  myForm.style.display = "none";
  myForm.reset();
});

myForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (subBtn) {
    addBtn.style.display = "block";
    myForm.style.display = "none";
  }

  let newBook = new Book(
    bookTitle.value,
    bookAuthor.value,
    bookPages.value,
    bookRead.checked
  );
  myLibrary.push(newBook);

  addToLocalStorage(myLibrary);
  updateLibrary();
  myForm.reset();
});

const renderBook = (book) => {
  const bookCard = document.createElement("div");
  bookCard.setAttribute("id", book.id);
  const readBtn = document.createElement("button");
  const removeBtn = document.createElement("button");
  const bookTitlePara = document.createElement("p");
  const bookAuthorPara = document.createElement("p");
  const bookPagesPara = document.createElement("p");
  const bookReadPara = document.createElement("p");

  bookCard.classList.add("book_card");
  readBtn.classList.add("read_button");
  removeBtn.classList.add("remove_button");
  bookTitlePara.classList.add("book_title");
  bookAuthorPara.classList.add("book_author");
  bookPagesPara.classList.add("book_pages");
  bookReadPara.classList.add("read");

  bookTitlePara.innerHTML = `<strong class="title">Title:</strong> ${book.title}`;
  bookAuthorPara.innerHTML = `<strong class="author">Author:</strong> ${book.author}`;
  bookPagesPara.innerHTML = `<strong class="pages">Pages:</strong> ${book.pages}`;

  removeBtn.innerText = "REMOVE";

  if (book.read === false) {
    readBtn.innerText = "NOT READ";
    readBtn.style.backgroundColor = "blue";
  } else {
    readBtn.innerText = "READ";
    readBtn.style.backgroundColor = "green";
  }

  readBtn.addEventListener("click", () => {
    book.read = !book.read;
    addToLocalStorage(myLibrary);
    updateLibrary();
  });

  removeBtn.addEventListener("click", () => {
    myLibrary.splice(myLibrary.indexOf(book), 1);
    addToLocalStorage(myLibrary);
    updateLibrary();
  });

  bookCard.appendChild(bookTitlePara);
  bookCard.appendChild(bookAuthorPara);
  bookCard.appendChild(bookPagesPara);
  bookCard.appendChild(readBtn);
  bookCard.appendChild(removeBtn);
  libraryContainer.appendChild(bookCard);
};

const updateLibrary = () => {
  libraryContainer.querySelectorAll("div").forEach((n) => n.remove());

  for (let i = 0; i < myLibrary.length; i++) {
    renderBook(myLibrary[i]);
  }
};

const addToLocalStorage = (myLibrary) => {
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
  updateLibrary();
};

const getFromLocalStorage = () => {
  myLibrary = JSON.parse(localStorage.getItem("myLibrary"));

  if (myLibrary === null) {
    myLibrary = [];
  } else {
    updateLibrary();
  }
};

getFromLocalStorage();
