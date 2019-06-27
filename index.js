// selectin all the elements
var allToDo = JSON.parse(localStorage.getItem('toDoDragDrop')) || [];
var inputBox = document.querySelector('.inputBox');
var button = document.querySelector('.clickToAdd');



// function for storing all the list.
function storeTask(){
	console.log(inputBox.value);
	if(inputBox.value) {
		var newToDo = {
			toDoText: inputBox.value
		};
		allToDo.push(newToDo);
		inputBox.value = '';
		// localStorage.setItem('toDoDragDrop', JSON.stringify(allToDo));
		displayToDo(allToDo);
	}
}

//handle Enter.
function handleEnter(e){
	if (e.keyCode === 13){
		storeTask();
	}
}

// drag and drop handling.
var cols = document.querySelectorAll('.draggable');
console.log(cols);
var previousElm = null;
var PrevIndex = null;
function handleDragStart(e) {
	e.target.style.opacity = "0.1";
	// e.target.style.width = '400px';
	previousElm = e.target;
	prevIndex = e.target.dataset.id;
	e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragEnter(e){
	this.classList.add('over');
}

function handleDragOver(e){
	if (e.preventDefault) {
    e.preventDefault(); // Necessary. Allows us to drop.
  }
  e.dataTransfer.dropEffect = 'move';// See the section on the DataTransfer object.
  e.target.style.opacity = "1";
  return false;
}

function handleDragLeave(e){
	this.classList.remove('over');
}

function handleDrop(e){
	 if (e.stopPropagation) {
    e.stopPropagation(); // stops the browser from redirecting.
  }
  if (previousElm != this) {
  	let currentIndex = this.dataset.id;
    previousElm.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData('text/html');
    e.target.style.opacity = "1";
  	swap(prevIndex,currentIndex);
  }
  return false;
}

function swap(first,second){
	let temp = allToDo[first];
	allToDo[first] = allToDo[second];
	allToDo[second] = temp;
  prevIndex = null;
  displayToDo(allToDo);
}

function handleDragEnd(e){
	cols.forEach((col, index) => {
    col.classList.remove('over');
    col.style.opacity = "1";
    // e.target.style.width = '300px';
  });
}

// function changingIndex(e){
// 	// var index = 
// }


// funtion to display all to do lists.
function displayToDo(lists) {
	localStorage.setItem('toDoDragDrop', JSON.stringify(allToDo));
	if(lists){
  var ul = document.querySelector('ul');
  ul.innerHTML = '';
  lists.forEach((value, index) => {
  	var liElm = document.createElement('li');
  	var span = document.createElement('span');
  	liElm.setAttribute('data-id', index);
  	span.textContent = value.toDoText;
  	liElm.setAttribute('draggable', true);
  	liElm.classList.add('draggable');
  	liElm.appendChild(span);
  	ul.appendChild(liElm);
  	liElm.addEventListener('dragstart', handleDragStart);
		liElm.addEventListener('dragenter', handleDragEnter);
		liElm.addEventListener('dragleave', handleDragLeave);
		liElm.addEventListener('dragover', handleDragOver);
		liElm.addEventListener('drop', handleDrop);
		liElm.addEventListener('dragend', handleDragEnd);


  // 	cols.forEach((elements,index) => {
		// 	elements.addEventListener('dragstart', handleDragStart);
		// 	elements.addEventListener('dragenter', handleDragEnter);
		// 	elements.addEventListener('dragleave', handleDragLeave);
		// 	elements.addEventListener('dragover', handleDragOver);
		// 	elements.addEventListener('drop', handleDrop);
		// 	elements.addEventListener('dragend', handleDragEnd);
		// });
});
}
}
displayToDo(allToDo);
// // drag and drop handling.
// var cols = document.querySelectorAll('.draggable');
// console.log(cols);
// var previousElm = null;

// function handleDragStart(e) {
// 	console.log(e, "handleDragStart");
// 	e.target.style.opacity = "0.1";
// 	previousElm = e.target;
// 	e.dataTransfer.effectAllowed = 'move';
//   e.dataTransfer.setData('text/html', this.innerHTML);
// }

// function handleDragEnter(e){
// 	console.log(e, "handleDragEnter");
// 	this.classList.add('over');
// }

// function handleDragOver(e){
// 	console.log(e, "handleDragOver");
// 	if (e.preventDefault) {
//     e.preventDefault(); // Necessary. Allows us to drop.
//   }
//   e.dataTransfer.dropEffect = 'move';// See the section on the DataTransfer object.
//   e.target.style.opacity = "1";
//   // e.target.style.border = "1px solid red";
//   console.log(e.target.style.background);
//   return false;
// }

// function handleDragLeave(e){
// 	console.log(e, "handleDragLeave");
// 	this.classList.remove('over');
// }

// function handleDrop(e){
// 	console.log(e, "handleDrop");
// 	 if (e.stopPropagation) {
//     e.stopPropagation(); // stops the browser from redirecting.
//   }
//   if (previousElm != this) {
//     previousElm.innerHTML = this.innerHTML;
//     this.innerHTML = e.dataTransfer.getData('text/html');
//     e.target.style.opacity = "1";
//   }
//   return false;
// }

// function handleDragEnd(e){
// 	console.log(e, "handleDragEnd");
// 	cols.forEach((col, index) => {
//     col.classList.remove('over');
//     col.style.opacity = "1";
//   });
// }

// cols.forEach(elements => {
// 	elements.addEventListener('dragstart', handleDragStart);
// 	elements.addEventListener('dragenter', handleDragEnter);
// 	elements.addEventListener('dragleave', handleDragLeave);
// 	elements.addEventListener('dragover', handleDragOver);
// 	elements.addEventListener('drop', handleDrop);
// 	elements.addEventListener('dragend', handleDragEnd);
// });

//event listener for enter.
document.addEventListener('keydown', handleEnter);
//event listener for button.
// button.addEventListener('click', storeTask);


