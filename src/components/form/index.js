import React from 'react';
import {List} from 'antd-mobile';
import InputItemCom from './inputItem';
import TextArea from './textArea';
import InputDate from './inputDate';
import ListInput from './listInput';
import InputPicker from './inputPicker';
import PictureItem from './pictureItem';
import ImagePicker from './imagePicker';
import styles from './index.less';

const formCom = ({
  configArr,
  form,
  onBlur
}) => {
  // const configArr = [
  //   {
  //     name: '',
  //     inputs: [
  //       {
  //         name: 'userName',
  //         type: 'text',
  //         itemType: 'input',
  //         placeholder: '请输入帐号',
  //         rules: [
  //           { required: true, message: '账号不能为空！' },
  //         ],
  //         label: '产品型号',
  //         space: false,
  //         spaceSize: "xl"
  //       },
  //     ],
  //   }
  // ];
  const judgeItem = (inputs) => {
    const output = [];
    if (!inputs || inputs.length === 0) {
      return output;
    }
    inputs.map((config, index) => {
      switch (config.itemType) {
        case 'input':
          output.push(<InputItemCom key={`item-${index}`} itemKey={`item-${index}`} inputs={config} form={form} />);
          break;
        case 'textArea':
          output.push(<TextArea key={`item-${index}`} itemKey={`item-${index}`} inputs={config} form={form} />);
          break;
        case 'date':
          output.push(<InputDate key={`item-${index}`} itemKey={`item-${index}`} inputs={config} form={form} />);
          break;
        case 'select':
          output.push(<ListInput key={`item-${index}`} itemKey={`item-${index}`} inputs={config} form={form} />);
          break;
        case 'picker':
          output.push(<InputPicker key={`item-${index}`} itemKey={`item-${index}`} inputs={config} form={form} />);
          break;
        case 'picture':
          output.push(<PictureItem key={`item-${index}`} itemKey={`item-${index}`} inputs={config} />);
          break;
        case 'image':
          output.push(<ImagePicker key={`item-${index}`} itemKey={`item-${index}`} inputs={config} />);
          break;
        default:
          break;
      }
    });
    return output;
  };
  const handleForm = () => {
    const output = [];
    if (!configArr || configArr.length === 0) {
      return output;
    }
    configArr.map((item, index) => {
      if (item.name) {
        output.push(<div key={`form-${index}`} className={styles.listTitle}>{item.name}</div>);
      }
      output.push(judgeItem(item.inputs));
    });
    return output;
  };
  return (
    <div onBlur={onBlur} className="myForm">
      <List>
        {handleForm()}
      </List>
    </div>
  );
};

export default formCom;
