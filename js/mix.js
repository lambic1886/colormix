/*
 * function mix，传入主色，执行将当前主色混合后赋给各个矩形，前5个循环与白色0.2、0.4、0.5、0.6、0.9混合，后4个循环与黑色0.2，0.4，0.6，0.8混合；
 * function diy，传入用户点击后input的16进制，转化为rgb数组,再执行一次init；
 * window.onload = mix();
 */

//获取色板元素
var paletteMono = document.getElementsByClassName('mono');
var paletteGray = document.getElementsByClassName('gray');
var nav = document.getElementById('nav');
var header = document.getElementById('header');
var priBtn = document.getElementById('pri-test');
var secBtn = document.getElementById('sec-test');
var leftNav = document.getElementById('leftnav');
var chosen = document.getElementById('chosen');
var th = document.getElementsByTagName('th');
var td = document.getElementsByTagName('td');
var inter = document.getElementById('interface'); 

//hex转rgb
function HexToRgb(hex){ 
	return "rgb(" + parseInt("0x" + hex.slice(0, 2)) + "," + parseInt("0x" + hex.slice(2, 4)) + "," + parseInt("0x" + hex.slice(4, 6)) + ")"; 
}

//将rgb转化为hsl
function RgbToHsl(r, g, b) {
        r /= 255, g /= 255, b /= 255;
        var max = Math.max(r, g, b), min = Math.min(r, g, b);
        var h, s, l = (max + min) / 2;
 
        if (max == min) {
            h = s = 0;
        } else {
            var d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }
        return [Math.floor(h * 100), Math.round(s * 100), Math.round(l * 100)];
}

function hslToRgb(h, s, l) {
    var r, g, b;

    if(s == 0) {
        r = g = b = l; // achromatic
    } else {
        var hue2rgb = function hue2rgb(p, q, t) {
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

//初始化
//var initStyle = document.defaultView.getComputedStyle(paletteMono[4], null); 
var primaryColor = HexToRgb('16c4c6');
paletteMono[4].style.backgroundColor = primaryColor;
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
    
    
    console.log('this is mix'+mix);
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
    
    var mix = RgbToHsl(pri[0],pri[1],pri[2]);
    console.log('这是hsl'+mix);
    
    for (var s=0; s<7; s++) {
    		mix[1] = 10-s*1;
    		mix[2] = 50+s*8;
    		console.log(mix[2]);
    		var mixed = hslToRgb(mix[0]/100,mix[1]/100,mix[2]/100);
    		console.log('this is mixed hsl'+mixed);
    		paletteGray[s].style.backgroundColor = 'rgb('+ mixed.join(',') + ')';
    		console.log(s+paletteGray[s].style.backgroundColor);
    }
}

//将色板的颜色展示在色板上
function initTheColor(){
	for (var s=0; s<10; s++) {
		var showColor = document.createElement('h5');
		showColor.setAttribute('class','cText');
    		var cText = document.createTextNode(paletteMono[s].style.backgroundColor)
    		showColor.appendChild(cText);
    		paletteMono[s].appendChild(showColor);
	}
	
	for (var s=0; s<7; s++) {
		var showColor = document.createElement('h5');
		showColor.setAttribute('class','cText');
    		var cText = document.createTextNode(paletteGray[s].style.backgroundColor)
    		showColor.appendChild(cText);
    		paletteGray[s].appendChild(showColor);
	}
	
	console.log(paletteMono[4].style.backgroundColor);
	
	for (var s=0; s<5; s++) {
    		paletteMono[s].style.color = '#FFFFFF';
	}
	for (var s=0; s<3; s++) {
    		paletteGray[s].style.color = '#FFFFFF';
	}
}

function showMeTheColor(){
	for (var s=0; s<10; s++) {
		//var cText = paletteMono[s].getElementsByTagName('h5').toString();
    		var cText = paletteMono[s].getElementsByTagName('h5');
    		var newText = document.createTextNode(paletteMono[s].style.backgroundColor)
    		cText[0].innerText = newText.data;
    		//cText.replace(newText);
    		console.log(typeof cText);
    		console.log(cText[0]+' '+cText[1]+' '+newText.data);
	}
	
	for (var s=0; s<7; s++) {
		//var cText = paletteMono[s].getElementsByTagName('h5').toString();
    		var cText = paletteGray[s].getElementsByTagName('h5');
    		var newText = document.createTextNode(paletteGray[s].style.backgroundColor);
    		cText[0].innerText = newText.data;
    		//cText.replace(newText);
    		console.log(typeof cText);
    		console.log(cText[0]+' '+cText[1]+' '+newText.data);
	}
	
	console.log(paletteMono[4].style.backgroundColor);
	
	for (var s=0; s<5; s++) {
    		paletteMono[s].style.color = '#FFFFFF';
	}
	
	for (var s=0; s<3; s++) {
    		paletteGray[s].style.color = '#FFFFFF';
	}
}

function giveMeTheColor(){
	nav.style.backgroundColor = paletteMono[0].style.backgroundColor;
	header.style.backgroundColor = paletteMono[1].style.backgroundColor;
	chosen.style.backgroundColor = paletteMono[9].style.backgroundColor;
	secBtn.style.borderColor = paletteGray[5].style.backgroundColor;
	priBtn.style.backgroundColor = paletteMono[4].style.backgroundColor;
	
	priBtn.onmousemove = function(){
		priBtn.style.backgroundColor = paletteMono[3].style.backgroundColor;
	}
	
	priBtn.onmouseout = function(){
		priBtn.style.backgroundColor = paletteMono[4].style.backgroundColor;
	}
	
	secBtn.onmousemove = function(){
		secBtn.style.backgroundColor = paletteGray[6].style.backgroundColor;
	}
	
	secBtn.onmouseout = function(){
		secBtn.style.backgroundColor = '#FFFFFF';
	}
	
	for(var x in th){
		th[x].style.backgroundColor = paletteGray[5].style.backgroundColor;
		th[x].style.borderColor = paletteGray[5].style.backgroundColor;
	}
	for(var x in td){
		th[x].style.borderColor = paletteGray[5].style.backgroundColor;
	}
	
	inter.style.backgroundColor = paletteGray[6].style.backgroundColor;
}


//点击事件
document.getElementById('bingo').onclick = function diy(){
	var primaryColor = HexToRgb(document.getElementById('primary-color').value);
	paletteMono[4].style.backgroundColor = primaryColor;
	mixMono(primaryColor);
	mixGray(primaryColor);
	showMeTheColor();
	giveMeTheColor();
}

//初始化
window.onload = mixMono(primaryColor);
window.onload = mixGray(primaryColor);
window.onload = initTheColor();
window.onload = giveMeTheColor();


/*
 * if () {
		for (var s=0; s<10; s++) {
		paletteMono[s].removeChild('h5');
	}
	
 * function mixGray(elem){
	var pri = elem
        .replace(/^rgb\(([^\)]+)\)/,'$1') //([^\)]+)
        .replace(/\s/g, '')
        .split(',');
    
    for (var i=0; i<3; i++) {
		pri[i] = Number(pri[i]);
	}
    
    var mix = rgbToHsl(pri[0],pri[1],pri[2]);
    
    for (var s=0; s<6; s++) {
    		var mix = new Array();
    		for (var i=0; i<3; i++) {
			mix[i] = Math.floor(pri[i]*0.5 + 32*s);
		}
    		paletteGray[s].style.backgroundColor = 'rgb('+ mix.join(',') + ')';
    }
}
 */