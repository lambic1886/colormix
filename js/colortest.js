//兼容
HTMLElement.prototype.__defineGetter__("currentStyle", function () { 
    return this.ownerDocument.defaultView.getComputedStyle(this, null); 
});

//rgb转16进制
function colorRGB2Hex(color) {
    var rgb = color.split(',');
    var r = parseInt(rgb[0].split('(')[1]);
    var g = parseInt(rgb[1]);
    var b = parseInt(rgb[2].split(')')[0]);
 	var hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    return hex;
 }

//获取单色色板元素
var paletteMono = document.getElementsByClassName('palette');

//用数组存储其色值
var paletteMonoColor = new Array();
for (var i=0; i<paletteMono.length;i++) {
		paletteMonoColor[i] = colorRGB2Hex(paletteMono[i].currentStyle.backgroundColor);
    		//alert(paletteMonoColor[i]);
} 

//获取输入的主色值，并与白色和深色混合
document.getElementById('bingo').onclick = function getPrimaryColor(){
		var primaryColor = document.getElementById('primary-color').value;
		if(primaryColor != ''){
			for (var i=0; i<paletteMono.length;i++) {
				paletteMono[i].style.backgroundColor = primaryColor;
			}
			alert(primaryColor); 
		}
		else{
			alert('Please enter the correct format of color! (Only HEX for now :p)')
		}		
}






