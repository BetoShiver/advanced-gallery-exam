import React from 'react';
import './App.scss';
import Gallery from '../Gallery';
import Modal from 'react-modal';
import ChangeUser from '../ChangeUser';
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
  
  setUser(e) {
    e.preventDefault()
    window.localStorage.setItem('user', this.state.user)
    this.setState({
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
            openModal={() => this.setState({ showSetUser: true })}
            setUser={(user) => this.changeUser(user)}
          />
        </div>
        <Modal
          isOpen={this.state.showSetUser}
          appElement={document.getElementById('app')}
          style={{
            content: {
              margin: 'auto',
              width: '360px',
              height: '150px',
              backgroundColor: 'rgb(34, 51, 51)',
              color: 'white',
              display: 'flex',
              justifyContent: 'center'
            }
          }}
        >
          <div className="set-user">
            {this.state.user === '' && <p>Hello, and welcome to the site!</p>}
            <p>Please enter you name below</p>
            <form onSubmit={(e) => this.setUser(e)}>
              <input
                type="text"
                onChange={(event) =>
                  this.setState({ user: event.target.value })
                }
              />
              <input type="submit" value="Enter" className="submit" />
            </form>
            <br />
            <p className="disclaimer">
              {' '}
              * your name will not be sent to any database and will only be
              used to provide you a more personalized experience.
            </p>
          </div>
        </Modal>
        <Gallery tag={this.state.tag} />
      </div>
    );
  }
}

export default App;
