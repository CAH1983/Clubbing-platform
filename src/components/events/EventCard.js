import React from 'react';
import moment from 'moment';

const EventCard = ({ name, date, location, image }) => {
  return (
    <div className="card">

      <header className="card-header">
        {/* name of the event */}
        <h2 className="card-header-title">{ moment(date).format('do MMM YY') }</h2>
      </header>
      {/* image of the event */}
      <div className="card-image">
        <figure className="image">
          <img src={image} alt={name} />
        </figure>
      </div>
      <div className="card-content">
        {/* name */}
        <p className="uppercase"><strong> {name} </strong></p>
        <p> {location} </p>
      </div>
    </div>
  );
};

export default EventCard;
