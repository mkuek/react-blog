import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { parseISO, formatDistanceToNow, set } from "date-fns";
import { SubmitForm } from "./SubmitForm";
import { useParams, useNavigate } from "react-router-dom";
const SingleComment = () => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);

  const [submitted, setSubmitted] = useState(false);
  const { postId } = useParams();
  const getPosts = async () => {
    try {
      const [comRes, postRes] = await Promise.all([
        fetch(`http://localhost:5050/posts/${postId}/comments`).then(
          (response) => response.json()
        ),
        fetch(`http://localhost:5050/posts/${postId}`).then((response) =>
          response.json()
        ),
      ]);
      //   const jsonData = await response.json();
      setComments(comRes);
      //   setComments(postRes);
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
    getPosts(postId);
  }, [submitted]);
  const orderedPosts = comments
    .slice()
    .sort((a, b) => b.created.localeCompare(a.created));
  const renderedPosts = orderedPosts.map((post, index) => {
    return (
      <div key={index} className="comment-card">
        <div className="card-content">
          <h3>
            <Link to={`/posts/${post.post_id}`}>{post.author}</Link>
          </h3>
          <h5>{post.comment_text}</h5>
          <div>
            <p></p>
            <i>{`Submitted ${timeConvert(post.created)} ago by 
            ${post.author}`}</i>
          </div>
        </div>
      </div>
    );
  });

  return <>{renderedPosts}</>;
};

export default SingleComment;
