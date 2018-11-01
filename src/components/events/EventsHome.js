import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import EventCard from './EventCard';
import moment from 'moment';


class EventsHome extends React.Component {
  constructor() {
    super();
    this.state = { pastEvents: [], futureEvents: [] };
  }

  componentDidMount() {
    axios
      .get('/api/events')
      .then(res => {
        const now = moment().format('YYYY-MM-DD');
        const pastEvents = res.data.filter(event => event.date < now);
        const futureEvents = res.data.filter(event => event.date > now);
        this.setState({ pastEvents, futureEvents });
      });
  }

  render() {
    return (

      <main>

        <section>
          <div className="hero">
            {/* ------------------  Hero -------------------- */}
            <p>
              <h1>Clubbing Messe</h1>
              Welcome to the clubbers parish
            </p>
          </div>
        </section>

        {/* ------------------- index of Clubbing Events ------------ */}

        <section className="homepage-upcoming">
          <div className="container">

            <h1> Upcoming Events </h1>
            <ul className="columns is-multiline events-index">
              {this.state.futureEvents.map(event =>
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


        <section className="section pasteventssection">
          <div className="container">

            <h1> Past Events / Photo reports </h1>
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

export default EventsHome;
