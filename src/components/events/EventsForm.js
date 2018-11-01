import React from 'react';

const EventsForm = ({ handleSubmit, handleChange, event, errors }) => {
  return (
    <main className="section">
      <div className="container">

        <form onSubmit={handleSubmit}>
          {/* ----------- NAME box ---------- */}
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input
                className={`input ${errors.image ? 'is-danger' : ''}`}
                name="name"
                placeholder="Name"
                onChange={handleChange}
                value={event.name || ''}
              />
              {errors.name && <small className="help is-danger">{errors.name}</small>}
            </div>
          </div>

          {/* ------------- DATE box--------------------- */}
          <div className="field">
            <label className="label"> Date </label>
            <div className="control">
              <input type="date"
                name="date"
                placeholder="Select date"
                onChange={handleChange}
                value={event.date || ''}
              />
              {errors.date && <small className="help is-danger">{errors.date}</small>}
            </div>
          </div>

          {/* ------------- IMAGE box ------------ */}
          <div className="field">
            <label className="label">Image</label>
            <div className="control">
              <input
                className={`input ${errors.image ? 'is-danger' : ''}`}
                name="image"
                placeholder="Image"
                onChange={handleChange}
                value={event.image || ''}
              />
              {errors.image && <small className="help is-danger">{errors.image}</small>}
            </div>
          </div>

          {/* --------------- LOCATION ----------------- */}
          <div className="field">
            <label className="label"> Location </label>
            <div className="control">
              <input
                className={`input ${errors.location} ? 'is-danger : ''`}
                name="location"
                placeholder="Location"
                onChange={handleChange}
                value={event.location || ''}
              />
              {errors.location && <small className="help is-danger">{errors.location}</small>}
            </div>
          </div>

          {/* --------------- GENRE ----------------- */}
          <div className="field">
            <label className="label"> Genre </label>
            <div className="control">
              <input
                className={`input ${errors.genre} ? 'is-danger : ''`}
                name="genre"
                placeholder="What type of bass are you gonna drop?"
                onChange={handleChange}
                value={event.genre || ''}
              />
            </div>
          </div>

          {/* --------------- PRICE ----------------- */}
          <div className="field">
            <label className="label"> Price </label>
            <div className="control">
              <input
                className={`input ${errors.price ? 'is-danger' : ''}`}
                name="price"
                placeholder="How much? Think about our poor purse!"
                onChange={handleChange}
                value={event.price || ''}
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

export default EventsForm;
