document.addEventListener("DOMContentLoaded", function() {
  fetchBook()
});

function fetchBook(){
  fetch (`http://localhost:3000/books`)
    .then (res => res.json())
    .then (books => {books.forEach(book => renderBook(book))
    })
}

function renderBook(book) {
  const ul = document.getElementById("list")
  const li = document.createElement('li')

  li.textContent = book.title
  ul.append(li)

  li.addEventListener('click',() => handleClick(book))
}

function handleClick(book) {
  const div = document.getElementById("show-panel")
  div.innerHTML = ""
  const img = document.createElement('img')
  const h2 = document.createElement('h2')
  const h3 = document.createElement('h3')
  const h4 = document.createElement('h4')
  const p = document.createElement('p')
  const ul = document.createElement('ul')
    book.users.forEach(function(user) {
      const li = document.createElement('li')
      li.textContent = user.username
      ul.append(li)
    })
  const btn = document.createElement('button')
  btn.textContent = "LIKE"
  img.src = book.img_url
  h2.textContent = book.title
  h3.textContent = book.subtitle
  h4.textContent = book.author
  p.textContent = book.description

  btn.addEventListener("click", ()=> handleLike(book))

  div.append(img, h2, h3, h4, p, ul, btn)

}

function handleLike(book){
  fetch(`http://localhost:3000/books/${book.id}`, {
    method: "PATCH",
    headers: {
    'Content-Type': 'application/json'
  },
    body: JSON.stringify({
      users: [...book.users, {"id":1, "username":"pouros"}]
    })
  })
  .then (res => res.json())
  .then (updateBook => handleClick(updateBook))

}
