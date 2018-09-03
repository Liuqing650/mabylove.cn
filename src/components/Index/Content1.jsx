import React from 'react';
import PropTypes from 'prop-types';
import QueueAnim from 'rc-queue-anim';
import TweenOne from 'rc-tween-one';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import styles from './less/ContentStyle.less';
import webUrl from '../../utils/webResUrl';

class Content extends React.Component {

  static propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
  };

  static defaultProps = {
    className: 'content0',
  };

// scale: 0, yoyo: true, repeat: -1, duration: 1000
  render() {
    return (
      <div
        {...this.props}
        className="content-template-wrapper content-half-wrapper"
      >
        <OverPack
          className={`content-template ${this.props.className}`}
          location={this.props.id}
        >
          <TweenOne
            key="img"
            animation={{ scale: 0.9,x: '-=30',repeat: 0,opacity: 0,duration: 800, type: 'from' }}
            style={{ transform: 'scale(1)' }}
            paused={this.props.paused}
            className={`${this.props.className}-img`}
          >
            <span
            >
              <a className={styles.imgHover} 
                href="#/task">
               <img width="100%" src={webUrl.homeMethod.one.md} />
              </a>
            </span>
          </TweenOne>
          <QueueAnim
            className={`${this.props.className}-text`}
            key="text"
            leaveReverse
            ease={['easeOutCubic', 'easeInCubic']}
          >
            <h1
              key="h1"
            >
              任务计划中心
            </h1>
            <p
              key="p"
            >
              这是一个让你规划自己任务的平台，你可以在这里建立自己即将开始的小任务，你的完成进度将被记录下来，便于你查看所有的进度。
            </p>
            <p
              key="a"
            >
              如果你有理想，就去实现吧。如果你有快乐，请来这里分享吧！
            </p>
          </QueueAnim>
        </OverPack>
      </div>
    );
  }
}


export default Content;
