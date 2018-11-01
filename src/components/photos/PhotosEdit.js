import React from 'react';
import axios from 'axios';

import PhotosForm from './PhotosForm';

import Auth from '../../lib/Auth';


class PhotosEdit extends React.Component {
  constructor() {
    super();
    this.state = { photo: null };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axios.get(`/api/photos/${this.props.match.params.id}`)
      .then(res => this.setState({ photo: res.data }));
  }

  handleChange(e) {
    const photo = { ...this.state.photo, [e.target.name]: e.target.value };
    this.setState({ photo });
  }

  handleSubmit(e) {
    e.preventDefault();
    const token = Auth.getToken();
    axios
      .put(`/api/photos/${this.props.match.params.id}`, this.state.photo, {
        headers: { Authorization: `Bearer ${token}`}
      })
      .then(() => this.props.history.push(`/photos/${this.props.match.params.id}`));
  }

  render() {

    if(!this.state.photo) return null;

    return (
      <main className="section">
        <div className="container">

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

export default PhotosEdit;
