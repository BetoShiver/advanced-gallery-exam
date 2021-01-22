import React, { Component } from 'react'
import './ChangeUser.scss'
export default class ChangeUser extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let user = window.localStorage.getItem('user');
    if (user !== '') {
      this.props.setUser(user)
    }
    }
    
  render() {
    return (
      <p className="changeUser">
        Not {this.props.user}?
        <span onClick={() => this.props.openModal()}>Click here</span>{' '}
      </p>
    );
  }
}
