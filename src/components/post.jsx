import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import NewComment from "./newComment";

const Post = (props) => {
  const [username, setUsername] = useState();
  const [title, setTitle] = useState();
  const [body, setBody] = useState();
  const params = useParams();
  const API_POST = `https://jsonplaceholder.typicode.com/posts/${params.id}`;
  const API_COMMENTS = `https://jsonplaceholder.typicode.com/posts/${params.id}/comments`;

  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [errors, setErrors] = useState();

  useEffect(
    () => {
      const controller = new AbortController();
      const signal = controller.signal;
      let isApiSubscribed = true;

      axios({
        method: "GET",
        url: API_POST,
        signal: signal,
      })
        .then((res) => {
          if (isApiSubscribed) {
            setPost(res.data);
          }
        })
        .catch((error) =>
          signal.aborted
            ? console.log("successfully aborted")
            : setErrors(error.message)
        );
      //getting a comments
      axios({
        method: "GET",
        url: API_COMMENTS,
        signal: signal,
      })
        .then((res) => {
          if (isApiSubscribed) {
            setComments(res.data);
          }
        })
        .catch((error) =>
          signal.aborted
            ? console.log("successfully aborted")
            : setErrors(error.message)
        );
      return () => {
        isApiSubscribed = false;
        controller.abort();
      };
    },
    [
      // comments.length
    ]
  );

  const addComment = (event) => {
    event.preventDefault();
    const newCommentPost = { name: title, email: username, body: body };
    if (title && username && body) {
      axios({
        method: "POST",
        url: API_COMMENTS,
        data: newCommentPost,
      })
        .then((result) => {
          const newComment = result.data;
          setComments([...comments, newComment]);
          setUsername("");
          setTitle("");
          setBody("");
        })
        .catch((error) =>
          this.setState({
            error: error.message,
          })
        );
    } else {
      alert("Wpisz poprawna nazwe uzytkownika/tytul/tresc");
    }
  };
  if (errors) console.log(errors);
  return (
    <div className="col-12">
      <div className="my-5 post-wrapper">
        <h3 className="text-uppercase text-center"> {post.title}</h3>
        <div className="text-start post-body"> {post.body}</div>
      </div>
      <p className="text-center my-3 fs-5">Komentarze:</p>
      {comments.map((comment) => (
        <div key={comment.id} className="comment my-3 p-4">
          <div className="user-name">{comment.email}:</div>

          <div className="post-title">{comment.name}</div>
          <div> {comment.body}</div>
        </div>
      ))}
      <div className="text-center fs-3 my-5">Dodaj nowy komentarz</div>
      <NewComment
        postId={params}
        usernameValue={username}
        titleValue={title}
        bodyValue={body}
        handleAddComment={addComment}
        setTitle={(e) => setTitle(e.target.value)}
        setUsername={(e) => setUsername(e.target.value)}
        setBody={(e) => setBody(e.target.value)}
      />
    </div>
  );
};

export default Post;
