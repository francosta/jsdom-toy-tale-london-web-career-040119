const addBtn = document.querySelector("#new-toy-btn");
const toyForm = document.querySelector(".container");
let showForm = false;
const toysUrl = "http://localhost:3000/toys";
const toyCollection = document.querySelector("#toy-collection");
const form = document.querySelector(".add-toy-form");

function getToys(url) {
  fetch(url)
    .then(resp => resp.json())
    .then(toys => addToys(toys));
}

function addToy(toy) {
  //create element
  const toyEl = document.createElement("div");
  toyEl.className = "card";
  toyCollection.append(toyEl);

  //add name
  const name = document.createElement("h2");
  name.innerText = toy.name;
  toyEl.append(name);

  //add image
  const img = document.createElement("img");
  img.className = "toy-avatar";
  img.src = toy.image;
  toyEl.append(img);

  //add likes
  const likes = document.createElement("p");
  likes.innerText = `${toy.likes} likes`;
  toyEl.append(likes);

  //add button
  const button = document.createElement("button");
  button.className = "like-btn";
  button.innerText = "Like <3";
  toyEl.append(button);
}

function addToys(toys) {
  toys.forEach(toy => addToy(toy));
}

function createToy(toy) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(toy)
  };
  return fetch("http://localhost:3000/toys", options).then(resp => resp.json());
}

//Event Listeners

//Show Form
addBtn.addEventListener("click", () => {
  // hide & seek with the form
  showForm = !showForm;
  if (showForm) {
    toyForm.style.display = "block";
  } else {
    toyForm.style.display = "none";
  }
});

// Call functions
getToys(toysUrl);

form.addEventListener("submit", function(event) {
  event.preventDefault();
  const toy = {
    name: form.name.value,
    image: form.image.value,
    likes: 0
  };
  form.reset();
  createToy(toy).then(toy => addToy(toy));
});
