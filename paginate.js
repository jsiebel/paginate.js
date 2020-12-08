/*
 * https://github.com/jsiebel/paginate.js
 * 
 * Released under the MIT license.
 */

"use strict";

let pagination = {
	/** The number of rows of a table that is displayed at once. */
	perPage : 20,
	
	/** Controls if the navigation is shown above the table. */
	navigationAbove : false,
	
	/** Controls if the navigation is shown below the table. */
	navigationBelow : true,
	
	/** The structure of the navigation. */
	navigation : `
		<button data-target="current-1">◄ back</button>
		<span class="pagenumbers">
			<button data-target="first+0" data-limit="2">#</button>
			<button data-target="first+1" data-limit="3">#</button>
			<span data-limit="4">…</span>
			<button data-target="current-1" data-limit="1">#</button>
			<button data-target="current+0" data-limit="0">#</button>
			<button data-target="current+1" data-limit="-1">#</button>
			<span data-limit="-4">…</span>
			<button data-target="last-1" data-limit="-3">#</button>
			<button data-target="last-0" data-limit="-2">#</button>
		</span>
		<button data-target="current+1">next ►</button>
		<br />
		<a data-page="all">(show all)</a>
		`,
	
	initialize : function(){
		let style = document.createElement('style');
		style.type = 'text/css';
		document.head.appendChild(style);
		pagination.styleSheet = window.document.styleSheets[window.document.styleSheets.length-1];
		
		document.querySelectorAll('table.paginated').forEach(pagination.add);
	},
	
	styleSheet : null,
	
	nextTableIndex : 0,
	
	add : function(table){
		if (table.querySelector('tbody').children.length > pagination.perPage){
			let tableIndex = pagination.nextTableIndex++;
			let identifier = 'paginated-' + tableIndex;
			table.classList.add(identifier);
			table.dataset.paginateIndex = tableIndex;
			if (pagination.navigationAbove){
				table.parentNode.insertBefore(pagination.createNavigation(identifier), table);
			}
			if (pagination.navigationBelow){
				table.parentNode.insertBefore(pagination.createNavigation(identifier), table.nextSibling);
			}
			pagination.setPage(identifier, '0');
		}
	},
	
	createNavigation : function(identifier){
		let p = document.createElement('p');
		p.classList.add('paginateControls');
		p.classList.add(identifier);
		p.innerHTML = pagination.navigation;
		p.dataset.table = identifier;
		p.addEventListener('click', pagination.processEvent);
		return p;
	},
	
	processEvent : function(event){
		let button = event.target;
		let table = null;
		for (let node = button; node && !table; node = node.parentElement){
			table = node.dataset.table;
		}
		if (table && button.dataset.page){
			pagination.setPage(table, button.dataset.page);
			event.stopPropagation();
		}
	},
	
	setPage : function(identifier, position){
		let table = document.querySelector(`table.${identifier}`);
		let rule;
		if (position == 'all'){
			rule = `table.${identifier} tbody tr{}`;
		}else{
			let currentPage = parseInt(position);
			rule = `
				table.${identifier} tbody tr:nth-child(-n+${pagination.perPage*currentPage}),
				table.${identifier} tbody tr:nth-child(n+${pagination.perPage*(currentPage+1)+1}){
					display:none
				}`;
			pagination.updateControls(identifier, currentPage);
		}
		if (pagination.styleSheet.rules[table.dataset.paginateIndex]){
			pagination.styleSheet.deleteRule(table.dataset.paginateIndex);
		}
		pagination.styleSheet.insertRule(rule, table.dataset.paginateIndex);
	},
	
	updateControls : function(identifier, currentPage){
		let table = document.querySelector(`table.${identifier}`);
		let nItems = table.querySelector('tbody').children.length;
		let lastPage = Math.ceil(nItems/pagination.perPage) - 1;
		document.querySelectorAll(`p.${identifier} *`).forEach(node => {
			if (node.dataset.target){
				let match = node.dataset.target.match(/(first|current|last)(.*)/);
				if (match){
					let page = {
							first : 0,
							current : currentPage,
							last : lastPage
						}[match[1]]
						+ (parseInt(match[2]) || 0);
					node.dataset.page = Math.min(Math.max(0, page), lastPage);
				}
			}
			if (node.dataset.page){
				let page = parseInt(node.dataset.page);
				node.disabled = page == currentPage;
				if (/^(#|\d+)$/.test(node.innerText)){
					node.innerText = page + 1;
				}
			}
			if (node.dataset.limit){
				let limit = parseInt(node.dataset.limit);
				let visible = limit <= currentPage && currentPage <= lastPage+limit;
				node.style.display = visible ? '' : 'none';
			}
		});
	}
}

window.addEventListener("DOMContentLoaded", pagination.initialize);

function paginate(table){
	pagination.add(table);
}