import React, { useState } from "react";
import axios from "axios";

export const SubmitForm = () => {
  const [formContents, setFormContacts] = useState({
    title: "",
    content: "",
    author: "",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormContacts({ ...formContents, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formContents);
    axios.post("http://localhost:5050/posts", formContents);
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
      <input type="submit" onClick={handleSubmit} />
    </form>
  );
};
