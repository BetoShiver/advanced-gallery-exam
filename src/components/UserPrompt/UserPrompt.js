import React from 'react';
import Modal from 'react-modal';
import './UserPrompt.scss';

export default class UserPrompt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user
    };
  }

  setUser(e) {
    e.preventDefault()
    this.props.setUser(this.state.user)
  }

  render() {
    return (
      <Modal
        isOpen={this.props.showSetUser}
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
          {this.props.user === '' && <p>Hello, and welcome to the site!</p>}
          <p>Please enter you name below</p>
          <form onSubmit={(e) => this.setUser(e)}>
            <input
              type="text"
              onChange={(event) =>
                this.setState({
                  user: event.target.value
                })
              }
            />
            <input type="submit" value="Enter" className="submit" />
          </form>
          <br />
          <p className="disclaimer">
            {' '}
            * your name will not be sent to any database and will only be used
            to provide you a more personalized experience.
          </p>
        </div>
      </Modal>
    );
  }
}