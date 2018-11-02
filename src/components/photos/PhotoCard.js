import React from 'react';

const PhotoCard = ({ image, caption }) => {
  return (
    <div className="card thumbnailpic">
      <div className="card-content">
        <div className="card-image zoom-one">
          <figure className="image">
            <img src={image} alt={caption} />
          </figure>
        </div>
        <p> <small>{caption} </small></p>
      </div>
    </div>
  );
};

export default PhotoCard;
