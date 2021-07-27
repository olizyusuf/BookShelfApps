const STORAGE_KEY = "BOOK_APPS";

// {
//     id: string | number,
//     title: string,
//     author: string,
//     year: number,
//     isComplete: boolean,
//   }

let books = [];

function checkStorage() {
  if (typeof Storage == undefined) {
    alert("Browser tidak support web storage");
    return false;
  }

  return true;
}

function saveData() {
  const parseData = JSON.stringify(books);
  localStorage.setItem(STORAGE_KEY, parseData);
  document.dispatchEvent(new Event("ondatasaved"));
}

function loadDatafromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  const data = JSON.parse(serializedData);

  if (data != null) books = data;

  document.dispatchEvent(new Event("ondataloaded"));
}

function updateDataToStorage() {
  if (checkStorage()) saveData();
}

function composeBookObject(bookTitle, bookAuthor, bookYear, isCompleted) {
  return {
    id: +new Date(),
    bookTitle,
    bookAuthor,
    bookYear,
    isCompleted,
  };
}

function findBook(bookId) {
  for (book of books) {
    if (book.id === bookId) return book;
  }
  return null;
}

function findBookIndex(bookId) {
  let index = 0;
  for (book of books) {
    if (book.id === bookId) return index;

    index++;
  }

  return -1;
}

function refreshDataFromBooks() {
  const bookUncompleted = document.getElementById(UNCOMPLETED_BOOKS);
  let bookCompleted = document.getElementById(COMPLETED_BOOKS);

  for (book of books) {
    const newBook = makeBook(
      book.bookTitle,
      book.bookAuthor,
      book.bookYear,
      book.isCompleted
    );
    newBook[BOOK_ITEMID] = book.id;

    if (book.isCompleted) {
      bookCompleted.append(newBook);
    } else {
      bookUncompleted.append(newBook);
    }
  }
}
