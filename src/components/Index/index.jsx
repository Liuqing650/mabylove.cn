import React from 'react';
import ReactDOM from 'react-dom';
import { scrollScreen } from 'rc-scroll-anim';
import Content0 from './Content0';
import Content1 from './Content1';
import Content2 from './Content2';
import Content3 from './Content3';
import Footer from './Footer';
import Point from './Point';
import './less/antMotion_style.less';

class Home extends React.Component {
  componentDidMount() {
    const list = ReactDOM.findDOMNode(this.refs.list);
    const listHeight = list.getBoundingClientRect().height;
    list.style.marginTop = ` -${listHeight / 2}px`;
  }
  render() {
    const children = [
      <Content0 id="Content0" key="Content0"/>,
      <Content1 id="Content1" key="Content1"/>,
      <Content2 id="Content2" key="Content2"/>,
      <Content3 id="Content3" style={{overflow: 'hidden'}} key="Content3"/>,
      <Point key="list" ref="list" data={['Content0', 'Content1', 'Content2', 'Content3' ]} />,
    ];
    return (
      <div className="templates-wrapper">
        {children}
      </div>
    );
  }
}

export default Home