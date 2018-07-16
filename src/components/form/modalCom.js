import React from 'react';
import {List, Modal, Button} from 'antd-mobile';

const ModalCom = ({
  visible,
  children,
  onClose,
  onOk
}) => {
  return (
    <Modal
      popup
      visible={visible}
      onClose={onClose}
      animationType="fade"
    >
      <List renderHeader={() => <div>委托买入</div>} className="popup-list">
        {['股票名称', '股票代码', '买入价格'].map((i, index) => (
          <List.Item key={index}>{i}</List.Item>
        ))}
        <List.Item>
          <Button type="primary" onClick={onClose}>买入</Button>
        </List.Item>
      </List>
    </Modal>
  );
};
export default ModalCom;
