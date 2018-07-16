import React from 'react';
import { WhiteSpace } from 'antd-mobile';
import styles from './index.less';

const ImagePickerCom = ({
  inputs,
  itemKey
}) => {
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
    const urls = config.urls || null;
    // 预览按钮
    const onPreview = (item) => {
      if (config.onPreview) {
        config.onPreview(item);
      }
    };
    // 添加按钮
    const onAddImg = (urls) => {
      if (config.onAddImg) {
        config.onAddImg(urls);
      }
    };

    // 删除按钮
    const onDelete = (even, item, urls) => {
      // 防止冒泡
      even.preventDefault();
      even.stopPropagation();
      if (config.onDelete) {
        config.onDelete(item, urls);
      }
    };

    if (urls && urls.length > 0) {
      urls.map((item, index) => {
        output.push(
          <div className={styles.boxImg} onClick={() => { onPreview(item); }} key={`img-${index}`}>
            <icon className={styles.deleteIcon} onClick={(even) => { onDelete(even, item, urls); }} />
            <img className={styles.img} src={item.url} />
          </div>
        );
      });
    }
    if (!urls || urls.length < 3) {
      output.push(
        <div className={styles.addBox} onClick={() => { onAddImg(urls); }} key="img-null-1" />
      );
    }
    return (
      <div>
        {config.space ? <WhiteSpace key={`space-${key}`} size={config.spaceSize || 'md'} /> : null}
        <div key={`input-${key}`} className="my-item clearfix">
          {output}
        </div>
      </div>
    );
  };
  return (
    <div className={styles.imagePicker}>
      { createListInput(inputs, itemKey) }
    </div >
  );
};

export default ImagePickerCom;
