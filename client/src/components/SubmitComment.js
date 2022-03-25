import React, { useState } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";

export const SubmitComment = ({ posts, setPosts, submitted, setSubmitted }) => {
  const [formContents, setFormContents] = useState({
    comment_text: "",
    author: "",
  });

  const { postId } = useParams();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormContents({
      ...formContents,
      [name]: value,
      created: new Date().toISOString(),
      updated: new Date().toISOString(),
      post_id: postId,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(formContents);
    axios.post(`http://localhost:5050/posts/${postId}/comments`, formContents);
    setSubmitted((submitted) => !submitted);
    setFormContents({ comment_text: "", author: "" });
    setTimeout(() => {
      setSubmitted((submitted) => !submitted);
    }, 2000);
  };
  return (
    <form>
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
          Comment Text:
          <textarea
            type="textarea"
            name="comment_text"
            id="comment_text"
            onChange={handleChange}
            value={formContents.comment_text}
          />
        </label>
      </div>
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </form>
  );
};
