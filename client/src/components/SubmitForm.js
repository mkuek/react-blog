import React, { useState } from "react";
import axios from "axios";

export const SubmitForm = ({ posts, setPosts, submitted, setSubmitted }) => {
  const [formContents, setFormContents] = useState({
    title: "",
    content: "",
    author: "",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormContents({
      ...formContents,
      [name]: value,
      created: new Date().toISOString(),
      updated: new Date().toISOString(),
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post("http://localhost:5050/posts", formContents);
    setSubmitted((submitted) => !submitted);
    setFormContents({ title: "", content: "", author: "" });
    setTimeout(() => {
      setSubmitted((submitted) => !submitted);
    }, 2000);
  };
  return (
    <form>
      <div>
        <label>
          Title:
          <input
            type="text"
            name="title"
            id="title"
            onChange={handleChange}
            value={formContents.title}
          />
        </label>
      </div>
      <div>
        <label>
          Author:
          <input
            type="text"
            name="author"
            id="author"
            onChange={handleChange}
            value={formContents.author}
          />
        </label>
      </div>
      <div>
        <label>
          Blog Content:
          <textarea
            type="textarea"
            name="content"
            id="content"
            onChange={handleChange}
            value={formContents.content}
          />
        </label>
      </div>
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </form>
  );
};
