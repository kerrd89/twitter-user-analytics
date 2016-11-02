import React, { Component } from 'react';
import moment from 'moment';

class Header extends Component {
  constructor(props) {
    super();
    this.state = {
      input: ''
    };
  }

  changeUsername() {
    this.props.changeUsername(this.state.input);
  }

  render() {
    let input;
    let userInfo;
    if(this.props.user !== undefined) {
      let createdAt = moment(this.props.user.user.created_at).format('LL');
      userInfo = (
        <ul>
          <p>Handle: {this.props.user.user.screen_name}</p>
          <p>Name: {this.props.user.user.name}</p>
          <p>On Twitter since: {createdAt}</p>
        </ul>
      )
    }
    return (
        <header>
          {userInfo}
          <input type="text" onChange={(e)=>this.setState({ "input": e.target.value })}/>
          <button onClick={()=>this.changeUsername()}>Submit</button>
        </header>
    );
  }
}

export default Header
