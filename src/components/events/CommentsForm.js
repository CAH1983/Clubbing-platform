import React from 'react';

const CommentsForm = ({ handleSubmit, handleChange, comment }) => {
  return (
    <main className="section">
      <div className="container">

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label className="label subtitle"> Comment </label>
            <div className="control">
              <input
                className="input"
                name="content"
                placeholder="comment"
                onChange={handleChange}
                value={comment.content || ''}
              />
            </div>
          </div>

          <button className="button is-primary">Submit</button>
        </form>

      </div>
    </main>
  );
};

export default CommentsForm;
