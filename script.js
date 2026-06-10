// Ejemplo practico

// Vamos a buscar un usuario, sus posts y sus comentarios
// Notar que para buscar los post necesito primero saber el id del usuario
// Algo parecido pasa con los comentarios

// Obtenemos los elementos de HTML 
const searchBtn = document.getElementById("searchBtn");
const usernameInput = document.getElementById("usernameInput");
const resultDiv = document.getElementById("result");

// Declaramos cada una de las funciones asincronas que consumen el API
// https://jsonplaceholder.typicode.com/
async function getUser(username) {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/users?username=" + username
  );
  return response.json();
}

async function getPostByUser(userId) {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts?userId=" + userId
  );
  return response.json();
}

async function getcommentsByPost(postId) {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/comments?postId=" + postId
  );
  return response.json();
}

// En este caso vamos a usar async / await
async function searchUser() {
  // Obtenemos el input del usuario
  const username = usernameInput.value.trim();
  // Limpiamos el resultado anterior
  resultDiv.innerHTML = "";

  //En caso de que no haya un username ponemos un alert
  if (!username) return alert("no hay usuario");

  // usamos try/catch para casos de error en las peticiones
  try {
    //Comenzamos a llamar las peticiones
    const users = await getUser(username);
    console.log(users);

    // Obtenemos el primer usuario
    const user = users[0];
    //En caso de que no se encuentre el usuario mostramos un alert
    if (!user) return alert("usuario no encontrado");

    // En caso de que si lo encuentre inyectamos los datos en el HTML
    const userDiv = document.createElement("div");
    userDiv.classList.add("user");
    userDiv.innerHTML = `<h2>${user.name} (${user.username})</h2>
    <p>Email: ${user.email}</p>
    <p>Phone: ${user.phone}</p>
    <p>Website: ${user.website}</p>
    <h3>Posts:</h3>
    `;

    resultDiv.appendChild(userDiv);

    // Realizamos un proceso parecido con las otras peticiones
    const posts = await getPostByUser(user.id);

    for (const post of posts) {
      const postDiv = document.createElement("div");
      postDiv.classList.add("post");
      postDiv.innerHTML = `<h4>${post.title}</h4>
      <p>${post.body}</p>
      <h5>Comments:</h5>
      `;

      userDiv.appendChild(postDiv);

      const comments = await getcommentsByPost(post.id);

      for (const comment of comments) {
        const commentDiv = document.createElement("div");
        commentDiv.classList.add("comment");
        commentDiv.innerHTML = `<p><strong>${comment.name} (${comment.email}):</strong> ${comment.body}</p>`;
        postDiv.appendChild(commentDiv);
      }
    }
  } catch (error) {
    alert("Error fetching data");
    console.error(error);
  }
}

// Cuando se genera el click realizamos las consultas
searchBtn.addEventListener("click", searchUser);
