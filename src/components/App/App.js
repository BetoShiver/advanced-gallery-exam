import React from 'react';
import './App.scss';
import Gallery from '../Gallery';
import ChangeUser from '../ChangeUser';
import UserPrompt from '../UserPrompt';

class App extends React.Component {
  static propTypes = {};

  constructor() {
    super();
    this.state = {
      tag: 'art',
      showSetUser: true,
      user: ''
    };
  }

  setUser(user) {
    window.localStorage.setItem('user', user);
    this.setState({
      user,
      showSetUser: false
    });
  }

  changeUser(user) {
    if (user) {
      this.setState({
        user,
        showSetUser: false
      });
    }
  }

  closeModal() {
    this.setState({
      showSetUser: false
    });
  }

  openModal() {
    this.setState({
      showSetUser: true
    });
  }

  render() {
    return (
      <div className="app-root">
        <div className="app-header">
          <h2>Hello {this.state.user}</h2>
          <input
            className="app-input"
            onChange={(event) => this.setState({ tag: event.target.value })}
            value={this.state.tag}
          />
          <ChangeUser
            user={this.state.user}
            openModal={
             () => this.openModal()}
            setUser={(user) => this.changeUser(user)}
          />
        </div>
        <UserPrompt
          user={this.state.user}
          showSetUser={this.state.showSetUser}
          setUser={(user) => this.setUser(user)}
          setState={this.setState}
        ></UserPrompt>
        <Gallery tag={this.state.tag} />
      </div>
    );
  }
}

export default App;
