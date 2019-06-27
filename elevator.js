function elevator(left, right, call) {
var firstLeft = Math.abs(left - call);
var secondRight = Math.abs(right - call);
console.log(firstLeft);
console.log(secondRight);
  if(left === right){
	console.log('l === r');
  	return "right";
  } else if (right === call){
	console.log('r === call');
	return "right";
  } else if(left === call) {
	console.log('l === call');
	return "left";
}else if (firstLeft > secondRight){
	return 'left';
}else if (firstLeft <= secondRight){
	console.log('frl === ser');
	return "right";
} else if(firstLeft < secondRight){
	console.log('frl < ser');
	return "left";
} else return 'right';
}
