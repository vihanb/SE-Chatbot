"use strict";function _toConsumableArray(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var Talk=function(t){document.getElementById("input").value=t,document.getElementById("sayit-button").click()},Data=function(t,e){return t.replace(/\$([A-Za-z$_]+[A-Za-z$_0-9]*)/g,function(t,n){return e[n]})},Chatbot=function t(){var e=arguments.length<=0||void 0===arguments[0]?"a Chatbot":arguments[0],n=this,a=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],r=a.Startup,u=void 0===r?"Hi my name is $Name!":r,s=arguments[2];_classCallCheck(this,t);var i=CHAT.CURRENT_USER_ID;this.Name=e,this.Options={Startup:Data(u,this),UID:i},this.onmessage=s||function(){},this.Queue=[];var o=Symbol("Called");this[o]=new Set,Talk(this.Options.Startup),setInterval(function(){Array.from(document.getElementsByClassName("message")).filter(function(t,e,a){return n[o].has(t)?!1:(n[o].add(t),(t.parentElement.parentElement.className.match(/user-(\d+)/)||[0,i])[1]!=i&&e>a.map(function(t){return t.textContent.trim()}).lastIndexOf(n.Options.Startup))}).forEach(function(t){return n.onmessage.call({Text:t.textContent.trim(),HTML:t.innerHTML,Raw:t,User:t.parentElement.parentElement.getElementsByClassName("username")[0].textContent.trim(),Mentions:[].concat(_toConsumableArray(t.querySelectorAll(".mention"))).map(function(t){return(t.textContext||"").slice(1)}),Speak:function(t){return n.Queue.push(t)},Reply:function(e){return n.Queue.push(":"+t.id.split("-")[1]+" "+e)},Star:function(e){return t.querySelector(".meta > .stars > .vote").click()},"super":n})})},2100),setInterval(function(){n.Queue[0]&&Talk(n.Queue.shift())},2500)};

var DICTIONARY = new Map([ // Define commands in this object
	["!!zhelp", "No help yet, but you can use !!zlistcommands."],
	["!!zlistcommands", "Commands: listcommands, alive"],
	["!!zalive", "Watching this endless feed of new messages never gets boring."],
	["!!zgoat", function(self) {
		// Im sorry about jQuery but I just quickly found this on SO
		$(document).ready(function(){
        		$.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?", {
        			tags: "goat",
        			tagmode: "any",
        			format: "json"
        		},
        		function(data) {
            			var rnd = Math.floor(Math.random() * data.items.length);
            			var image_src = data.items[rnd]['media']['m'].replace("_m", "_b");
            			self.Reply(image_src);
			});

    		});
	}]
]);

var MyChatbot = new Chatbot("a Chatbot", {Startup: "Hi my name is $Name!"}, function() {
	if(/hello/i.test(this.Text)) { this.Reply("Hello!"); }
	else if(this.Text.slice(0, 3) == "!!z") {
		var text = DICTIONARY.get(this.Text);
		if (typeof text === 'function') {
			// Call the function and pass this as arg and set as scope
			text.call(this, this);
		} else {
			this.Reply(text || "Unknown command")
		}
	}
});
