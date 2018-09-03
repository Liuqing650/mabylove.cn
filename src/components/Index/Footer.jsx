import React from 'react';
import PropTypes from 'prop-types';
import TweenOne from 'rc-tween-one';
import ScrollOverPack from 'rc-scroll-anim';

const OverPack = ScrollOverPack.OverPack;
const Footer = ({
}) => {
  return (<OverPack
    className={`footer0`}
    playScale={0.05}
  >
    <TweenOne
      animation={{ y: '+=30', opacity: 0, type: 'from' }}
      key="footer"
    >
      <span className="info">
        帷中暮色 &copy; 2016-12 <a href="#">Maby love</a> 人生纵此一别,天涯共此明月
        <br />
        <span>渝ICP备16012542号</span>
      </span>
    </TweenOne>
  </OverPack>);
}

Footer.propTypes = {
  className: PropTypes.string,
  dataSource: PropTypes.object,
};

Footer.defaultProps = {
  className: 'footer0',
};

export default Footer;
