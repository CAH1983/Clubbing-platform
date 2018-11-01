import React from 'react';
import axios from 'axios';
import EventsForm from './EventsForm';
import Auth from '../../lib/Auth';

class EventsNew extends React.Component {
  constructor() {
    super();
    this.state = {event: {}, errors: {} };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const event = { ...this.state.event, [e.target.name]: e.target.value };
    const errors = { ...this.state.errors, [e.target.name]: ''};
    this.setState({ event, errors });
  }

  handleSubmit(e) {
    e.preventDefault();
    const token = Auth.getToken();
    axios
      .post('/api/events', this.state.event, {
        headers: {Authorization: `Bearer ${token}`}
      })
      .then(() => this.props.history.push('/events'))
      .catch(err => this.setState({ errors: err.response.data.errors }));
  }

  render() {
    return (

      <main className="section">
        <div className="container">

          <h1 className="event-form title is-2"> Post your event </h1>
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

export default EventsNew;
