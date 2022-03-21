import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function SinglePost() {
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

  useEffect(() => {
    getSinglePost(postId);
  }, []);

  return <div>{post.title}</div>;
}

export default SinglePost;
