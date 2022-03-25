import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export const EditPost = ({ post, setPost, getSinglePost, edit, setEdit }) => {
  const { postId } = useParams();
  const [formContents, setFormContents] = useState({});
  useEffect(() => {
    setFormContents({
      title: post.title,
      content: post.content,
      author: post.author,
    });
  }, [post]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormContents({
      ...formContents,
      [name]: value,
      created: post.created,
      updated: new Date().toISOString(),
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formContents);
    axios.put(`http://localhost:5050/posts/${postId}/edit`, formContents);
    setPost(formContents);
    setEdit((edit) => !edit);
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
        Save Post
      </button>
    </form>
  );
};
