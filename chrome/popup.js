var	connectBtn = document.getElementById("connect_btn"),
	host = document.getElementById("host");
connectBtn.onclick = function(){
	chrome.tabs.create({url:host.value});
}