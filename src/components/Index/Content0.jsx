import React, { PropTypes } from 'react';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import {Button,Icon} from 'antd';
import BannerAnim, { Element } from 'rc-banner-anim';
import 'rc-banner-anim/assets/index.css';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import webUrl from '../../utils/webResUrl';

const BgElement = Element.BgElement;
class Banner extends React.Component {
  render() {
       
    const childrenData = [
      { children: { title: { children: webUrl.logo.md }, content: { children: '打开新的门户认识世界的神奇之处' }, button: { children: '开始使用' } } },
      { children: { title: { children: webUrl.logo.md }, content: { children: '或许你比我想象中的TA更加不平凡' }, button: { children: 'Open Love' } } },
    ];
    const defaultImg = [
      webUrl.banner.xxlRed,
      webUrl.banner.xxlBlack,
    ]
    const childrenToRender = childrenData.map((item, i) => {
      const children = item.children;
      const isImg = children.title.children
        .match(/\.(gif|jpg|jpeg|png|JPG|PNG|GIF|JPEG)$/);
      return (<Element
        key={i}
        prefixCls="banner-user-elem"
      >
        <BgElement
          className="bg"
          key="bg"
          style={children.bg && children.bg.style || {
            backgroundImage: `url(${defaultImg[i]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <QueueAnim
          type={['bottom', 'top']} delay={200}
          className={`${this.props.className}-title`} key="text"
          style={children.wrapper && children.wrapper.style}
        >
          <span
            className="logo" key="logo"
            style={children.title.style}
          >
            {isImg ?
              (<img width="100%" src={children.title.children} />) :
              children.title.children}
          </span>
          <p
            key="content"
            style={children.content.style}
          >
            {children.content.children}
          </p>
          <Button
            type="ghost"
            key="button"
            onClick={() => {document.getElementById("Content3").scrollIntoView();}}
            style={children.button.style}
          >
            {children.button.children}
          </Button>
        </QueueAnim>
      </Element>);
    });
    return (
      <TweenOne animation={{ opacity: 0, type: 'from' }}>
        <OverPack
          {...this.props}
          hideProps={{ icon: { reverse: true } }}
        >
          <BannerAnim
            key="banner"
          >
            {childrenToRender}
          </BannerAnim>
          <TweenOne
            animation={{ y: '-=20', yoyo: true, repeat: -1, duration: 1000 }}
            className={`${this.props.className}-icon`}
            style={{ bottom: 40 }}
            key="icon"
          >
            <Icon type="down" />
          </TweenOne>
        </OverPack>
      </TweenOne>
    );
  }
}

Banner.propTypes = {
  className: PropTypes.string,
};

Banner.defaultProps = {
  className: 'banner1',
};

export default Banner;
