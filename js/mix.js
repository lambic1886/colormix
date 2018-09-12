/*
 * function mix，传入主色，执行将当前主色混合后赋给各个矩形，前5个循环与白色0.2、0.4、0.5、0.6、0.9混合，后4个循环与黑色0.2，0.4，0.6，0.8混合；
 * function diy，传入用户点击后input的16进制，转化为rgb数组,再执行一次init；
 * window.onload = mix();
 */

//获取色板元素
var paletteMono = document.getElementsByClassName('mono');
var paletteGray = document.getElementsByClassName('gray');

//各种颜色模型转化函数
function HexToRgb(hex){ 
	return "rgb(" + parseInt("0x" + hex.slice(1, 3)) + "," + parseInt("0x" + hex.slice(3, 5)) + "," + parseInt("0x" + hex.slice(5, 7)) + ")"; 
}

//初始化
//var initStyle = document.defaultView.getComputedStyle(paletteMono[4], null); 
var primaryColor = HexToRgb('#16c4c6');
console.log('this is primary color in rgb'+primaryColor);

//单色混合函数
function mixMono(elem){
	//这里有一个问题，传进来的primarycolor是字符串，所以下面的混合计算会进行拼接字符串再转化为数字，这里重写了一个循环，看看以后有没有更好的方法。
	
	var pri = elem
        .replace(/^rgb\(([^\)]+)\)/,'$1') //([^\)]+)
        .replace(/\s/g, '')
        .split(',');
    console.log('this is primary color in rgb array'+pri);
    
    for (var i=0; i<3; i++) {
		pri[i] = Number(pri[i]);
	}
    console.log(pri);
    
    for (var s=5; s<10; s++) {
    		var mix = new Array();
    		for (var i=0; i<3; i++) {
			mix[i] = Math.floor(pri[i]*(1.5-s*0.15) + 255*(s*0.15-0.5));
		}
    		paletteMono[s].style.backgroundColor = 'rgb('+ mix.join(',') + ')';
    		console.log(paletteMono[s].style.backgroundColor);
    }
    
    for (var s=0; s<4; s++) {
    		var mix = new Array();
    		for (var i=0; i<3; i++) {
			mix[i] = Math.floor(pri[i]*(s*0.2+0.2) + 0*(0.85-s*0.15));
		}
    		paletteMono[s].style.backgroundColor = 'rgb('+ mix.join(',') + ')';
    		console.log(paletteMono[s].style.backgroundColor);
    }
    
    console.log(pri);
    console.log(paletteMono[5].style.backgroundColor)
}


//mix gray
function mixGray(elem){
	var pri = elem
        .replace(/^rgb\(([^\)]+)\)/,'$1') //([^\)]+)
        .replace(/\s/g, '')
        .split(',');
    
    for (var i=0; i<3; i++) {
		pri[i] = Number(pri[i]);
	}
    for (var s=0; s<2; s++) {
    		var mix = new Array();
    		for (var i=0; i<3; i++) {
			mix[i] = Math.floor(pri[i]*0.5 + 127*0.5);
		}
    		paletteGray[s].style.backgroundColor = 'rgb('+ mix.join(',') + ')';
    }
}



//获取用户的主色
document.getElementById('bingo').onclick = function diy(){
	var primaryColor = HexToRgb(document.getElementById('primary-color').value);
	paletteMono[4].style.backgroundColor = primaryColor;
	mixMono(primaryColor);
	mixGray(primaryColor);
}




















window.onload = mixMono(primaryColor);
window.onload = mixGray(primaryColor);
