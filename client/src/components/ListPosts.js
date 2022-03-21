import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const ListPosts = () => {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    try {
      const response = await fetch("http://localhost:5050/posts");
      const jsonData = await response.json();
      setPosts(jsonData);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getPosts();
  }, []);

  const renderedPosts = posts.map((post, index) => {
    return (
      <div key={index}>
        <h3>{post.title}</h3>
        <h5>{post.content}</h5>
        <h5>{post.post_id}</h5>
        <Link to={`/posts/${post.post_id}`}>test</Link>
      </div>
    );
  });

  return <>{renderedPosts}</>;
};
