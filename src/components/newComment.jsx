import React from "react";

const NewComment = (props) => {
  const {
    usernameValue,
    titleValue,
    bodyValue,
    setUsername,
    setTitle,
    setBody,
  } = props;
  return (
    <React.Fragment>
      <form className="my-5">
        <div className="mb-3">
          <div className="form-floating">
            <textarea
              value={usernameValue}
              onChange={setUsername}
              className="form-control "
              id="username"
            ></textarea>
            <label htmlFor="username">Uzytkownik</label>
          </div>
        </div>
        <div className="mb-3">
          <div className="form-floating">
            <textarea
              value={titleValue}
              onChange={setTitle}
              className="form-control "
              id="title"
            ></textarea>
            <label htmlFor="title">Tytul</label>
          </div>
        </div>
        <div className="mb-3">
          <div className="form-floating">
            <textarea
              value={bodyValue}
              onChange={setBody}
              className="form-control comment-input"
              id="comment"
            ></textarea>
            <label htmlFor="comment">Komentarz</label>
          </div>
        </div>
        <div className="d-grid gap-2">
          <button
            onClick={props.handleAddComment}
            type="submit"
            className="btn btn-primary"
          >
            Wyslij komentarz
          </button>
        </div>
      </form>
    </React.Fragment>
  );
};

export default NewComment;
