
const subBtn = document.getElementById('submit');
const myForm= document.getElementById('my_form');
const addBtn = document.getElementById('add_btn')
const libraryContainer = document.getElementById('show_library')


/*initialise library*/

let myLibrary = [];

/*Book constructor*/
function Book(title, author, pages, read){
    this.title =  title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    }



/*shows the form when you click on the add button and clear the input fields when you click Cancel*/
    function showHideForm(){
    if(myForm.style.display==='block'){
        myForm.style.display='none';
        
    }else{
        myForm.style.display='block';
    }

    if(addBtn.value==='Add Book'){
        addBtn.value= 'Cancel'
        myForm.reset();
    }else{
        addBtn.value = 'Add Book';
    }
}


/* Hide the form when your click submit*/
    myForm.addEventListener('submit', (e) =>{
        e.preventDefault();
  
        /* when the submit button is clicked, addBtn value changes from Cancel to Add Book*/
        if(subBtn){

            if(addBtn.value==='Add Book'){
                addBtn.value = 'Cancel'
                myForm.reset();
            }   else   {
                    addBtn.value = 'Add Book';
        }
        
        /* The form becomes invisible*/
        myForm.style.display= 'none';

    }   


    /* argument for addBookToLibrary*/

    myFormValue = e.target.elements;
    let newBook = new Book(myFormValue.title.value, myFormValue.author.value, myFormValue.pages.value, myFormValue.read.checked);

    /* push newBook into myLibrary*/
    myLibrary.push(newBook)

    /*render new book on submission*/
    addBookToLibrary(newBook)
    
    myForm.reset();
    
})

const addBookToLibrary = (myBook) =>{

    let formDiv = document.createElement('form')
    formDiv.classList.add('toggle_remove');
    
    /* buttons to delete book button*/
    let removeBtn = document.createElement('input');
    removeBtn.setAttribute('type', 'button');
    removeBtn.classList.add('delete');
    removeBtn.value = 'Remove'


    /* Read toggle button*/
    let readBtn = document.createElement('input');
    readBtn.setAttribute('type', 'button');
    readBtn.classList.add('readBtn_style');

    /* append input to form*/

    formDiv.appendChild(removeBtn);
    formDiv.appendChild(readBtn);


    /* seperate book entries*/

const containerDiv = document.createElement('div');
containerDiv.classList.add('bookContainer');

/* append containerDiv to libraryContainer*/

libraryContainer.appendChild(containerDiv);

/*display book details*/

for(const[key,value] of Object.entries(myBook)){
    /* create a P element for every detail*/

    const pNode = document.createElement('p');
    /*logic for displaying book information on screen*/

    if(key==='pages'){
        pNode.innerHTML = `<strong>Pages</strong>: ${value}`;
        pNode.classList.add('num_pages');
    } 
    
    else if(key === 'read'){
        if(value){
            readBtn.value = 'Read: Yes';
            readBtn.style.background = 'lightgreen'
        }else {
            readBtn.value = 'Read: No';
            readBtn.style.background = 'red'
        }
    }

    else if(key === 'author'){
        pNode.innerHTML = `<strong>Author</strong>: ${value}`;
        pNode.classList.add('book_author');
    }else{
        pNode.innerHTML = `<strong>Title</strong>: ${value}`;
        pNode.classList.add('book_title');
    }

        pNode.classList.add("bookDetail")
        containerDiv.append(pNode)
        containerDiv.append(readBtn)
}

    containerDiv.appendChild(removeBtn);

       /*remove book*/

    removeBtn.addEventListener('click', () =>{
        containerDiv.remove();
    })

    /*toggle read button*/

    readBtn.addEventListener('click', () => {
        if(readBtn.value === 'Read: No'){
            readBtn.style.background = 'lightgreen';
            readBtn.value = 'Read: Yes';
        } else if(readBtn.value === 'Read: Yes'){
            readBtn.value = 'Read: No';
            readBtn.style.background = 'red'
        }

    })

}


