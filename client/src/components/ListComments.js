import React, { Fragment, useEffect, useState } from "react";
import { parseISO, formatDistanceToNow } from "date-fns";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ListComments = ({ comments, post }) => {
  //   const [comments, setComments] = useState({});

  const { postId } = useParams();

  //   useEffect(() => {
  //     getComments(postId);
  //     console.log(comments);
  //   }, [post]);
  const timeConvert = (time) => {
    const date = new Date(time).toISOString();
    const ISOconvert = parseISO(date);
    const formatted = formatDistanceToNow(ISOconvert);
    return formatted;
  };
  console.log("ListComponent");
  //   console.log(comments[0].author);
  //   const orderedComments = comments
  //     .slice()
  //     .sort((a, b) => b.created.localeCompare(a.created));

  //   const renderedComments = comments.map((comment, index) => {
  //     return (
  //       <div key={index} className="card">
  //         <div className="card-content">
  //           <h3>{comment.comment_text}</h3>
  //           <div>
  //             <i>{`Submitted ${timeConvert(comment.created)} ago by
  //                                 ${comment.author}`}</i>
  //           </div>
  //         </div>
  //       </div>
  //     );
  //   });
  return <div>{}</div>;
};

export default ListComments;
