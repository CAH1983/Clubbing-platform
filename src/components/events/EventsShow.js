import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Auth from '../../lib/Auth';
import CommentsForm from './CommentsForm';


class EventsShow extends React.Component {
  constructor() {
    super();
    this.state = {
      event: null,
      comment: {} };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    axios.get(`/api/events/${this.props.match.params.id}`)
      .then(res => this.setState({ event: res.data, user: res.data.user }));
  }

  handleChange(e) {
    const comment = { ...this.state.comment, [e.target.name]: e.target.value };
    this.setState({ comment });
  }

  handleSubmit(e) {
    e.preventDefault();
    const token = Auth.getToken();
    axios
      .post(`/api/events/${this.props.match.params.id}/comments`, this.state.comment, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => this.setState({ event: res.data, comment: {} }));    console.log(this.state.comment);
  }

  handleDelete() {
    const token = localStorage.getItem('token');
    axios.delete(`/api/events/${this.props.match.params.id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => this.props.history.push('/events'));
  }

  handleCommentDelete(comment) {
    const token = Auth.getToken();
    axios
      .delete(`/api/events/${this.props.match.params.id}/comments/${comment.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => this.setState({ event: res.data }));    console.log(this.state.comment);

  }

  // -------------------------- RENDER PART ------------------------------
  render() {
    if(!this.state.event) return null;
    return (
      <main>
        <section className="section">
          <div className="container">
            {/*  EVENT title */}
            <h1 className="title is-1">{this.state.event.name}</h1>

            <hr />

            {/* -------------------------------------------------------------- */}
            {/* image & username */}
            <div className="columns">

              <div className="column is-half">
                <img src={ this.state.event.image } alt={ this.state.event.name } height="200" />

                <p>posted by:</p>
                <p> <span> <img src={ this.state.user.image } height="50" width="50" /> </span>
                  <strong> { this.state.event.user.username } </strong></p>
              </div>


              {Auth.isAuthenticated() && Auth.getPayload().sub === this.state.event.user.id &&
              <div>
                <Link className="button" to={`/events/${this.state.event.id}/edit`}> Edit </Link>
                <button className="button is-danger" onClick={this.handleDelete}>Delete</button>
              </div>}

              <div className="column is-half event-info">
                <p> <strong> Date : </strong> { this.state.event.date } </p>
                <p> <strong> Location: </strong> { this.state.event.location } </p>
                <p> <strong> Genre: </strong> { this.state.event.genre } </p>
                <p> <strong> Price: </strong> $ { this.state.event.price }</p>
              </div>
            </div>

          </div>
        </section>
        {/* --------------------- comments -------------------------- */}
        <section>

          <CommentsForm
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
            comment={this.state.comment}
          />

          {this.state.event.comments.map(comment =>
            <article key={comment.id} className="media">
              <figure className="media-left">
                <p className="image is-64x64">
                  <img src="https://bulma.io/images/placeholders/128x128.png" />
                </p>
              </figure>
              <div className="media-content">
                <div className="content">
                  <p>
                    <span> <img src= { comment.user.image } /> </span> <strong>{ comment.user.username }</strong>
                    <small>31m</small>
                    <br />
                    { comment.content }
                  </p>
                </div>
              </div>
              <button onClick={() => this.handleCommentDelete(comment)} className="delete"></button>
            </article>
          )}
        </section>

      </main>

    );
  }
}

export default EventsShow;
