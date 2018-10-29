import React from 'react';

const EventCard = ({ name, date, location, image }) => {
  return (
    <div className="card">

      <header className="card-header">
        {/* name of the event */}
        <h2 className="card-header-title">{date}</h2>
      </header>
      {/* image of the event */}
      <div className="card-image">
        <figure className="image">
          <img src={image} alt={name} />
        </figure>
      </div>
      <div className="card-content">
        {/* name */}
        <p><strong> {name} </strong></p>
      </div>
      <div className="card-content">
        {/* location */}
        <p><strong>location:</strong> {location} </p>
      </div>
    </div>
  );
};

export default EventCard;
