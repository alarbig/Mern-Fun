// use this to decode a token and get the user's information out of it
import decode from 'jwt-decode';

// create a new class to instantiate for a user
class AuthService {
  getProfileId() {
    return decode(this.getToken())._id;
  }

  // retrieve data saved in token
  getProfile() {
    return decode(this.getToken());
  }

  // check if the user's token is still valid
  loggedIn() {
    // check if there is a saved token and it's still valid
    const token = this.getToken(); // GETTING TOKEN FROM LOCAL STORAGE
    return !!token && !this.isTokenExpired(token); // handwaiving here
  }

  // check if the token has expired
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        // Checking if token is expired. N
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  // retrieve token from localStorage
  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token');
  }

  // set token to localStorage and reload page to homepage
  login(idToken) {
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken);

    window.location.assign('/');
  }

  // clear token from localStorage and force logout with reload
  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
    // this will reload the page and reset the state of the application
    window.location.assign('/');
  }
}

export default new AuthService();
