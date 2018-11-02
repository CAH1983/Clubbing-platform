import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import EventCard from '../events/EventCard';
import Auth from '../../lib/Auth';


class Profile extends React.Component {
  constructor() {
    super();
    this.state = { user: null };
  }

  componentDidMount() {
    const token = Auth.getToken();
    axios.get(`/api/users/${this.props.match.params.id}`, {
      headers: {Authorization: `Bearer ${token}`}
    })
      .then(res => {
        console.log(res.data);
        this.setState({ user: res.data });
      });

  }

  // =================================================================================
  render() {
    if(!this.state.user) return null;
    return(
      <main className="section">
        <div className="container">

          {/* -------------- left side ------------- */}
          <div className="tile is-ancestor">
            <div className="tile is-vertical is-8">
              <div className="tile">
                <div className="tile is-parent is-vertical">

                  {/* ~~~ top tile ~~~ */}
                  <article className="tile is-child notification is-primary">
                    <p className="title"> { this.state.user.username } </p>
                    {/* --------- user's pic------ */}
                    <figure className="image is-4by3">
                      <img src={ this.state.user.image }/>
                    </figure>
                  </article>

                  <article className="tile is-child notification is-warning">
                    <p>
                      <strong> email </strong> : { this.state.user.email }
                    </p>
                  </article>
                  <hr />
                  {/* {Auth.isAuthenticated() && Auth.getPayload().sub === this.state.user.id &&
                  <div>
                    <Link className="button"
                      to={`/profile/${this.state.user.id}/edit`}>Edit</Link>
                  </div>} */}

                </div>

                {/* -------------- right side ------------- */}
                <div className="tile is-parent">
                  <article className="tile is-child notification event-posted">
                    <p className="title"> Events posted </p>
                    <ul className="columns is-multiline products-index">
                      {this.state.user.events.map(event =>
                        <li key={event.id}
                        >
                          <Link to={`/events/${event.id}`}>
                            <EventCard {...event} />
                          </Link>
                        </li>
                      )}
                    </ul>
                  </article>
                </div>
              </div>

              {/* ----------- attending events ---------- */}
              <div className="tile is-parent">
                <article className="tile is-child notification attending-events">
                  <p className="title"> attending events </p>
                  <p className="subtitle"> xxxx </p>
                  <div className="content">
                    {/* <!-- Content --> */}
                  </div>
                </article>
              </div>
            </div>
          </div>

        </div>
      </main>
    );
  }
}


export default Profile;
