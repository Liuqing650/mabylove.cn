import React, { PropTypes } from 'react';
import { connect } from 'dva';
import { Layout } from 'antd';
import ReactDOM from 'react-dom';
import classnames from 'classnames'
import Nav from './Index/Nav';
import Footer from './Index/Footer';
import './Index/less/antMotion_style.less';
import styles from './mainStyle.less';

function Main(state) {
  const { children, location,mainView,dispatch } = state;
  const navProps = {
    navMenu:mainView,
    loginState: mainView.loginState,
    visible:mainView.visible,
    signOut() {
      dispatch ({
        type: 'mainView/onSignOut',
      })
    },
    onShowModal() {
      dispatch ({
        type: 'mainView/onShowModal',
      })
    },
    onHideModal() {
      dispatch ({
        type: 'mainView/onHideModal',
      })
    },
    onSubmitPassword() {
      dispatch ({
        type: 'mainView/changePassword',
      })
    }
  }
  const { Header, Content} = Layout;
  let docH = document.body.clientHeight;
  return (
      <div>
        <Layout>
          <Header className="my-main-header" style={{width: '100%'}}>
            <Nav id="Nav" key="Nav" {...navProps} />
          </Header>
          <Content style={{width: '100%',minHeight:`${docH-144}px`}}> 
              { children }
          </Content>
        </Layout>
        <Footer id="Footer" key="Footer" />
      </div>
  )
}

Main.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
}

export default connect(({mainView})=>({mainView}))(Main)
