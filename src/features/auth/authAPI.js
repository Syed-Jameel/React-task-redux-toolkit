export async function createUser(user) {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/posts/user-register`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 400) {
      const data = await response.json();
      return data;
    } else {
      const data = await response.json();
      localStorage.setItem("user", JSON.stringify(data));
      return { data };
    }
  } catch (error) {
    throw error;
  }
}

export async function checkUser(logindata) {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/posts/user-login`, {
      method: "POST",
      body: JSON.stringify(logindata),
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 404) {
      const data = await response.json();
      return data;
    } else {
      const data = await response.json();
      localStorage.setItem("user", JSON.stringify(data));
      return { data };
    }
  } catch (error) {
    throw error;
  }
}

export async function fetchUserDataById(id) {
  try {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/posts/get-user/${id}`);
    const data = await response.json();
    return { data };
  } catch (error) {
    throw error;
  }
}
