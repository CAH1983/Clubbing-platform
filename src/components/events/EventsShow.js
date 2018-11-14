import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Auth from '../../lib/Auth';
import CommentsForm from './CommentsForm';
import PhotoCard from '../photos/PhotoCard';
import moment from 'moment';
import PhotosForm from '../photos/PhotosForm';


class EventsShow extends React.Component {
  constructor() {
    super();
    this.state = {
      event: null,
      comment: {},
      photo: {},
      errors: {}
    };

    this.handleDelete = this.handleDelete.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.handlePhotoChange = this.handlePhotoChange.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    this.handlePhotoSubmit = this.handlePhotoSubmit.bind(this);
    this.handleAttend = this.handleAttend.bind(this);
  }

  // funtion display the page

  showEventPage() {
    axios.get(`/api/events/${this.props.match.params.id}`)
      .then(res => this.setState({ event: res.data }));
  }

  // ----- Component did mount ----
  componentDidMount() {
    this.showEventPage();
  }


  // ---- Handle comment and photo functions ---
  handleCommentChange(e) {
    const comment = { ...this.state.comment, [e.target.name]: e.target.value };
    this.setState({ comment });
  }
  handlePhotoChange(e) {
    const photo = { ...this.state.photo, [e.target.name]: e.target.value };
    this.setState({ photo });
  }


  // ---- Submit comment and photo functions ---
  handleCommentSubmit(e) {
    e.preventDefault();
    const token = Auth.getToken();
    axios
      .post(`/api/events/${this.props.match.params.id}/comments`, this.state.comment, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        const comments = this.state.event.comments.concat(res.data);
        const event = { ...this.state.event, comments };
        this.setState({ event, comment: {} });
      });
  }

  handlePhotoSubmit(e) {
    e.preventDefault();
    const token = Auth.getToken();
    axios
      .post(`/api/events/${this.props.match.params.id}/photos`, this.state.photo, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        const photos = this.state.event.photos.concat(res.data);
        const event = { ...this.state.event, photos };
        this.setState({ event, photo: {} });
      });
  }

  // ----- Delete comment and photo functions -----
  handleDelete() {
    const token = localStorage.getItem('token');
    axios.delete(`/api/events/${this.props.match.params.id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() =>  this.showEventPage());
  }

  handleCommentDelete(comment) {
    const token = Auth.getToken();
    axios
      .delete(`/api/events/${this.props.match.params.id}/comments/${comment.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() =>  this.showEventPage());
  }

  handlePhotoDelete(photo) {
    const token = Auth.getToken();
    axios
      .delete(`/api/events/${this.props.match.params.id}/photos/${photo.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() =>  this.showEventPage());
  }


  handleAttend() {
    const token = Auth.getToken();
    axios.post(`/api/events/${this.props.match.params.id}/attend`, null, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => this.setState({ event: res.data }));
  }

  // ======================== RENDER PART =============================
  render() {
    console.log(this.state);
    if(!this.state.event) return null;
    return (
      <main>
        <section className="section">
          <div className="container">
            {/*  EVENT title */}
            <h1 className="title is-1">{this.state.event.name}</h1>

            <hr />

            {/* -------------------------right column -------------------------- */}
            {/* *** image & username *** */}
            <div className="columns">

              <div className="column is-half">

                <img src={ this.state.event.image } alt={ this.state.event.name } height="200" />

              </div>

              <div className="column is-half event-info">
                <div className="block-info">
                  <p>posted by:</p>

                  <Link to={`/profile/${this.state.event.user.id}`}>
                    <img className="avatar" src={ this.state.event.user.image } height="50" width="50" />

                    <strong>{ this.state.event.user.username }</strong>

                  </Link>

                  {/* *** events infos *** */}
                  <div className="small-events-infos">
                    <p> Date: {moment(this.state.event.date).format('DD MMM YY') } </p>
                    <p>Location: { this.state.event.location } </p>
                    <p>Genre: { this.state.event.genre } </p>
                    <p>Price: $ { this.state.event.price }</p>
                  </div>
                </div>

                {/* ---------- delete, edit buttons ----------- */}
                {Auth.isAuthenticated() && Auth.getPayload().sub === this.state.event.user.id &&
                <div>
                  <Link className="button" to={`/events/${this.state.event.id }/edit`}> Edit </Link>
                  <button className="button is-danger" onClick={this.handleDelete}>Delete</button>
                </div>}

                {/* ------------ attend button ------------ */}
                {Auth.isAuthenticated() &&
                <button className="button is-warning" onClick={this.handleAttend}> ATTEND </button>}

                {/* ----------- populates attendees ------------- */}
                <div className="padding50">
                  <h1 className="subtitle"> Members attending </h1>
                  <div>
                    <ul className="columns box-attendees">
                      {this.state.event.attendees.map(attendee =>
                        <Link key={attendee.id} to={`/profile/${attendee.id}`}>
                          <figure className="avatar">
                            <img className="avatar" src={attendee.image}/>
                          </figure>
                        </Link>
                      )}
                    </ul>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>
        {/*========================= comments =======================*/}
        <section>
          <div className="container">
            <hr />
            <CommentsForm
              handleSubmit={this.handleCommentSubmit}
              handleChange={this.handleCommentChange}
              comment={this.state.comment}
            />

            {this.state.event.comments.map(comment =>
              <article key={comment.id} className="media">
                <figure className="media-left">
                  <p>
                    <img className="avatar" src= { comment.user.image } />
                  </p>
                </figure>

                <div className="media-content">
                  <div className="content">
                    <p>
                      <small>{ comment.user.username }</small>
                      <small>  __ { moment(comment.created_at).format('d MMM YY') }</small>
                      <br />
                      { comment.content }
                    </p>
                  </div>
                </div>

                <button onClick={() => this.handleCommentDelete(comment)} className="delete"></button>
              </article>
            )}
          </div>
        </section>

        {/*====================== photos ======================*/}

        <section className="section postyoupics">
          <div className="container">

            <h1> Photos of the event </h1>

            <PhotosForm
              handleSubmit={this.handlePhotoSubmit}
              handleChange={this.handlePhotoChange}
              photo={this.state.photo}
              errors={this.state.errors}
            />

            <ul className="columns is-multiline">
              {this.state.event.photos.map(photo =>
                <li className="column is-one-fifth-desktop is-one-third-tablet" key={photo.id}
                >
                  <button onClick={() => this.handlePhotoDelete(photo)} className="delete"></button>
                  {/* <Link to={`/events/${event.id}/photo/${photo.id}`}> */}
                  <PhotoCard
                    {...photo}
                  />
                  {/* </Link> */}
                </li>
              )}
            </ul>


          </div>
        </section>
      </main>

    );
  }
}

export default EventsShow;
