//兼容
HTMLElement.prototype.__defineGetter__("currentStyle", function () { 
    return this.ownerDocument.defaultView.getComputedStyle(this, null); 
});

var palette1 = document.getElementById('palette1');
var paletteMono = document.getElementsByClassName('palette');



//rgb转16进制
function colorRGB2Hex(color) {
    var rgb = color.split(',');
    var r = parseInt(rgb[0].split('(')[1]);
    var g = parseInt(rgb[1]);
    var b = parseInt(rgb[2].split(')')[0]);
 
    var hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    return hex;
 }

function getColor(){
	for (var i=0; i<paletteMono.length;i++) {
		var color1 = colorRGB2Hex(paletteMono[i].currentStyle.backgroundColor);
    		alert(color1);
	} 
}

window.onload = getColor();


var color1 = colorRGB2Hex(palette1.currentStyle.backgroundColor);
    alert(color1);
    

//获取单色色板元素并用数组存储其色值
var paletteMono = document.getElementsByClassName('palette');
var paletteMonoColor = new Array();

for (var i=0; i<paletteMono.length;i++) {
		paletteMonoColor[i] = colorRGB2Hex(paletteMono[i].currentStyle.backgroundColor);
    		alert(paletteMonoColor[i]);
} 