import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { parseISO, formatDistanceToNow, set } from "date-fns";
import { useParams, useNavigate } from "react-router-dom";

const ListComments = ({ submmitted, numComments, setNumComments }) => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);

  const { postId } = useParams();
  const getComments = async () => {
    try {
      const response = await fetch(
        `http://localhost:5050/posts/${postId}/comments`
      );
      const jsonData = await response.json();
      setComments(jsonData);
      setNumComments(jsonData.length);
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
    getComments();
  }, [submmitted]);
  const orderedPosts = comments
    .slice()
    .sort((a, b) => b.created.localeCompare(a.created));
  const renderedPosts = orderedPosts.map((post, index) => {
    return (
      <div key={index} className="comment-card">
        <div className="card-content">
          <p>
            <Link to={`/posts/${post.post_id}`}>{post.author}</Link>
          </p>
          <p>{post.comment_text}</p>
          <p>{`Submitted ${timeConvert(post.created)} ago by 
            ${post.author}`}</p>
        </div>
      </div>
    );
  });

  return <>{renderedPosts}</>;
};

export default ListComments;
