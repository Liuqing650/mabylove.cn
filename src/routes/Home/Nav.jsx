import React from 'react';
import PropTypes from 'prop-types';
import TweenOne from 'rc-tween-one';
import { Menu, Icon } from 'antd';

const Item = Menu.Item;
const SubMenu = Menu.SubMenu;

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneOpen: false,
      navChildren: []
    };
  }

  componentDidMount() {
    this.createMenus();
  }

  phoneClick = () => {
    this.setState({
      phoneOpen: !this.state.phoneOpen,
    });
  }

  createNavChild = (navMenu) => {
    if (!navMenu || navMenu.length === 0) {
      return null;
    }
    let output = [];
    output = navMenu.map((item, i) => {
      return (
        <Item key={i}>
          {item.menu}
        </Item>
      );
    });
    const userTitle = (
      <div>
        <span className="img">
          <img
            src="https://zos.alipayobjects.com/rmsportal/iXsgowFDTJtGpZM.png"
            width="30"
            height="30"
          />
        </span>
        <span>用户名</span>
      </div>
    );
    output.push(
      <Item className="help" key="help">
        <Icon type="question-circle-o" />
        <span>帮助</span>
      </Item>
    );
    output.push(
      <SubMenu className="user" title={userTitle} key="user">
        <Item key="a">用户中心</Item>
        <Item key="b">修改密码</Item>
        <Item key="c">登出</Item>
      </SubMenu>
    );
    return output;
  };

  createMenus = () => {
    const navMenu = this.props.navMenu || [];
    const navChildren = this.createNavChild(navMenu);
    this.setState({ navChildren });
  };

  render() {
    const props = { ...this.props };
    const isMode = props.isMode;
    delete props.isMode;
    delete props.navMenu;
    const { navChildren } = this.state;
    console.log('props----->', props);
    console.log('navChildren----->', navChildren);
    return (
      <TweenOne
        component="header"
        animation={{ opacity: 0, type: 'from' }}
        {...props}
      >
        <TweenOne
          className={`${this.props.className}-logo`}
          animation={{ x: -30, delay: 100, type: 'from', ease: 'easeOutQuad' }}
          id={`${this.props.id}-logo`}
        >
          <img width="100%" src="https://os.alipayobjects.com/rmsportal/mlcYmsRilwraoAe.svg" />
        </TweenOne>
        {isMode ? (<div
            className={`${this.props.className}-phone-nav${this.state.phoneOpen ? ' open' : ''}`}
            id={`${this.props.id}-menu`}
          >
            <div
              className={`${this.props.className}-phone-nav-bar`}
              onClick={() => {
                this.phoneClick();
              }}
            >
              <em />
              <em />
              <em />
            </div>
            <div
              className={`${this.props.className}-phone-nav-text`}
            >
              <Menu
                defaultSelectedKeys={['0']}
                mode="inline"
                theme="dark"
              >
                {navChildren}
              </Menu>
            </div>
          </div>) :
          <TweenOne
            animation={{ x: 30, delay: 100, opacity: 0, type: 'from', ease: 'easeOutQuad' }}
            className={`${this.props.className}-nav`}
          >
            <Menu
              mode="horizontal" defaultSelectedKeys={['0']}
              id={`${this.props.id}-menu`}
            >
              {navChildren}
            </Menu>
          </TweenOne>
        }
      </TweenOne>
    );
  }
}

Header.propTypes = {
  className: PropTypes.string,
  isMode: PropTypes.bool,
  id: PropTypes.string,
  navMenu: PropTypes.array
};

Header.defaultProps = {
  className: 'header1',
};

export default Header;