var menuTree = (function($){
	'use strict'
	var module = {
		$menuTree:null,

		/**
		 * Toggle (open/close) the node of the tree
		 * @param node {Node} node object of the tree
		 * @return {void}
		 */
		toggle: function(node){
			var command = (node.is_open) ? 'closeNode' : 'openNode';
			module.$menuTree.tree(command, node);
		},

		/**
		 * Get the node by its id. The id can be retrieved from the node-id on the node DOM
		 * @param  {Number} nodeId the id of the node
		 * @return {Node} the node object
		 */
		getNodeById: function(nodeId){
			return module.$menuTree.tree('getNodeById', nodeId);
		},

		/**
		 * add a listener that toggle the node to the node itself
		 */
		addToggleListener: function(){
			module.$menuTree.on('click', '.jqtree-custom-toggle', function(eq){
				var nodeId = $(eq.target).parent().data('node-id');
				var node = module.getNodeById(nodeId);
				module.toggle(node);
			});
		},

		/**
		 * Add a selected class and open the node. This indicates the node and (probably its children) are selected
		 * @param  {Array} the children/data that will be iterated. Can be the menuData or nodes
		 * @return {void}
		 */
		applySelected:function(children){
			if(typeof children !== 'undefined' && children !== null){

				for (var i = 0, len = children.length; i<len; i++) {
					var d = children[i];
					if(d.selected){
						var node = module.getNodeById(d.id);
						$(node.element).addClass('selected');
						module.$menuTree.tree('openNode', node);
						if(node.children.length > 0){
							module.applySelected(node.children);
						}
					}
				};
			}
		},

		/**
		 * Initialize the menu tree
		 * @param  {jQuery} $el it's the list element (i.e. ul) that will be the menu tree
		 * @param  {Array(JSONObject)} the data containing the structure of the tree
		 * @return {void}
		 */
		init: function($el, menuData){
			module.$menuTree = $el.tree({
			    data: menuData,
			    closedIcon: '',
			    openedIcon: '',
			    onCreateLi: function(node, $li) {
			        $li.find('.jqtree-title').wrap('<a href="#" class="jqtree-custom-toggle" data-node-id="' + node.id + '"></a>');
			    }
			});

			module.addToggleListener();

			//selected class
			module.applySelected(menuData);
		}
	};

	return {
		init: module.init
	};
}(jQuery));

$(function(){
	var menuData = [
	    {	
	    	id: 1,
	        label: 'MAC'
	    },
	    {
	        id:2,
	        label: 'Baiersdorf'
	    },
	    {
	    	id:3,
	    	label: 'DST',
	    	children: [
	    		{
	    			id:4,
	    			label: 'DST Child'
	    		}
	    	]
	    },
	    {
	    	id:5,
	    	label: 'Electrolux',
	    	children: [
	    		{
	    			id:6,
	    			label: 'Electrolux Child'
	    		}
	    	]
	    },
	    {
	        id:7,
	        label: 'Fox'
	    },
	    {
	        id:8,
	        label: 'Galderma'
	    },
	    {
	        id:9,
	        label: 'Investa'
	    },
	    {
	        id:10,
	        label: 'MCN'
	    },
	    {
	        id:11,
	        label: 'Merisant',
	        selected: true,
	        children: [
	        	{
	        		id: 12,
	        		label: 'Equal - APAC',
	        		selected: true,
	        		children:[{
	        			id:13,
	        			label: 'Design',
	        			selected: true
	        		}]
	        	}	
        	]
	    },
	    {
	    	id:14,
	    	label: 'Orchard',
	    	children: [
	    		{
	    			id:15,
	    			label: 'Orchard Child'
	    		}
	    	]
	    },
	    {
	    	id:16,
	    	label: 'Pfizer',
	    	children: [
	    		{
	    			id:17,
	    			label: 'Pfizer Child'
	    		}
	    	]
	    },
	    {
	    	id:18,
	    	label: 'Variety',
	    	children: [
	    		{
	    			id:19,
	    			label: 'Variety Child'
	    		}
	    	]
	    },
	    {
	    	id:20,
	    	label: 'Video Ezy'
	    }
	];
	
	//initialize the menu tree	
	menuTree.init($('.tree-view'), menuData);
});