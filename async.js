// Alternativa a como reaccionar a los promises
// Tenemos las mismas peticions que en promises

function getUser3() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = {
        id: 1,
        name: "John Doe",
      };
      resolve(user);
    }, 3000);
  });
}

function getPostsByUser3(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const posts = [
        { id: 1, title: "Post 1" },
        { id: 2, title: "Post 2" },
      ];
      resolve(posts);
    }, 3000);
  });
}

function getCommentsByPost3(postId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const comments = [
        { id: 1, content: "Comentario 1" },
        { id: 2, content: "Comentario 2" },
      ];
      resolve(comments);
    }, 3000);
  });
}

// La diferencia es como reaccionamos para resolver o rechazar la promesa
// es necesario poner el async si dentro de nuestra funcion usamos el await
async function main() {
  // Para el manejo de errores usamos el try catch
  try {
    // Usamos await para esperar a que la promesa se resuelva
    // Parece que ejecutamos codigo sincrono, pero en realidad es asincrono
    const user = await getUser3();
    console.log("id del usuario", user.id);

    const posts = await getPostsByUser3(user.id);
    console.log("id del primer post", posts[0].id);

    const comments = await getCommentsByPost3(posts[0].id);
    console.log("comentarios del primer post", comments);
  } catch (error) {
    console.error("Error:", error);
  }
}

main();
