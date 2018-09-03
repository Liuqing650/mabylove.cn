import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Menu } from 'antd';
import { Content, NavBar } from 'components/common/Layout';
import TweenOne from 'rc-tween-one';
import logoPic from 'imgs/logo/logo500f.png';
import styles from './index.less';

const Item = Menu.Item;
class AppCom extends React.Component {
  onChange = (data) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'app/change',
      payload: data
    });
  };
  changeNavBar = (menu) => {
    this.onChange({
      selectedNav: menu.key
    });
  };
  navChildren = () => {
    const { navData } = this.props.app;
    if (!navData || navData.length === 0) { return null; }
    return navData.map((item) => {
      return (
        <Item key={item.path}>
          <a style={{ color: '#fff' }} href={`#/${item.path}`}>
            {item.name}
          </a>
        </Item>);
    });
  };
  render() {
    const { dispatch, location, children, app } = this.props;
    const { selectedNav } = app;
    const onNavBarLogoClick = () => {
      if (location.pathname !== '/home') {
        dispatch(routerRedux.push('/home'));
      }
    };
    return (
      <div className="appRoot">
        <TweenOne
          animation={{ opacity: 0, type: 'from' }}
        >
          <NavBar>
            <div className={styles.navbar}>
              <div className="clearfix">
                <div className={styles.logoWrap}>
                  <TweenOne
                    animation={{ x: -30, type: 'from', ease: 'easeOutQuad' }}
                  >
                    <img src={logoPic} onClick={onNavBarLogoClick} className={styles.logo} />
                  </TweenOne>
                </div>
                <TweenOne
                  className={styles.navs}
                  animation={{ x: 30, type: 'from', ease: 'easeOutQuad' }}
                >
                  <Menu
                    onClick={this.changeNavBar}
                    mode="horizontal"
                    selectedKeys={[selectedNav]}
                  >
                    {this.navChildren()}
                  </Menu>
                </TweenOne>
              </div>
            </div>
          </NavBar>
        </TweenOne>
        <TweenOne
          animation={{ y: -30, type: 'from', ease: 'easeOutQuad' }}
        >
          <Content>
            {children}
          </Content>
        </TweenOne>
      </div>
    );
  }
}
export default connect(({ app }) => ({ app }))(AppCom);
