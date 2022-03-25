import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { parseISO, formatDistanceToNow } from "date-fns";
import { SubmitForm } from "./SubmitForm";
import ListComments from "./ListComments";
export const ListPosts = () => {
  const [posts, setPosts] = useState([]);
  const [submitted, setSubmitted] = useState(false);

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
  }, [submitted]);
  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.created.localeCompare(a.created));
  const renderedPosts = orderedPosts.map((post, index) => {
    return (
      <div key={index} className="card">
        <div className="card-content">
          <h3>
            <Link to={`/posts/${post.post_id}`}>{post.title}</Link>
          </h3>
          <h5>{post.content}</h5>
          <div>
            <p></p>
            <i>{`Submitted ${timeConvert(post.created)} ago by 
            ${post.author}`}</i>
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      <div className="submit-form">
        <SubmitForm
          posts={posts}
          setPosts={setPosts}
          sumitted={submitted}
          setSubmitted={setSubmitted}
        />
        <div>{submitted && "Post Successfull!"}</div>
      </div>
      {renderedPosts}
    </>
  );
};
