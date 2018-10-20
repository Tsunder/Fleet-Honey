'use strict';

(function( top, doc) {
var doc = document;
var showAllResourceValues = false;

combatLinks(doc);
combatConsumables(doc);
refreshChatButton(doc);
buildingTrade(doc);

if(showAllResourceValues) {
	displayResources(doc)
}

}) (top, document)


//turns the entire target into a combat link.
//might not work nice with pilots?
function combatLinks(doc){
	var targetsHTML = doc.querySelectorAll("a[href^='/nav.php?action=combat']")
	for(var i = 0; i < targetsHTML.length; i++) {
		targetsHTML[i].parentNode.innerHTML = targetsHTML[i].parentNode.innerHTML.replace("</a>","") + "</a>";
	}
}


//adds consumables to near the attack button
//for the moment autofills the cells button with 1 shield cell
function combatConsumables(doc){
   var attackHTML = doc.querySelector("button[value*='Attack']")
   if (attackHTML) {
	   attackHTML.parentNode.insertBefore(buildConsumablesHTML(), attackHTML.parentNode.childNodes[0])
	}

	function buildConsumablesHTML() {
		var cells = doc.querySelector("a[href='/nav.php?action=shield_cells']")
		var bots = doc.querySelector("a[href='/nav.php?action=nanobots']")
		
		if (!bots && !cells) {
			return;
		}

		var table = document.createElement('table');
		table.setAttribute('class', 'tin');
		table.innerHTML = "<tbody>";

		if (bots) {
			var _botsCount = bots.innerHTML.split(" ")[0]

			var _nanoQty = ""
			var _botsForm = doc.getElementById("botsForm");
			if (_botsForm) {
				_nanoQty = _botsForm.firstElementChild.getAttribute("value");
			}
			table.innerHTML += '<tr><td align="right"><a href="/nav.php?action=nanobots"><img src="/img/goods/nanobots.x32.png"> Bots: ' + _botsCount + '</a><form style="display:inline" name="botsForm" id="botsForm" method="POST" action="/nav.php"><input type="text" name="nanoqty" value="' + _nanoQty +'" size="4" class="DYN_S"> <input class="DYN_S" type="submit" value="Use"></form> </td></tr>';
		}
		if (cells) {
			var _cellsCount = cells.innerHTML.split(" ")[0]
			var _cellsQty = 1;
			var _cellsForm = doc.getElementById("cellsForm");
			if (_cellsForm) {
				_cellsQty = Math.max(_cellsForm.firstElementChild.getAttribute("value"),1);
			}
			table.innerHTML += '<tr><td align="right"><a href="/nav.php?action=shield_cells"><img src="/img/goods/shieldcells.x32.png"> Cells: ' + _cellsCount + '</a><form style="display:inline" name="cellsForm" id="cellsForm" method="POST" action="/nav.php"><input type="text" name="cellsqty" value="' + _cellsQty +'" size="4" class="DYN_S"> <input class="DYN_S" type="submit" value="Use"></form></td></tr>';
		}
		table.innerHTML += '</tbody>'
		return table;
}

}

//honestly an eyesore.
function displayResources(doc) {
	var resources = doc.querySelectorAll("img[title*='Resources']")
	for (var i = 0; i < resources.length; i++) {
		var amount = resources[i].getAttribute("title").split(': ')[1];
		amount = amount.substring(0,amount.indexOf(" ") + 3);
		resources[i].insertAdjacentHTML("beforebegin",amount);
	}
}

//adds a refresh button to the chat
function refreshChatButton(doc){
	var clearBtn = doc.querySelector("input[onclick*='clear_chat']")
	if (clearBtn) {
		clearBtn.insertAdjacentHTML("afterend",'<button onclick="window.location.reload()" class="DYN_S"> Refresh</button>');
	}
}

//add button to populate all trade fields for buildings and trade
//add option to only populate and not trade
//add colours to inputs and outputs.
//moves remove button to become harder to use
function buildingTrade(doc){
	addAutoBuildingTradeButton();
}

function addAutoBuildingTradeButton(){

}