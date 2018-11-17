import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import sinon from 'sinon';

import Home from "./components/home"

import { shallow } from 'enzyme';


describe("test",()=>{
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it("have create file button", ()=>{
    const home = shallow(<Home />)
    expect(home.find("button").length).toEqual(1);

  });
  it("have create file button", ()=>{
    const onButtonClick = sinon.spy();
    const home = shallow(<Home />)
    const result = home.find("button").simulate('submit')
    expect(result).toEqual(1);
    //still not working now
  });
});




