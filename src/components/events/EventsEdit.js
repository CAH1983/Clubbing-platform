import React from 'react';
import axios from 'axios';

import EventsForm from './EventsForm';

import Auth from '../../lib/Auth';

class EventsEdit extends React.Component {
  constructor() {
    super();
    this.state = { event: null, errors: {} };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axios.get(`/api/events/${this.props.match.params.id}`)
      .then(res => this.setState({ event: res.data }));
  }

  handleChange(e) {
    const event = { ...this.state.event, [e.target.name]: e.target.value };
    this.setState({ event });
  }

  handleSubmit(e) {
    e.preventDefault();
    const token = Auth.getToken();
    axios
      .put(`/api/events/${this.props.match.params.id}`, this.state.event, {
        headers: { Authorization: `Bearer ${token}`}
      })
      .then(() => this.props.history.push(`/events/${this.props.match.params.id}`))
      .catch(err => this.setState({ errors: err.response.data.errors }));
  }

  render() {

    if(!this.state.event) return null;

    return (
      <main className="section">
        <div className="container">

          <EventsForm
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
            event={this.state.event}
            errors={this.state.errors}
          />

        </div>
      </main>
    );
  }
}

export default EventsEdit;
