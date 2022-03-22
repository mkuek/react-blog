import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const SinglePost = () => {
  const [post, setPost] = useState([]);
  const { postId } = useParams();

  const getSinglePost = async (postId) => {
    try {
      const response = await fetch(`http://localhost:5050/posts/${postId}`);
      const jsonData = await response.json();
      setPost(jsonData);
    } catch (error) {
      console.log(error.message);
    }
  };

  const timeConvert = () => {
    const dates = new Date(post.created).toLocaleString();
    return dates;
  };
  useEffect(() => {
    getSinglePost(postId);
  }, []);

  return (
    <Fragment>
      <h1>{post.title}</h1>
      <h3>{post.content}</h3>
      <p>{timeConvert()}</p>
    </Fragment>
  );
};
