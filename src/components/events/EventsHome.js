import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import EventCard from './EventCard';


class EventsHome extends React.Component {
  constructor() {
    super();
    this.state = { events: []};
  }

  componentDidMount() {
    axios
      .get('/api/events')
      .then(res => this.setState({ events: res.data}));
  }

  render() {
    return (

      <main>
        <section>
          <div className="hero">
            {/* ------------------  Hero -------------------- */}
            <img src="/assets/images/ushuaia.jpg" alt="Clubbing Messe"/>
            <br />
          </div>
        </section>

        {/* ------------------- index of Clubbing Events ------------ */}

        <section>
          <h1 className="homepage title">  Agenda </h1>
          <ul className="columns is-multiline events-index">
            {this.state.events.map(event =>
              <li
                className="column is-one-quarter-desktop is-one-third-tablet" key={event.id}
              >
                <Link to={`/events/${event.id}`}>
                  <EventCard {...event} />
                </Link>
              </li>
            )}
          </ul>
        </section>
      </main>
    );
  }
}

export default EventsHome;
