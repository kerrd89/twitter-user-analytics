import React, { Component } from 'react';

class Header extends Component {
  constructor() {
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
    return (
        <header>
          <input type="text" onChange={(e)=>this.setState({ "input": e.target.value })}/>
          <button onClick={()=>this.changeUsername()}>Submit</button>
        </header>
    );
  }
}

export default Header
