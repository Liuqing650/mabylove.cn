import React,{ PropTypes } from 'react';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';

const Footer = ({
}) => {
  // static propTypes = {
  //   dataSource: React.PropTypes.object,
  // };

  return (<OverPack
    className={`footer0`}
    playScale={0.05}
    hideProps={{ footer: { reverse: true } }}
  >
    <TweenOne
      animation={{ y: '+=30', opacity: 0, type: 'from' }}
      key="footer"
    >
      <span
      >
        帷中暮色 &copy; 2016-12 <a href="#">Maby love</a> 人生纵此一别,天涯共此明月
      </span>
    </TweenOne>
  </OverPack>);
}

Footer.propTypes = {
  className: PropTypes.string,
  dataSource: React.PropTypes.object,
};

Footer.defaultProps = {
  className: 'footer0',
};

export default Footer;
