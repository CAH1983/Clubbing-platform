import React from 'react';
import axios from 'axios';
import PhotosForm from './PhotosForm';
import Auth from '../../lib/Auth';

class PhotosNew extends React.Component {
  constructor() {
    super();
    this.state = {photo: {}, errors: {} };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const photo = { ...this.state.photo, [e.target.name]: e.target.value };
    const errors = { ...this.state.errors, [e.target.name]: ''};
    this.setState({ photo, errors });
  }

  handleSubmit(e) {
    e.preventDefault();
    const token = Auth.getToken();
    axios
      .post('/api/photos', this.state.photo, {
        headers: {Authorization: `Bearer ${token}`}
      })
      .then(() => this.props.history.push('/photos'))
      .catch(err => this.setState({ errors: err.response.data.errors }));
  }

  render() {
    return (

      <main className="section">
        <div className="container">

          <h1 className="photo-form title is-2"> Post your photo </h1>
          <PhotosForm
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
            photo={this.state.photo}
            errors={this.state.errors}
          />

        </div>
      </main>

    );
  }
}

export default PhotosNew;
