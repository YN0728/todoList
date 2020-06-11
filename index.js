// Click on a close button to hide the current list item
let close = document.getElementsByClassName("close");
let i;

// Add a "checked" symbol when clicking on a list item
let list = document.querySelectorAll('ul');
list[0].addEventListener('click', function(ev) {
	if (ev.target.tagName === 'LI') {
		ev.target.classList.toggle('checked');
	}
}, false);
list[1].addEventListener('click', function(ev) {
	if (ev.target.tagName === 'LI') {
		ev.target.classList.toggle('checked');
	}
}, false);
list[2].addEventListener('click', function(ev) {
	if (ev.target.tagName === 'LI') {
		ev.target.classList.toggle('checked');
	}
}, false);
list[3].addEventListener('click', function(ev) {
	if (ev.target.tagName === 'LI') {
		ev.target.classList.toggle('checked');
	}
}, false);

// Create a new list item when clicking on the "Add" button
function newElement(statusHeader = document.getElementById("statusHeader").value, inputValue = document.getElementById("myInput").value) {

	let filterSearch = document.getElementById("filterSearch").value;
	let li = document.createElement("li");
	let filterAdd = document.getElementById("filterAdd").value;
	li.setAttribute("data-filter", filterAdd);
	let t;
	t = typeof inputValue === "string"?document.createTextNode(inputValue):inputValue;
	let arrowRightSpan;
	let arrowLeftSpan;
	let arrowLeftSpanLast;
	li.appendChild(t);

	if (inputValue !== '') {
		arrowRightSpan = document.createElement("SPAN");
		arrowLeftSpan = document.createElement("SPAN");
		arrowLeftSpanLast = document.createElement("SPAN");
		arrowRightSpan.innerText = ">";
		arrowLeftSpan.innerText = "<";
		arrowLeftSpanLast.innerText = "<";
		arrowLeftSpan.className = "left";
		arrowLeftSpanLast.className = "left newLeft";
		arrowRightSpan.className = "right";
		if (statusHeader === "stuck") {
			li.appendChild(arrowRightSpan);
			document.getElementById("stuckList").appendChild(li);
		} else if (statusHeader === "todo") {
			li.appendChild(arrowLeftSpan);
			li.appendChild(arrowRightSpan);
			document.getElementById("todoList").appendChild(li);
		} else if (statusHeader === "inprogress") {
			li.appendChild(arrowLeftSpan);
			li.appendChild(arrowRightSpan);
			document.getElementById("progressList").appendChild(li);
		} else if (statusHeader === "done")  {
			li.appendChild(arrowLeftSpanLast);
			document.getElementById("doneList").appendChild(li);
		}
	}
	document.getElementById("myInput").value = "";

	var span = document.createElement("SPAN");
	var txt = document.createTextNode("\u00D7");
	span.className = "close";
	span.appendChild(txt);
	li.appendChild(span);

	if(filterSearch!=="all"){
		if(filterSearch!==filterAdd) li.style.display = "none";
	}


	for (i = 0; i < close.length; i++) {
		close[i].onclick = function() {
			var div = this.parentElement;
			div.style.display = "none";
			div.style.backgroundColor = "yellow";
		}
	}

	let rightFunction = document.getElementsByClassName("right");
	for (i = 0; i < rightFunction.length; i++) {
		rightFunction[i].onclick = function() {
			let div = this.parentElement;
			let parent = div.parentElement.id;
			div.style.display = "none";
			div.style.backgroundColor = "yellow";
			let inputValue = div.innerText;

			if(parent === "stuckList"){
				let t = document.createTextNode(inputValue.slice(0, -2));
				newElement("todo" ,t);
			}
			else if(parent === "todoList"){
				let t = document.createTextNode(inputValue.slice(0, -3));
				newElement("inprogress" ,t);
			}
			else if(parent === "progressList"){
				let t = document.createTextNode(inputValue.slice(0, -3));
				newElement("done" ,t);
			}
		}
	}

	let leftFunction = document.getElementsByClassName("left");
	for (i = 0; i < leftFunction.length; i++) {
		leftFunction[i].onclick = function() {
			let div = this.parentElement;
			let parent = div.parentElement.id;
			div.style.display = "none";
			div.style.backgroundColor = "yellow";
			let inputValue = div.innerText;

			if(parent === "todoList"){
				let t = document.createTextNode(inputValue.slice(0, -3));
				newElement("stuck" ,t);
			}
			else if(parent === "progressList"){
				let t = document.createTextNode(inputValue.slice(0, -3));
				newElement("todo" ,t);
			}
			else if(parent === "doneList"){
				let t = document.createTextNode(inputValue.slice(0, -2));
				newElement("inprogress" ,t);
			}
		}
	}
}

function Search() {
	let input, filter, li, i, txtValue;
	let filterAttributeValue;
	let filterSearch;
	input = document.getElementById("search");
	filter = input.value.toUpperCase();
	li = document.getElementsByTagName("li");
	filterSearch = document.getElementById("filterSearch").value;
	for (i = 0; i < li.length; i++) {
		txtValue = li[i].innerText;
		filterAttributeValue = li[i].getAttribute('data-filter');
		if(filter!==""){
			if (filterSearch === "all"){
				if(txtValue.toUpperCase().indexOf(filter) === -1) {
					li[i].style.display = "none";
					if(li[i].style.backgroundColor==="yellow") li[i].style.display = "none";
				}
				else {
					li[i].style.display = "";
					if(li[i].style.backgroundColor==="yellow") li[i].style.display = "none";
				}

			}
			else{
				if(filterSearch === filterAttributeValue){
					if(txtValue.toUpperCase().indexOf(filter) === -1) {
						li[i].style.display = "none";
						if(li[i].style.backgroundColor==="yellow") li[i].style.display = "none";
					}
					else {
						li[i].style.display = "";
						if(li[i].style.backgroundColor==="yellow") li[i].style.display = "none";
					}
				}
				else{
					if(li[i].style.backgroundColor==="yellow") li[i].style.display = "none";
				}
			}
		}
		else{
			if (filterSearch === "all"){
				li[i].style.display = li[i].style.backgroundColor==="yellow"?'none':"";
			}
			else{
				if(filterSearch === filterAttributeValue){
					li[i].style.display =li[i].style.backgroundColor==="yellow"?"none":"";
				}
				else li[i].style.display = "none";
			}
		}
		if(li[i].style.backgroundColor==="yellow") li[i].style.display = "none";

	}
}

function filterBYTasks() {
	let input, li, filterAttributeValue;
	input = document.getElementById("filterSearch").value;
	li = document.getElementsByTagName("li");
	for (let i = 0; i < li.length; i++) {
		filterAttributeValue = li[i].getAttribute('data-filter');
		li[i].style.display = filterAttributeValue === input ||  input === 'all'? ""  : 'none';
		if(li[i].style.backgroundColor==="yellow") li[i].style.display = "none";
	}
}