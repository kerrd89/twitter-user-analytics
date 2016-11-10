var react = require('react');
var ReactDOM = require('react-dom');
var App = require('./App');

it('renders without crashing', () => {
  var div = document.createElement('div');
  ReactDOM.render(<App />, div)
});

// describe('Application', () => {
//
//  context('shallow tests', () => {
//    const wrapper = shallow(<App />);
//
//    it('renders as a <div>', () => {
//      assert.equal(wrapper.type(), 'div');
//    });
//  });
// });
