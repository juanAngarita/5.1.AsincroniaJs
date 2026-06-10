//Un callback no se ejecuta inmediatamente, sino:
//➡️ cuando termine una operación
//➡️ cuando ocurra un evento
//➡️ cuando la API esté lista
//➡️ cuando otro proceso lo invoque

const operacion = (a, b, operacion) => {
  return operacion(a, b);
};

const suma = (a, b) => a + b;

console.log(operacion(2, 3, suma));

console.log(
  operacion(2, 3, (a, b) => {
    return a * b;
  })
);

console.log(operacion(2, 3, (a, b) => a - b));

const btn = document.querySelector("#btn");

btn.addEventListener("click", () => {
  console.log("Click en el botón");
});

const sumar100numeros = () => {
  let suma = 0;
  for (let i = 1; i <= 100; i++) {
    suma += i;
  }
  return suma;
};

const total = sumar100numeros();

console.log(total);

const sumar100numeros2 = (callback) => {
  let suma = 0;
  for (let i = 1; i <= 100; i++) {
    suma += i;
  }
  callback(suma);
};

sumar100numeros2((total) => {
  console.log(total);
});

// 3. asincronia
const onlineData = [
  {
    id: 1,
    name: "John Doe",
  },
  {
    id: 2,
    name: "Jane Smith",
  },
  {
    id: 3,
    name: "Alice Johnson",
  },
];

const getDatos = () => {
  setTimeout(() => {
    return onlineData;
  }, 3000);
};

console.log("Comenzamos");
const datos = getDatos();
console.log(datos);
console.log("Terminamos");

const getDatos2 = (callback) => {
  setTimeout(() => {
    callback(onlineData);
  }, 3000);
};

console.log("Comenzamos");
//getDatos2((datos) => console.log(datos));
console.log("Terminamos");

// 1 .buscando usuario
// 2. buscando post
// 3. buscando comentarios

function getUser() {
  console.log("usuario obtenido");
  return {
    id: 1,
    name: "John Doe",
  };
}

function getPostsByUser(userId) {
  console.log("posts obtenidos para el usuario " + userId);
  return [
    { id: 1, title: "Post 1" },
    { id: 2, title: "Post 2" },
  ];
}

function getCommentsByPost(postId) {
  console.log("comentarios obtenidos para el post " + postId);
  return [
    { id: 1, content: "Comentario 1" },
    { id: 2, content: "Comentario 2" },
  ];
}

const user = getUser();
const posts = getPostsByUser(user.id);
const comments = getCommentsByPost(posts[0].id);

console.log("resultado final:", { user, posts, comments });

function getUser2() {
  console.log("usuario obtenido 2");
  setTimeout(() => {
    const user = {
      id: 1,
      name: "John Doe",
    };
    return user;
  }, 3000);
}

function getPostsByUser2(userId) {
  console.log("posts obtenidos para el usuario " + userId);
  setTimeout(() => {
    const posts = [
      { id: 1, title: "Post 1" },
      { id: 2, title: "Post 2" },
    ];
    return posts;
  }, 3000);
}

function getCommentsByPost2(postId) {
  console.log("comentarios obtenidos para el post " + postId);
  setTimeout(() => {
    const comments = [
      { id: 1, content: "Comentario 1" },
      { id: 2, content: "Comentario 2" },
    ];
    return comments;
  }, 3000);
}

/*const user2 = getUser2();
const posts2 = getPostsByUser2(user2.id);
const comments2 = getCommentsByPost2(posts2[0].id);

console.log("resultado final 2:", { user2, posts2, comments2 });
*/

function getUser3(callback) {
  console.log("usuario obtenido 3");
  setTimeout(() => {
    const user = {
      id: 1,
      name: "John Doe",
    };
    callback(user);
  }, 3000);
}

function getPostsByUser3(userId, callback) {
  console.log("posts obtenidos para el usuario " + userId);
  setTimeout(() => {
    const posts = [
      { id: 1, title: "Post 1" },
      { id: 2, title: "Post 2" },
    ];
    callback(posts);
  }, 3000);
}

function getCommentsByPost3(postId, callback) {
  console.log("comentarios obtenidos para el post " + postId);
  setTimeout(() => {
    const comments = [
      { id: 1, content: "Comentario 1" },
      { id: 2, content: "Comentario 2" },
    ];
    callback(comments);
  }, 3000);
}

//callback hell
getUser3((user) => {
  getPostsByUser3(user.id, (posts) => {
    getCommentsByPost3(posts[0].id, (comments) => {
      console.log("resultado final 3:", { user, posts, comments });
    });
  });
});
