const loginFormHandler = async (event) => {
  event.preventDefault();

  const userName = document.querySelector("#username-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (userName && password) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ userName, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
};

document.querySelector("#login-form").addEventListener("submit", loginFormHandler);
