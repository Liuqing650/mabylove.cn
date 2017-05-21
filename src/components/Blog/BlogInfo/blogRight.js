import React from 'react';
import { CirclePicker,AlphaPicker } from 'react-color';
import { Button, Icon } from 'antd';
import styles from './blogStyle.less';

const  blogRight=({
	selectColor,
	alphaColor,
	changeColor,
  background,
  onShowEdit,
  onShowBlog,
}) => {

  const handleChangeColor = (color, event) => {
  	const obj={};
  	obj['color']=color.rgb
    changeColor(obj)
  };
  const handleChangeAlphaColor = (color, event) => {
  	const obj={};
  	obj['alpha']=color.rgb.a;
  	obj['alphaColor']=color.rgb;
  	changeColor(obj)
  }
    		

    return (
    	<div>
        <div className={styles.rightSetting}>
          <div className={styles.setWrapper}>
            <div className={styles.blogTitleStyle}>
              <h2>帷友编辑区</h2>
            </div>
            <div className={styles.pickColorSolidLine} style={{borderColor:`${background}`}}></div>
            <div className={styles.blogEditStyle}>
              <div className={styles.blogEditWrapper}>
                <a onClick={onShowEdit}>
                  <span className={styles.redBg}>
                    <span className={styles.editButton}>
                      <Icon className={styles.editIocn} type="edit" /><br/>写作
                    </span>
                  </span>
                </a>
                <a>
                  <span className={styles.purpleBg}>
                    <span className={styles.editButton}>
                      <Icon className={styles.editIocn} type="heart-o" /><br/>收藏
                    </span>
                  </span>
                </a>
                <a>
                  <span className={styles.blueBg}>
                    <span className={styles.editButton}>
                      <Icon className={styles.editIocn} type="home" /><br/>我的
                    </span>
                  </span>
                </a>
                <a onClick={onShowBlog}>
                  <span className={styles.greenBg}>
                    <span className={styles.editButton}>
                      <Icon className={styles.editIocn} type="github" /><br/>论坛
                    </span>
                  </span>
                </a>
              </div>
            </div>
            <div className={styles.pickColorDashedLine} style={{borderColor:`${background}`}}></div>
            <div
              className={styles.cricleColorStyle}
            >
              <div className={styles.setTitleStyle}>背景色彩</div>
              <CirclePicker 
                color={ selectColor.rgb }
                onChangeComplete={ handleChangeColor } />
            </div>
            <div className={styles.whiteLine}></div>
            <div
              className="alphaColorStyle"
            >
              <div className={styles.setTitleStyle}>透明度</div>
              <AlphaPicker
                color={ alphaColor.rgb }
                className={styles.alphaStyle}
                style={{width:100}}
                onChangeComplete={ handleChangeAlphaColor } />
            </div>
          </div>
        </div>
    	</div>
    );
}
export default blogRight;