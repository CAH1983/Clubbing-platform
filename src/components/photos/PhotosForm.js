import React from 'react';

const PhotosForm = ({ handleSubmit, handleChange, photo, errors }) => {
  return (
    <main className="section">
      <div className="container">
        <h1> Post your pics </h1>

        <form onSubmit={handleSubmit}>

          {/* ------------- IMAGE box ------------ */}
          <div className="field">
            <label className="label">Image</label>
            <div className="control">
              <input
                className={`input ${errors.image ? 'is-danger' : ''}`}
                name="image"
                placeholder="Image"
                onChange={handleChange}
                value={photo.image || ''}
              />
              {errors.image && <small className="help is-danger">{errors.image}</small>}
            </div>
          </div>

          {/* ------------- CAPTION ------------ */}

          <div className="field">
            <label className="label"> Caption </label>
            <div className="control">
              <input
                className={`input ${errors.caption} ? 'is-danger : ''`}
                name="caption"
                placeholder="caption"
                onChange={handleChange}
                value={photo.caption || ''}
              />
            </div>
          </div>

          {/* ------------- SUBMIT ---------------- */}

          <button className="button is-primary">Submit</button>
        </form>

      </div>
    </main>
  );
};

export default PhotosForm;
