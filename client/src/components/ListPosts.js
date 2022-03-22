import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { parseISO, formatDistanceToNow } from "date-fns";

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

  const timeConvert = (time) => {
    const date = new Date(time).toISOString();
    const ISOconvert = parseISO(date);
    const formatted = formatDistanceToNow(ISOconvert);
    console.log(formatted);
    return formatted;
  };

  useEffect(() => {
    getPosts();
  }, []);
  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.created.localeCompare(a.date));
  const renderedPosts = orderedPosts.map((post, index) => {
    return (
      <div key={index}>
        <h3>{post.title}</h3>
        <h5>{post.content}</h5>
        <h5>{timeConvert(post.created) + " ago"}</h5>
        <Link to={`/posts/${post.post_id}`}>View Post</Link>
      </div>
    );
  });

  return <>{renderedPosts}</>;
};
