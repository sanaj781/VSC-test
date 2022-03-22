import React, { useState } from "react";
import axios from "axios";
const API_ADD_POST = "https://jsonplaceholder.typicode.com/posts";
const NewPost = () => {
  const [title, setTitle] = useState();
  const [body, setBody] = useState();
  const [error, setError] = useState();
  const [modalClass, setModalClass] = useState("modal");
  const [modalMessage, setModalMessage] = useState("");

  const handleAddPost = (event) => {
    event.preventDefault();
    const postObject = { title: title, body: body };
    if (title && body) {
      axios({
        method: "POST",
        url: API_ADD_POST,
        data: postObject,
      })
        .then((result) => {
          console.log(result.data);
          setModalClass("modal d-flex");
          setModalMessage("Dodano nowy wpis!");
        })
        .catch((error) => setError(error.message));
    } else {
      setModalClass("modal d-flex");
      setModalMessage("Wpisz poprawny tytul lub tresc wiadomosci!");
    }
  };
  const handleModalChange = () => {
    setModalClass("modal");
  };
  if (error) console.log(error);
  return (
    <React.Fragment>
      <div className={modalClass}>
        {/* Modal content */}
        <div className="modal-content">
          {modalMessage}

          <button
            onClick={handleModalChange}
            className="btn btn-success btn-lg"
          >
            OK
          </button>
        </div>
      </div>
      <form>
        <h3 className="text-center my-5">Dodaj nowy wpis</h3>
        <div className="mb-3">
          <div className="form-floating">
            <textarea
              onChange={(e) => setTitle(e.target.value)}
              className="form-control "
              id="title"
            ></textarea>
            <label htmlFor="title">Tytul wpisu</label>
          </div>
        </div>

        <div className="mb-3">
          <div className="form-floating">
            <textarea
              onChange={(e) => setBody(e.target.value)}
              className="form-control new-post "
              id="title"
            ></textarea>
            <label htmlFor="title">Tresc wiadomosci</label>
          </div>
        </div>

        <div className="d-grid gap-2">
          <button
            onClick={handleAddPost}
            type="submit"
            className="btn btn-primary"
          >
            Submit
          </button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default NewPost;
