import React, { PropTypes } from 'react'
import { connect } from 'dva'
import classnames from 'classnames'
import Header from '../../components/Cms/Layout/Header'
import Bread from '../../components/Cms/Layout/bread'
import Footer from '../../components/Cms/Layout/footer'
import Sider from '../../components/Cms/Layout/sider'
import styles from '../../components/Cms/Layout/main.less'
import '../../components/Cms/Layout/common.less'
import { Spin, message } from 'antd'
function App({ children, location, dispatch, appModel, userManage }) {
  const { login, loading, loginButtonLoading, user } = appModel;
  const { siderColor, switchColor } = userManage;
  const headerProps = {
    user,
    location,
    logout() {
      dispatch({ type: 'appModel/logout' })
    },
  }
  return (
    <div>
      <div className={styles.layout}>
        <aside className={styles.sider} style={{ backgroundColor: `${siderColor}` }}>
          <Sider />
        </aside>
        <div className={styles.main}>
          <Header {...headerProps} />
          <Bread location={location} />
          <div className={styles.container}>
            <div className={styles.content}>
              {children}
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  )
}

App.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
  loginButtonLoading: PropTypes.bool,
  login: PropTypes.bool,
  user: PropTypes.object,
}

function mapStateToProps({ appModel, userManage }) {
  return { appModel, userManage }
}

export default connect(mapStateToProps)(App)
