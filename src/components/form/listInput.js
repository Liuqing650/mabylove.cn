import React from 'react';
import {List, WhiteSpace} from 'antd-mobile';
import styles from './index.less';

const Item = List.Item;
class ListInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }
  changeModal = (visible) => {
    // e.preventDefault(); // 修复 Android 上点击穿透
    this.setState({
      visible
    });
  }
  render() {
    const {getFieldProps, getFieldError} = this.props.form;
    const onItemClick = (even, config) => {
      even.preventDefault();
      if (config.onClick) {
        config.onClick(config);
      }
    };

    /**
     * 普通文本输入框
     * @Params(object) config
     * @return(arrays.Element)
     * */
    const createListInput = (config, key) => {
      const output = [];
      if (!config || Object.keys(config).length === 0) {
        return output;
      }
      if (config.space) {
        output.push(<WhiteSpace key={`space-${key}`} size={config.spaceSize || 'md'} />);
      }
      output.push(
        <div key={`input-${key}`} className="my-item">
          <Item
            extra={<span
              {...getFieldProps(
              config.name,
              {rules: config.rules || [], initialValue: config.value || '', valuePropName: 'value'})} value={config.value || ''}
            >{config.value || ''}</span>}
            arrow={config.arrow || 'horizontal'}
            onClick={(event) => { onItemClick(event, config); }}
          >
            <span className={styles.required}>{config.required ? '*' : ' '}</span>
            {config.label ? config.label : null}
          </Item>
          <div className={styles.error}>
            <span>{getFieldError(config.name)}</span>
          </div>
        </div>
      );
      return output;
    };
    return (
      <div>
        {createListInput(this.props.inputs, this.props.itemKey)}
      </div>
    );
  }
}

export default ListInput;
