// fecth: funcion que permite consumir apis externas
// En Frameworks de JS como Angular, React estos tienen sus propias librerias para consumir API
// EJ: RXJS

// Notar que fetch retorna una promesa
// Podemos consumirla con .then
function getPost() {
  fetch("https://jsonplaceholder.typicode.com/posts/1")
    .then((response) => response.json())
    .then((data) => console.log(data)); // Castear los datos a json
}

getPost();

// O podemos consumirla con async / await
async function getPost2() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
  const data = await response.json();
  console.log(data);
}

getPost2();
