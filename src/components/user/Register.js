import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import Flash from '../../lib/Flash';

// --------------------------- FUNCTIONS ----------------------------
class Register extends React.Component {
  constructor() {
    super();
    this.state = { credentials: {}, errors: {} };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const credentials = { ...this.state.credentials, [e.target.name]: e.target.value };
    this.setState({ credentials, errors: {} }, () => console.log(this.state));
  }

  handleSubmit(e) {
    e.preventDefault();
    axios
      .post('/api/register', this.state.credentials)
      .then( res => {

        Auth.setToken(res.data.token);
        Flash.setMessage('success', 'Account created!');

      })
      .then(() => this.props.history.push('/'))
      .catch((err) => this.setState({ errors: err.response.data.errors }));
  }

  // -------------------------- RENDER PART --------------------------
  render() {
    return(

      <main className="section">
        <div className="container">

          {/* // ------------------------ FORM -------------------------- */}
          <div className="product-form">
            <h1 className="title is-2"> Join the best clubbers Community </h1>
            <form onSubmit={this.handleSubmit}>

              {/* ---------------- username box -------------- */}
              <div className="field">
                <label className="label">Username</label>
                <div className="control">
                  <input
                    className={`input ${this.state.errors.username ? 'is-danger' : ''}`}
                    name="username"
                    placeholder="Username"
                    onChange={this.handleChange}
                    value={this.state.credentials.username || ''}/>
                  {this.state.errors.username && <small className="help is-danger">{this.state.errors.username}</small>}
                </div>
              </div>

              {/* ------------------ email box ------------------ */}
              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input
                    className={`input ${this.state.errors.email ? 'is-danger' : ''}`}
                    name="email"
                    placeholder="Email"
                    onChange={this.handleChange}
                    value={this.state.credentials.email || ''}/>
                  {this.state.errors.email && <small className="help is-danger">{this.state.errors.email}</small>}
                </div>
              </div>


              {/* ------------------ upload profile picture --------------- */}

              <div className="field">
                <label className="label"> Profile pic </label>
                <div className="control">
                  <input
                    className={`input ${this.state.errors.image ? 'is-danger' : ''}`}
                    name="image"
                    placeholder="profile picture"
                    onChange={this.handleChange}
                    value={this.state.credentials.image || ''}
                  />
                  {this.state.errors.image && <small className="help is-danger">{this.state.errors.image}</small>}
                </div>
              </div>


              {/* ------------------- password box --------------------- */}
              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input
                    className={`input ${this.state.errors.password ? 'is-danger' : ''}`}
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={this.handleChange}
                    value={this.state.credentials.password || ''}/>
                </div>
                {this.state.errors.password && <small className="help is-danger">{this.state.errors.password}</small>}
              </div>

              {/* -------------------- pwd confirmation box --------------- */}
              <div className="field">
                <label className="label">Password Confirmation</label>
                <div className="control">
                  <input
                    className={`input ${this.state.errors.password_confirmation ? 'is-danger' : ''}`}
                    name="password_confirmation"
                    type="password"
                    placeholder="Password Confirmation"
                    onChange={this.handleChange}
                    value={this.state.credentials.password_confirmation || ''}/>
                </div>
                {this.state.errors.password_confirmation && <small className="help is-danger">{this.state.errors.password_confirmation}</small>}
              </div>

              {/* ------------------- submit button -------------------- */}
              <button className="button is-primary"> Submit </button>
            </form>
          </div>

        </div>
      </main>
    );
  }
}

export default Register;
