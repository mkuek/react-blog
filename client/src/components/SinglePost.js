import React, { Fragment, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { EditPost } from "./EditPost";
import axios from "axios";
import ListComments from "./ListComments";

export const SinglePost = () => {
  const [comments, setComments] = useState();
  const [post, setPost] = useState({});
  const [edit, setEdit] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const { postId } = useParams();
  const navigate = useNavigate();

  const getSinglePost = async (postId) => {
    try {
      const response = await fetch(`http://localhost:5050/posts/${postId}`);
      const jsonData = await response.json();
      setPost(jsonData);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getComments = async (postId) => {
    try {
      const response = await axios.get(
        `http://localhost:5050/posts/${postId}/comments`
      );
      setComments((state) => response.data);
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
  useEffect(() => {
    getComments(postId);
    console.log("component rendered", comments);
  }, []);
  return (
    <Fragment>
      <div className="card">
        {deleted ? (
          <h1>Post was deleted</h1>
        ) : (
          <>
            <h1> {post.title}</h1>
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
      <div className="comments">
        {/* {comments ? comments[0].author : ""} */}
        <ListComments comments={comments} post={post} />
      </div>
    </Fragment>
  );
};
