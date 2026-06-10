// Callbacks: función que se pasa como parametro a otra funcion

//Un callback no se ejecuta inmediatamente, sino:
//➡️ cuando termine una operación
//➡️ cuando ocurra un evento
//➡️ cuando la API esté lista
//➡️ cuando otro proceso lo invoque

// 0. Pasar funcion como parametro de otra funcion
const operacion = (a, b, operacion) => {
  return operacion(a, b);
};

const suma = (a, b) => a + b;

console.log(operacion(2, 3, suma));

// 0.1 Funcion anonima
console.log(
  operacion(2, 3, (a, b) => {
    return a * b;
  })
);

// 0.2 Funcion anonima sin return
console.log(operacion(2, 3, (a, b) => a - b));

// 1. Eventos
// Obtenemos el boton
const btn = document.querySelector("#btn");

// Generamos un callback
// El callback se ejecutara cuando se haga click
// Reaccionamos cuando se realiza click
btn.addEventListener("click", () => {
  console.log("Click en el botón");
});

// 2. Callbacks basicos
const sumar100numeros = () => {
  let suma = 0;
  for (let i = 1; i <= 100; i++) {
    suma += i;
  }
  return suma;
};

const total = sumar100numeros();

console.log(total);

// 2.1 Pasamos una funcion que se ejecuta cuando se termina de ejecutar la funcion principal
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

// 3. Asincronia, funciones que se ejecutan en paralelo y normalmente toma algun tiempo
// Ej: peticiones a internet
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

// Los datos demoran 3 segundos en retornar del servidor
const getDatos = () => {
  setTimeout(() => {
    return onlineData;
  }, 3000);
};

// Simulamos que realizamos la peticion
// Notar que el codigo no se ejecuta de manera correcta
// Los datos quedan en undefined
console.log("Comenzamos");
const datos = getDatos();
console.log(datos);
console.log("Terminamos");

// Desarrollamos nuevamente la funcion pero de manera correcta con un callback
// Pasamos la funcion que se ejecuta cuando llegan los datos
const getDatos2 = (callback) => {
  setTimeout(() => {
    callback(onlineData);
  }, 3000);
};

console.log("Comenzamos");
getDatos2((datos) => console.log(datos));
console.log("Terminamos");

// 4. Callback Hell
// Cuando tenemos varias peticiones anidadas

// Para el siguiente ejemplo realizamos estas peticiones
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

// Notar que para llamar a posts y comentarios debemos pasarle el id del usuario
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

// Realizamos un primer ejemplo sin usar callbacks
// dado que el codigo todavia es sincrono todo funciona
const user = getUser();
const posts = getPostsByUser(user.id);
const comments = getCommentsByPost(posts[0].id);

console.log("resultado final:", { user, posts, comments });

// Replicamos el codigo, ahora toma algunos segundos y es asincrono
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

// Cuando tenemos codigo asincrono y no usamos callbacks no funciona de manera adecuada

/*const user2 = getUser2();
const posts2 = getPostsByUser2(user2.id);
const comments2 = getCommentsByPost2(posts2[0].id);

console.log("resultado final 2:", { user2, posts2, comments2 });
*/

// Finalmente volvemos a ejecutar con callbacks, 

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

// callback hell
// Callback de un callback de un callback
// Notar que si se tienen 10 peticiones anidadas el codigo se vuele muy dificil de entender y depurar
// Igualmente, esta es la solucion correcta por el momento
getUser3((user) => {
  getPostsByUser3(user.id, (posts) => {
    getCommentsByPost3(posts[0].id, (comments) => {
      console.log("resultado final 3:", { user, posts, comments });
    });
  });
});
