import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { EditPost } from "./EditPost";

export const SinglePost = () => {
  const [post, setPost] = useState({});
  const [edit, setEdit] = useState(false);
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

  const timeConvert = (time) => {
    const dates = new Date(time).toLocaleString();
    return dates;
  };
  useEffect(() => {
    getSinglePost(postId);
  }, []);

  return (
    <Fragment>
      <div className="card">
        <h1>{post.title}</h1>
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
              <button onClick={() => setEdit(!edit)}>Cancel</button>
            </>
          ) : (
            <button onClick={() => setEdit(!edit)}>Edit Post</button>
          )}
        </div>
      </div>
    </Fragment>
  );
};
