require('react');
requier('react-dom')
// import ReactDOM from 'react-dom';
var App = require('./App');

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
