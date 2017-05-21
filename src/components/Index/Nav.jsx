import React, { PropTypes } from 'react';
import { Link } from 'dva/router';
import Menu from 'antd/lib/menu';
import Modal from 'antd/lib/modal';
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';
import Form from 'antd/lib/form';
import { OverPack } from 'rc-scroll-anim';
import TweenOne from 'rc-tween-one';
import QueueAnim from 'rc-queue-anim';
import webUrl from '../../utils/webResUrl';
import styles from './indexStyle.less';
import {hashHistory} from 'dva/router';
import storage from '../../utils/browserData';

const Item = Menu.Item;
const SubMenu = Menu.SubMenu;
const FormItem = Form.Item;

const Header = ({
    location,
    dispatch,
    navMenu,
    signOut,

    visible,
    loginState,
    onShowModal,
    onHideModal,
    onSubmitPassword,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
        resetFields,
    },
}) => {
    const user = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1493779427&di=d791fb0fb95e321014a4a2357887aa6c&imgtype=jpg&er=1&src=http%3A%2F%2Fd.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F72f082025aafa40fe871b36bad64034f79f019d4.jpg';
    const avatar = storage.avatar;
    const navData =  navMenu.navMenu;
    const navChildren = Object.keys(navData)
      .map((key, i) => (<Item key={navData[key].src}><a style={{color: '#fff'}} href={'#/'+navData[key].src}>{navData[key].menu_name}</a></Item>));


    function showModal() {
        onShowModal();  
    }
    function handleOk() {
        onSubmitPassword();
    }

    function handleCancel() {
        resetFields();
        onHideModal();
    }

    const userTitle = (<div>
      <span className="img">
        <img
          src={avatar!=="null"?avatar:user}
          width="30"
          height="30"
          className={styles.userImage}
        />
      </span>
      <span>{storage.nickName}</span>
    </div>);
    storage.isLogin = loginState?true:localStorage.getItem("userId")?true:false;
    storage.isLogin?navChildren.push(
      <SubMenu className="user" title={userTitle} key="user">
        <Item key="a" className={styles.subMenuText}><div onClick={()=>hashHistory.push('/cms')}>用户中心</div></Item>
        <Item key="b" className={styles.subMenuText}><div onClick={showModal}>修改密码</div></Item>
        <Item key="c" className={styles.subMenuText}><div onClick={signOut}>注销</div></Item>
      </SubMenu>):null;

    const modalOpts = {
        title: '修改密码',
        visible: visible,
        width: 400,
        onOk: handleOk,
        maskClosable: false,
        onCancel: handleCancel,
        wrapClassName:"vertical-center-modal",
        footer:<div>
                <Button type="ghost" size="large" onClick={handleCancel}>取消修改</Button>
                <Button type="primary" size="large"  onClick={handleOk}> 
                  修改密码
                </Button>
            </div>
    }
    return (
        <div>
          <TweenOne
            component="header"
            animation={{ opacity: 0, type: 'from' }}
            className={`header0`}
            style={{ position: 'fixed' }}
          >
            <TweenOne
              className={`header0-logo`}
              animation={{ x: -30, type: 'from', ease: 'easeOutQuad' }}
            >
              <img width="100%" src={webUrl.navLogo.lg}/>
            </TweenOne>
            <TweenOne
              className={`header0-nav`}
              animation={{ x: 30, type: 'from', ease: 'easeOutQuad' }}
            >
              <Menu
                mode="horizontal" selectedKeys={[navMenu.selectedKeys[0]]} defaultSelectedKeys={[navMenu.defaultKey[0]]}
              >
                {navChildren}
              </Menu>
            </TweenOne>
          </TweenOne>
          <Modal
              {...modalOpts}
            >
              <Form>
                <FormItem horizontal>
                    {getFieldDecorator('userId', {
                        initialValue: storage.nickName,
                        rules: [{ required: true, message: '原密码未填写' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} type="text" disabled placeholder="没有获取到您的用户名"/>
                    )}
                </FormItem>
                <FormItem horizontal>
                    {getFieldDecorator('origin_password', {
                    rules: [{ required: true, message: '原密码未填写' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="请输入原密码"/>
                    )}
                </FormItem>
                <FormItem horizontal>
                    {getFieldDecorator('new_password',{
                    rules: [{ required: true, message: '新密码未填写'}],
                    })(
                        <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="请输入新密码" />
                    )}
                </FormItem>
              </Form>
            </Modal>
        </div>
      );
}

Header.propTypes = {
  className: PropTypes.string,
};

Header.defaultProps = {
  className: 'header0',
};

export default Form.create()(Header);
