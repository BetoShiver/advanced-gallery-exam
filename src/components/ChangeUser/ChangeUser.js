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
     
  openModal() {
    this.props.openModal()
  }

  render() {
    return (
      <p className="change-user">
        Not {this.props.user}?
        <span onClick={() => this.openModal()}>Click here</span>
      </p>
    );
  }
}
