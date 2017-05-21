// 用于计算前端提交的数据代码转为文本形式占用空间大小
var sizeof = function(str, charset){
    if(typeof(str)!=='string') {
        var type = typeof(str);
        if(type==='number') {
            str=str.toString();
        } else if(type==='object') {
            str=JSON.stringify(str)
        } else if(type==='undefined') {
            console.log('请输入数据，在进行验证。')
            return false;
        } else {
            console.log('您输入的数据类型无法识别。')
            return false;
        }
    }

    var total = 0,
        charCode,
        i,
        len;
    charset = charset ? charset.toLowerCase() : '';
    if(charset === 'utf-16' || charset === 'utf16'){
        for(i = 0, len = str.length; i < len; i++){
            charCode = str.charCodeAt(i);
            if(charCode <= 0xffff){
                total += 2;
            }else{
                total += 4;
            }
        }
    }else{
        for(i = 0, len = str.length; i < len; i++){
            charCode = str.charCodeAt(i);
            if(charCode <= 0x007f) {
                total += 1;
            }else if(charCode <= 0x07ff){
                total += 2;
            }else if(charCode <= 0xffff){
                total += 3;
            }else{
                total += 4;
            }
        }
    }
    return total;
}

module.exports = sizeof;