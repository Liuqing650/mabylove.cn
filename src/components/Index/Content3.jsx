import React from 'react';
import PropTypes from 'prop-types';
import TweenOne, { TweenOneGroup } from 'rc-tween-one';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import webUrl from '../../utils/webResUrl';

class Content extends React.Component {

  static propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
  };

  static defaultProps = {
    className: 'content4',
  };

  getChildrenToRender = data =>
    data.map((item, i) => {
      const children = item.children;
      return (<li
        key={i}
        style={item.style}
      >
        <div className="content-wrapper" style={children.wrapper && children.wrapper.style}>
            <span style={children.img.style}>
              <a href={children.href}>
                <img src={children.img.children} height="100%" />
              </a>
            </span>
          <p style={children.content.style}>
            {children.content.children}
          </p>
        </div>
      </li>);
    });

  getEnterAnim = (e) => {
    const index = e.index;
    const delay = index % 4 * 100 + Math.floor(index / 4) * 100 + 300;
    return { y: '+=30', opacity: 0, type: 'from', delay };
  };
  render() {
    const dataArray = [
      { children: { img: { children: webUrl.homeIcon.one.md }, content: { children: '成长经历' },href: webUrl.homeIcon.one.md} },
      { children: { img: { children: webUrl.homeIcon.two.md }, content: { children: '作品展示' }, href:'#/showProject'} },
      { children: { img: { children: webUrl.homeIcon.three.md } ,content: { children: '幸福广场' },href:'#/blog' } },
      { children: { img: { children: webUrl.homeIcon.four.md } ,content: { children: '个人简历' },href: webUrl.homeIcon.four.md } },
      { children: { img: { children: webUrl.homeIcon.five.md } ,content: { children: '技术分享' },href: webUrl.homeIcon.five.md } },
      { children: { img: { children: webUrl.homeIcon.six.md } ,content: { children: '动手实战' }, href:'#/practice' } },
      
      // { children: { img: { children: 'http://localhost:8989/src/assets/web/application/growup500.png' }, content: { children: '成长经历' },href: 'http://localhost:8989/src/assets/web/application/growup500.png'} },
      // { children: { img: { children: 'http://localhost:8989/src/assets/web/application/displayproduct500.png' }, content: { children: '作品展示' }, href:'http://localhost:8989/src/assets/web/application/displayproduct500.png'} },
      // { children: { img: { children: 'http://localhost:8989/src/assets/web/application/platform500.png' } ,content: { children: '幸福广场' },href:'http://localhost:8989/src/assets/web/application/platform500.png' } },
      // { children: { img: { children: 'http://localhost:8989/src/assets/web/application/ourself300.png' } ,content: { children: '个人管理' },href: 'http://localhost:8989/src/assets/web/application/ourself300.png' } },
      // { children: { img: { children: 'http://localhost:8989/src/assets/web/application/technologyshare500.png' } ,content: { children: '技术分享' },href:'http://localhost:8989/src/assets/web/application/technologyshare500.png' } },
      // { children: { img: { children: 'http://localhost:8989/src/assets/web/application/diyweb500.png' } ,content: { children: '动手实战' }, href:'#/practice' } },
    ];
    const childrenToRender = this.getChildrenToRender(dataArray);
    return (
      <div
        {...this.props}
        className="content-template-wrapper content4-wrapper"
      >
        <OverPack
          className={`content-template ${this.props.className}`}
          location={this.props.id}
        >
          <TweenOne
            animation={{ y: '+=30', opacity: 0, type: 'from' }}
            component="h1"
            key="h1"
            reverseDelay={300}
          >
            应用广场
          </TweenOne>
          <TweenOne
            animation={{ y: '+=30', opacity: 0, type: 'from', delay: 200 }}
            component="p"
            key="p"
            reverseDelay={200}
          >
            这里我打算存放一些运用。
          </TweenOne>
          <TweenOneGroup
            className={`${this.props.className}-img-wrapper`}
            component="ul"
            key="ul"
            enter={this.getEnterAnim}
            leave={{ y: '+=30', opacity: 0 }}
          >
            {childrenToRender}
          </TweenOneGroup>
        </OverPack>
      </div>
    );
  }
}


export default Content;
