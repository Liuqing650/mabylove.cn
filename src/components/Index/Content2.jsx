import React from 'react';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import styles from './less/ContentStyle.less';
import webUrl from '../../utils/webResUrl';

class Content extends React.Component {

  static propTypes = {
    id: React.PropTypes.string,
    className: React.PropTypes.string,
  };

  static defaultProps = {
    className: 'content1',
  };

  render() {
    return (
      <div
        {...this.props}
        className="content-template-wrapper content-half-wrapper"
      >
        <OverPack
          className={`content-template ${this.props.className}`}
          hideProps={{ img: { reverse: true } }}
          location={this.props.id}
        >
          <QueueAnim
            type="left"
            className={`${this.props.className}-text`}
            key="text"
            leaveReverse
            ease={['easeOutCubic', 'easeInCubic']}
          >
            <h1
              key="h1"
            >
              用户中心
            </h1>
            <p
              key="p"
            >
              在这里，你可以做出任何属于你的作品，它漂亮，证明你很有审美的眼光；它阳光，说明你很开朗；它炫丽，说明你很有艺术；它还有好多好多，等待你去发现...
            </p>
          </QueueAnim>
          <TweenOne
            key="img"
            animation={{ scale: 0.9,x: '=30',repeat: 0,opacity: 0,duration: 800, type: 'from' }}
            style={{ transform: 'scale(1)' }}
            paused={this.props.paused}
            className={`${this.props.className}-img`}
          >
            <span
            >
              <a className={styles.imgHover} 
                href="#/cms">
              <img width="100%" src={webUrl.homeMethod.two.md} />
              </a>
            </span>
          </TweenOne>
        </OverPack>
      </div>
    );
  }
}


export default Content;
