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

getUser3()
  .then((user) => {
    console.log("Id del usuario:", user.id);
    return getPostsByUser3(user.id);
  })
  .then((post) => {
    console.log("Id del primer post:", post[0].id);
    return getCommentsByPost3(post[0].id);
  })
  .then((comments) => {
    console.log("Comentarios del primer post:", comments);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
