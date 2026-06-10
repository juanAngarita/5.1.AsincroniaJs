const searchBtn = document.getElementById("searchBtn");
const usernameInput = document.getElementById("usernameInput");
const resultDiv = document.getElementById("result");

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

async function searchUser() {
  const username = usernameInput.value.trim();
  resultDiv.innerHTML = "";

  if (!username) return alert("no hay usuario");

  try {
    const users = await getUser(username);

    console.log(users);

    const user = users[0];

    if (!user) return alert("usuario no encontrado");

    const userDiv = document.createElement("div");
    userDiv.classList.add("user");
    userDiv.innerHTML = `<h2>${user.name} (${user.username})</h2>
    <p>Email: ${user.email}</p>
    <p>Phone: ${user.phone}</p>
    <p>Website: ${user.website}</p>
    <h3>Posts:</h3>
    `;

    resultDiv.appendChild(userDiv);

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

searchBtn.addEventListener("click", searchUser);
