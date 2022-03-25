import React, { Fragment, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { EditPost } from "./EditPost";
import axios from "axios";
import ListComments from "./ListComments";
import { SubmitComment } from "./SubmitComment";

export const SinglePost = () => {
  const [comments, setComments] = useState({});
  const [post, setPost] = useState([]);
  const [edit, setEdit] = useState(false);
  const [addComment, setAddComment] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { postId } = useParams();
  const navigate = useNavigate();

  const getSinglePost = async (postId) => {
    try {
      const response = await fetch(`http://localhost:5050/posts/${postId}`);
      const jsonData = await response.json();
      setPost((state) => jsonData);
    } catch (error) {
      console.log(error.message);
    }
  };

  const deletePost = async (postId) => {
    try {
      console.log(postId);
      await axios.delete(`http://localhost:5050/posts/${postId}`);
      console.log("post deleted");
      setDeleted((deleted) => !deleted);
    } catch (error) {
      console.log(error.message);
    }
  };

  const timeConvert = (time) => {
    const dates = new Date(time).toLocaleString();
    return dates;
  };
  useEffect(() => {
    getSinglePost(postId);
  }, []);
  useEffect(() => {
    if (deleted) {
      setTimeout(() => {
        return navigate("/");
      }, 2000);
    }
  }, [deleted]);
  return (
    <Fragment>
      <div className="card">
        {deleted ? (
          <h1>Post was deleted</h1>
        ) : (
          <>
            <h1> {post.author}</h1>
            <h3>{post.content}</h3>
            <h3>Posted by: {post.author}</h3>
            <p>Posted: {timeConvert(post.created)}</p>
            <p>Updated: {timeConvert(post.updated)}</p>
            <div>
              {edit ? (
                <>
                  <EditPost
                    getSinglePost={getSinglePost}
                    post={post}
                    setPost={setPost}
                    edit={edit}
                    setEdit={setEdit}
                  />
                  <button onClick={() => deletePost(postId)}>
                    Delete Post
                  </button>
                  <button onClick={() => setEdit(!edit)}>Cancel</button>
                </>
              ) : (
                <>
                  <button onClick={() => setEdit(!edit)}>Edit Post</button>
                  <button onClick={() => deletePost(postId)}>
                    Delete Post
                  </button>
                </>
              )}
            </div>
          </>
        )}
      </div>
      <div className="comment-form">
        {addComment === false && (
          <button onClick={() => setAddComment(true)}>Add a Comment</button>
        )}
        {addComment && (
          <>
            <div>
              <SubmitComment
                submitted={submitted}
                setSubmitted={setSubmitted}
              />
              {submitted && <h3>Comment Success!</h3>}
            </div>
            <button onClick={() => setAddComment(false)}>Cancel</button>
          </>
        )}
      </div>
      <div className="comments">
        {/* {comments ? comments[0].author : ""} */}
        <ListComments
          submitted={submitted}
          setSubmitted={setSubmitted}
          comments={comments}
          post={post}
        />
      </div>
    </Fragment>
  );
};
