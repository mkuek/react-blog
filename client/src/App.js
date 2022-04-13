import React, { Fragment, useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Routes,
  useParams,
  Navigate,
} from "react-router-dom";
import "./App.css";
import { ListPosts } from "./components/ListPosts";
import { Navbar } from "./components/NavBar";
import { SinglePost } from "./components/SinglePost";
import SingleComment from "./components/SingleComment";
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<ListPosts />} />
          <Route exact path="/posts/:postId" element={<SinglePost />} />
          <Route
            exact
            path="/posts/:postId/comments"
            element={<SingleComment />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
