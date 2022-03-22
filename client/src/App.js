import React, { Fragment, useState } from "react";

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Routes,
  useParams,
} from "react-router-dom";
import "./App.css";
import { ListPosts } from "./components/ListPosts";
import { Navbar } from "./components/NavBar";
import { SinglePost } from "./components/SinglePost";
import { SubmitForm } from "./components/SubmitForm";
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                <SubmitForm />
                <ListPosts />
              </>
            }
          />
          <Route exact path="/posts/:postId" element={<SinglePost />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
