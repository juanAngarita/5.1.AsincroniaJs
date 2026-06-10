//fecth
//rxjs

//vanilla js

function getPost() {
  fetch("https://jsonplaceholder.typicode.com/posts/1")
    .then((response) => response.json())
    .then((data) => console.log(data));
}

getPost();

async function getPost2() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
  const data = await response.json();
  console.log(data);
}

getPost2();

// traer la informacion
// castaerla a json
