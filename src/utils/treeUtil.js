function getTree(data, pid) {
	if(!pid){
		pid=-1;
	}
    var result = [], temp;
    for (var i = 0; i < data.length; i++) {
        if (data[i].pid == pid) {
            var obj = data[i];
            temp = getTree(data, data[i].id);
            if (temp.length > 0) {
                obj.children = temp;
            }
            result.push(obj);
        }
    }
    return result;
}



var treeUtil = {
	getTree:getTree
}
module.exports = treeUtil