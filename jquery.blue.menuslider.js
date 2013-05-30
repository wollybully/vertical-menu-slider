

(function($) {

	$.fn.blueMenuSlider = function(options) {

		//defaults are below
		var settings = $.extend({}, $.fn.blueMenuSlider.defaults, options);
		
		//some global variables needed
		var menucontainer;
		var menuwrapper;
		
		//go through each menu to be paginated on page
		this.each(function() {
			menucontainer = $(this);
			var items = menucontainer.find(settings.listElement).length;
			
			//create additional elements, and set some styles
			menuwrapper = menucontainer.find(settings.listContainer).wrap('<div class="wrapper" />').parent();
			
			//are there enough items for pagination?
			if (items > settings.itemsShown) {
				
				//some variables needed
				var pages = parseFloat((items / settings.itemsShown));
				var containerheight = getHeightOfElementsToBeShown(menuwrapper, 1, settings.itemsShown) - 1;// -1 = ONLY TO HIDE THE BOTTOM BORDER OF THE LAST ITEM SHOWING (for this demo only)
				
				//set some css for the menuwrapper
				menuwrapper.height(containerheight);
				
				//create pagination
				createPagination(pages);
				
				//set functionality for pagination click
				onPaginationClick();
			}
			
		});
		
		//get total height of collection of elements
		function getHeightOfElementsToBeShown(container, start, end) {
			var height = 0;
			var containers = container.find(settings.listElement).slice(start-1, end);
			containers.each(function(e) {
				height += $(this).outerHeight();
			});
			
			return height;
		}
		
		//creates pagination links
		function createPagination(pages) {
			
            var pagination = $("<div></div>").addClass("pagination");
			
			//create pagination links
            for (var i = 1; i < pages+1; i++) {
                var pagelink = $("<a></a>").attr("href", "#" + i).text(i).appendTo(pagination);
				if (i == 1) { pagelink.addClass("selected"); }
            }
			
			//append pagination to menu
            pagination.appendTo(menucontainer);
				
		}
		
		//slide between items when pagination links are clicked
		function onPaginationClick() {
			
			$(".paginate .pagination a").click(function(e) {
				e.preventDefault();
				var currentmenu = $(this).parents(".paginate");
				
			  	var menulist = currentmenu.find(".wrapper " + settings.listContainer);
				var pagenr = $(this).attr("href").split("#")[1];
				var start = (settings.itemsShown * parseInt(pagenr)) - settings.itemsShown + 1;
				var end = start + settings.itemsShown - 1;
				var containerheight = getHeightOfElementsToBeShown(menulist, start, end) - 1; // -1 = ONLY TO HIDE THE BOTTOM BORDER OF THE LAST ITEM SHOWING (for this demo only)
				
				//set/remove selected styles
				currentmenu.find(".pagination a.selected").removeClass("selected");
				$(this).addClass("selected");
				
				//animate new height and new page
				animateToPage(menulist, pagenr, containerheight);
				
			});
		}
		
		//animation for menuheight and new menu page
		function animateToPage(menulist, toposition, containerheight) {
			
			var currentposition = menulist.css("top");
			var firstitem = (toposition * settings.itemsShown) - settings.itemsShown;
			var newposition = getHeightOfElementsToBeShown(menulist, 1, firstitem);
			
			//animate!
			menulist.animate({ top: -newposition }, settings.animationTime);
			menulist.parent().animate({ height: containerheight }, settings.animationTime);
		}
		
	};
	
	//default settings
	$.fn.blueMenuSlider.defaults = {
		listContainer: "ul",
		listElement: "li",
		itemsShown: 5,
		animationTime: 500
	};

})(jQuery);