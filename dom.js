document.addEventListener("DOMContentLoaded", function () {
  const submitForm = document.getElementById("inputBook");

  submitForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addBook();
  });

  if (checkStorage()) {
    loadDatafromStorage();
  }
});

document.addEventListener("ondatasaved", () => {
  console.log("Data sukses disimpan");
});

document.addEventListener("ondataloaded", () => {
  refreshDataFromBooks();
});
