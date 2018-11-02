import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import EventCard from '../events/EventCard';
import moment from 'moment';


class PhotosIndex extends React.Component {
  constructor() {
    super();
    this.state = { pastEvents: []};
  }

  componentDidMount() {
    axios
      .get('/api/events')
      .then(res => {
        const now = moment().format('YYYY-MM-DD');
        const pastEvents = res.data.filter(event => event.date < now);
        this.setState({ pastEvents });
      });
  }

  render() {
    return (

      <main>

        <section className="section">
          <div className="container">

            <h1 className="title is-2"> Select an event</h1>
            <ul className="columns is-multiline events-index">
              {this.state.pastEvents.map(event =>
                <li
                  className="column is-one-quarter-desktop is-one-third-tablet" key={event.id}
                >
                  <Link to={`/events/${event.id}`}>
                    <EventCard {...event} />
                  </Link>
                </li>
              )}
            </ul>
          </div>

        </section>
      </main>
    );
  }
}

export default PhotosIndex;
