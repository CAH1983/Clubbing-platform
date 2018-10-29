import React from 'react';

const CommentsForm = ({ handleSubmit, handleChange, comment }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label className="label"> Comment </label>
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
  );
};

export default CommentsForm;
