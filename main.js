const UNCOMPLETED_BOOKS = "unread";
const COMPLETED_BOOKS = "read";
const BOOK_ITEMID = "itemId";

function makeBook(title, author, year, isCompleted) {
  const bookTitle = document.createElement("h3");
  bookTitle.innerText = title;

  const authorName = document.createElement("p");
  authorName.innerText = author;

  const bookYear = document.createElement("small");
  bookYear.innerText = year;

  const textContainer = document.createElement("div");
  textContainer.classList.add("inner");
  textContainer.append(bookTitle, authorName, bookYear);

  const container = document.createElement("div");
  container.classList.add("shadow");
  container.append(textContainer);

  if (isCompleted) {
    container.append(createUnreadButton(), createTrashButton());
  } else {
    container.append(createReadButton(), createTrashButton());
  }

  return container;
}

function createUnreadButton() {
  return createButton("Unread", "green", function (event) {
    unreadBook(event.target.parentElement);
  });
}

function createTrashButton() {
  return createButton("Remove", "red", function (event) {
    removeBookTask(event.target.parentElement);
  });
}

function createReadButton() {
  return createButton("Read", "green", function (event) {
    readBookTask(event.target.parentElement);
  });
}

function createButton(buttonName, buttonTypeClass, eventListener) {
  const button = document.createElement("button");
  button.innerText = buttonName;
  button.classList.add(buttonTypeClass);
  button.addEventListener("click", function (event) {
    eventListener(event);
  });

  return button;
}

function addBook() {
  const unreadBook = document.getElementById(UNCOMPLETED_BOOKS);
  const bookTitle = document.getElementById("inputBookTitle").value;
  const bookAuthor = document.getElementById("inputBookAuthor").value;
  const bookYear = document.getElementById("inputBookYear").value;
  const newBook = makeBook(bookTitle, bookAuthor, bookYear, false);
  const bookObj = composeBookObject(bookTitle, bookAuthor, bookYear, false);

  newBook[BOOK_ITEMID] = bookObj.id;
  books.push(bookObj);

  unreadBook.append(newBook);
  updateDataToStorage();
}

function readBookTask(bookElement) {
  const bookComplete = document.getElementById(COMPLETED_BOOKS);
  const bookTitle = bookElement.querySelector(".inner > h3").innerText;
  const bookAuthor = bookElement.querySelector(".inner > p").innerText;
  const bookYear = bookElement.querySelector(".inner > small").innerText;
  const book = makeBook(bookTitle, bookAuthor, bookYear, true);

  const books = findBook(bookElement[BOOK_ITEMID]);
  books.isCompleted = true;
  book[BOOK_ITEMID] = books.id;

  bookComplete.append(book);
  bookElement.remove();

  updateDataToStorage();
}

function removeBookTask(bookElement) {
  const bookPosition = findBookIndex(bookElement[BOOK_ITEMID]);
  books.splice(bookPosition, 1);
  bookElement.remove();
  updateDataToStorage();
}

function unreadBook(bookElement) {
  const unreadBook = document.getElementById(UNCOMPLETED_BOOKS);
  const bookTitle = bookElement.querySelector(".inner > h3").innerText;
  const bookAuthor = bookElement.querySelector(".inner > p").innerText;
  const bookYear = bookElement.querySelector(".inner > small").innerText;
  const book = makeBook(bookTitle, bookAuthor, bookYear, false);

  const books = findBook(bookElement[BOOK_ITEMID]);
  books.isCompleted = false;
  book[BOOK_ITEMID] = books.id;

  unreadBook.append(book);
  bookElement.remove();
  updateDataToStorage();
}
