import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { parseISO, formatDistanceToNow } from "date-fns";
import { SubmitForm } from "./SubmitForm";
import "./css/ListPost.css";
export const ListPosts = () => {
  const [posts, setPosts] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [addPost, setAddPost] = useState(false);
  const [numPosts, setNumPosts] = useState(0);
  const [numComments, setNumComments] = useState(0);

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
    return formatted;
  };

  useEffect(() => {
    getPosts();
    setNumPosts(posts.length);
  }, [submitted]);
  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.created.localeCompare(a.created));
  const renderedPosts = orderedPosts.map((post, index) => {
    return (
      <div key={index} className="card">
        <div className="card-content">
          <button>
            <Link to={`/posts/${post.post_id}`} state={{ numComments }}>
              {post.title}
            </Link>
          </button>
          <h5>{post.content}</h5>
          <p>
            {`Submitted ${timeConvert(post.created)} ago by 
            ${post.author}`}
          </p>
        </div>
      </div>
    );
  });

  return (
    <div className="post-list">
      {addPost === false && (
        <>
          <div className="submit-form-add">
            <button onClick={() => setAddPost(true)}>New Post</button>
          </div>
        </>
      )}
      {addPost && (
        <div className="submit-form">
          <SubmitForm
            posts={posts}
            setPosts={setPosts}
            sumitted={submitted}
            setSubmitted={setSubmitted}
          />
          <button onClick={() => setAddPost(false)}>Cancel</button>
          <div>{submitted && "Post Successfull!"}</div>
        </div>
      )}
      {renderedPosts}
    </div>
  );
};
