import React, { Component } from 'react';
import moment from 'moment';
import TwitterSvg from '../components/TwitterSvg';

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
          <p className="user-info-label">Handle: <span>{this.props.user.user.screen_name}</span></p>
          <p className="user-info-label">Name: <span>{this.props.user.user.name}</span></p>
          <p className="user-info-label">On Twitter Since: <span>{createdAt}</span></p>
        </ul>
      )
    }
    return (
        <header>
          {userInfo}  
          <input type="text" onChange={(e)=>this.setState({ "input": e.target.value })}/>
          <button onClick={()=>this.changeUsername()}>Submit</button>
          <TwitterSvg color="#00AAEC" width="60" height="50" />
        </header>
    );
  }
}

export default Header
