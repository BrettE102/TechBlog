const newPostFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#post-title").value;
  const postBody = document.querySelector("#post-body").value;

  const response = await fetch("/api/posts", {
    method: "POST",
    body: JSON.stringify({ title, postBody }),
    header: { "Content-Type": "application/" },
  });
  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
};
document.querySelector("#newPost-form").addEventListener("submit", newPostFormHandler);
