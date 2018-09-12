/*
 * 1、用户输入primary-color的16进制；
 * 2、利用正则表达式分离primary-color的r／g／b／a 值（a可以暂时不要），获得一个数组p[3]；//这里是直接取了origin的rgb值再划分，其实可以..直接用hexToRGB转=-=；
 * 3、将p[3]与w[3] = [255，255，255]循环进行混合得到若干个数组。公式为：r[i]=p[i]*k+w[i]*(1-k);
 * 4、再将若干个数组循环拼接成色值返回给矩形
 */

/*
 * function mix，传入主色，执行将当前主色混合后赋给各个矩形，前5个循环与白色0.2、0.4、0.5、0.6、0.9混合，后4个循环与黑色0.2，0.4，0.6，0.8混合；
 * function diy，传入用户点击后input的16进制，转化为rgb数组,再执行一次init；
 * window.onload = mix();
 */
//获取原始矩形和对比矩形
var origin = document.getElementById('origin');
var con1 = document.getElementById('contrast');

//16进制转rgb
function hexToRgba(hex, opacity) { 
	return "rgba(" + parseInt("0x" + hex.slice(1, 3)) + "," + parseInt("0x" + hex.slice(3, 5)) + "," + parseInt("0x" + hex.slice(5, 7)) + "," + opacity + ")"; 
}

//无透明度，无前缀
function newHexToRgb(hex) { 
	return "rgb(" + parseInt("0x" + hex.slice(1, 3)) + "," + parseInt("0x" + hex.slice(3, 5)) + "," + parseInt("0x" + hex.slice(5, 7)) + ")"; 
}

//自定义颜色并开始混合
document.getElementById('bingo').onclick = function getPrimaryColor(){
	
	//获取用户输入字符串,并将其赋给origin
	var primaryColor = document.getElementById('primary-color').value;
	origin.style.backgroundColor = primaryColor;
	
	//获取此时origin的背景色的rgb值，并将其转化为数组
	var ori1 = document.defaultView.getComputedStyle(origin, null);
	var pri = ori1['background-color']
        .replace(/^rgb\(([^\)]+)\)/,'$1') //([^\)]+)
        .replace(/\s/g, '')
        .split(',');
    
    //新建数组，进行混合
	var mix1 = new Array();
    for (var i=0; i<3; i++) {
		mix1[i] = Math.floor(pri[i]*0.9 + 255*0.9);
	}
    con1.style.backgroundColor = 'rgb('+ mix1.join(',') + ')';
    
    //监控数据
    console.log('这是pri：'+pri);
    console.log('这是十六进制转化后的rgb：'+newHexToRgb(primaryColor,1));
    console.log('这是混合后的mix1：'+mix1);
    console.log('这是此时contrast的背景色：'+con1.style.backgroundColor);
}

/*保存一个老版本：





/*
//提取颜色rgb值
function getColor(elem) {
    var style = document.defaultView.getComputedStyle(elem, null);
    //var rgb = rgb.match(/(\d(\.\d+)?)+/g);
    //return rgb;
    var pri = style['background-color']
        .replace(/^rgb\(([^\)]+)\)/,'$1') //([^\)]+)
        .replace(/\s/g, '')
        .split(',');
    return pri;
}      

var green = document.getElementById('green'),
    blue = document.getElementById('blue'),
    result = document.getElementById('result');

var resultColor = multiply( getColor(green), getColor(pink) );
//拼接rgb值
result.style.backgroundColor = 'rgb('+ resultColor.join(',') + ')';

var origin = document.getElementById('test'); 

//提取颜色rgb值
function getColor(elem) {
    var style = document.defaultView.getComputedStyle(elem, null);
    return style['background-color']
        .replace(/^rgb\(([^\)]+)\)/,'$1')
        .replace(/\s/g, '')
        .split(',');
}    

function multiply(rgb1, rgb2) {
    var result = [],
        i = 0;
    for( ; i < rgb1.length; i++ ) {
        result.push(Math.floor(rgb1[i] * rgb2[i] / 255));
    }
    return result;
}

/*function mixColor(colorA,colorB){
	colorC = colorA*colorB/128;
	var origint1 = document.getElementById('test');
	origint1.style.backgroundColor = colorC;
}*/






