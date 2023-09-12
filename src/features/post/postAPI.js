export function fetchAllPosts() {
  return new Promise(async (resolve) => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/posts`);
    const data = await response.json();
    resolve({ data });
  });
}

export function fetchPost(id) {
  return new Promise(async (resolve) => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/posts/${id}`);
    const data = await response.json();
    resolve({ data });
  });
}

export function createPost(post) {
  return new Promise(async (resolve) => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/posts`, {
      method: "POST",
      body: JSON.stringify(post),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}

export function updatePost(post, id) {
  return new Promise(async (resolve) => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/posts/${id}`, {
      method: "PATCH",
      body: JSON.stringify(post),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json()
    resolve(data);
  });
}

export function deletePost(id) {
  return new Promise(async (resolve) => {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/posts/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    resolve({ data });
  });
}
