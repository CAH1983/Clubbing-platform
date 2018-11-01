import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Auth from '../lib/Auth';
import axios from 'axios';


class Navbar extends React.Component {

  constructor(props) {
    super(props);
    this.state = { navbarActive: false, user: null };
    this.logout = this.logout.bind(this);
    this.toggleNavbar = this.toggleNavbar.bind(this);
  }

  getCurrentUser() {
    const token = Auth.getToken();
    axios.get(`/api/users/${Auth.getPayload().sub}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
      .then(res => this.setState({ user: res.data }, () => console.log(this.state)));
  }

  componentDidMount() {
    if(Auth.isAuthenticated()) this.getCurrentUser();
  }


  componentDidUpdate(prevProps) {
    // close navbar if we change "page"
    if(prevProps.location.pathname !== this.props.location.pathname) this.setState({ navbarActive: false });

    // if the user is NOT logged in, but there IS a user being displayed, remove that user from state
    if(!Auth.isAuthenticated() && this.state.user) this.setState({ user: null });
    // if the user IS logged in, but NOT being displayed, get the user and set it to state
    if(Auth.isAuthenticated() && !this.state.user) this.getCurrentUser();
  }

  logout() {
    Auth.logout();
    this.props.history.push('/');
    //this.setState({ user: {} });
  }

  toggleNavbar() {
    this.setState({ navbarActive: !this.state.navbarActive });
  }

  // ====================================================================================
  render() {
    return (

      <nav className="navbar is-fixed-top" role="navigation">
        <div className="container">
          {/* ----------------------------------------------------------- */}
          <div className="navbar-brand">
            <Link className="navbar-item logo" to="/">
              <h1> <img className="CB-logo" src="/assets/images/clubbing-logo.png" alt= "Clubbing Messe" /> </h1>

            </Link>

            {/* ----------------- BURGER ------------------ */}
            <a role="button"
              className={`navbar-burger ${this.state.navbarActive ? 'is-active' : ''}`}
              data-target="navbar-menu"
              aria-label="menu"
              aria-expanded={this.state.navbarActive ? 'true' : 'false'}
              onClick={this.toggleNavbar}
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>

          <div className={`navbar-menu ${this.state.navbarActive ? 'is-active' : ''}`}>
            {/* ------------------ start ------------------- */}
            <div className="navbar-start">
              <Link className="navbar-item" to="/events"> Events </Link>
              {Auth.isAuthenticated() && <Link href="#" className="navbar-item" to="/events/new"> Post your event </Link>}
            </div>

            {/* -------------- end ----------------------- */}
            <div className="navbar-end">
              <Link className="navbar-item" to="/photos"> Photos </Link>
              {Auth.isAuthenticated() && <Link href="#" className="navbar-item" to="/photos/new"> Post your photos </Link>}

              {Auth.isAuthenticated() && this.state.user && <Link href="#" className="navbar-item nav-icon" to={`/profile/${Auth.getPayload().sub}`}>
                <strong>{this.state.user.username}</strong>
                <img className="avatar" src={this.state.user.image} />
              </Link>}

              {/* -------- login / logout ---- */}
              {!Auth.isAuthenticated() && <Link href="#" className="navbar-item" to="/login"> Login </Link>}
              {!Auth.isAuthenticated() && <Link href="#" className="navbar-item" to="/register"> Register</Link>}
              {Auth.isAuthenticated() && <a className="navbar-item" onClick={this.logout}>Logout</a>}
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default withRouter(Navbar);
