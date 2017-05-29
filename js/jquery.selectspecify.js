/*!
 * SelectSpecify jQuery plugin
 * https://github.com/blekerfeld/cardtabs
 *
 * Released under the MIT license
 */

jQuery.fn.selectSpecify = function(options){


	var mainClass =  $(this).attr('class');
	var count = 0;
	var currentID = 1;
	var selectedID = 0;
	var recentDeleted = 0;
	var settings = $.extend({
        theme: '',
        noDuplicates: false, 
        attributeName: 'keyword',
        attributeSurface: 'Keyword',
        attributeElement: '<input />',
        prompt: 'Link existing items',
        addButtonText: 'Add',
        addButtonClass: '',
        saveButtonText: 'Save',
        saveButtonClass: '',
        select2: false,
        select2options: {},
        placeholder: 'Add items',
     }, options );
	var storage = [];
	var tagsSaved = [];

	// First we need to get the select box that is the main element, clone it and remove the data-options from
	// the original, then copy the original element's inner html.
	var selectClone = $('.' + mainClass).clone();
	$('.' + mainClass).children('option[data-value]').each(function(){
		$(this).remove();
	});
	var selectBoxHtml = $('.' + mainClass).html();

	// Now it's time to build a div with everything we need
	$('.' + mainClass).replaceWith($('<div />').addClass(mainClass).addClass('select-specify').append());
	$('.' + mainClass).append($('<div />').addClass('items'));
	$('.' + mainClass + ' .items').append($('<span />').addClass('placeholder').html(settings.placeholder));
	$('.' + mainClass).append($('<div />').addClass('input-bar'));
	$('.' + mainClass + ' .input-bar').append($('<span />').addClass('value').append($('<select />').addClass('proper-select').html(selectBoxHtml))).append(' ');
	$('.' + mainClass + ' .input-bar').append($('<span />').addClass('keyword').append(settings.attributeSurface + ': ').append($(settings.attributeElement).addClass('proper-keyword'))).append('<br />');
	$('.' + mainClass + ' .input-bar').append($('<a />').attr('href', 'javascript:void(0);').addClass('add ' + settings.addButtonClass).html(settings.addButtonText));

	// Calling select2 if needed
	if(settings.select2 == true){
		$('.' + mainClass + ' .input-bar select.proper-select').select2(settings.select2options);
	}


	function createItem(attr, value){
		$('.' + mainClass + '.placeholder').hide();
		var valueText = $('.' + mainClass + ' .proper-select option[value="' + value + '"]').html();
		$('div.' + mainClass + ' .items').append(
			$('<div/>')
		    .attr({'id' : currentID, 'data-value': value, 'data-attr': attr})
 		    .addClass("item item-" + currentID)
 		    .append($('<span/>').attr('role', 'remove').attr('id', currentID).append(' x '))
 		    .append($('<span/>').addClass('value').html(valueText))
 		    .append(' ')
 		    .append($('<span/>').addClass('attr').html(attr))
		);
		currentID++;
		$('.' + mainClass + ' .items').on('click', 'div.item span[role="remove"]', function(){
			$('.' + mainClass + ' .items .item-' + $(this).attr('id')).slideUp(100).remove();
			update();
			$('.' + mainClass + ' .input-bar .proper-keyword').val('');
			selectedID = 0;
			count--;
			$('.' + mainClass + ' .input-bar .proper-keyword').blur().val('');
			recentDeleted = $(this).attr('id');
		});
		$('.' + mainClass + ' .items').on('click', 'div.item', function(){
			doFocus($(this));
		});
		update();
		count++;
	}

	// First we need to find out if there are any preselected options, then select them thus
	selectClone.children('option[role="load"]').each(function(){
		createItem($(this).data('attr'), $(this).data('value'));

	});



	// Adding existing translations
	$('.' + mainClass + ' .add').click(function(){

		if(selectedID != 0){
			$('.' + mainClass + ' .items .item-' + selectedID).remove();
		}

		var value = $('.' + mainClass + ' .input-bar .proper-select').val();
		var attr = $('.' + mainClass + ' .input-bar .proper-keyword').val();
		
		currentID++;

		var $children = $('.items').find('.item[data-value="' + value + '"]');

		if($children.length != 0 && settings.noDuplicates){
			// do something that gives the error.
			return false;
		}

		createItem(attr, value);

		$('.' + mainClass + ' .input-bar .proper-keyword').val('');

		$('.' + mainClass + ' .input-bar .add').html(settings.addButtonText);

		selectedID = 0;

	});
	
	function update(){
		storage = [];
		
		count = 0;

		$('.' + mainClass + ' .items').children('div.item').each(function(){
				pushThis = {};
				pushThis['value'] = $(this).data('value'),
				pushThis[settings.attributeName] = $(this).data('attr'),
				storage.push(pushThis);
				count++;
			}
		);
		
		$('.' + mainClass).data('storage', storage);
		
		selectedID = 0;

		if(count == 0){
			$('.' + mainClass + ' .placeholder').show();
		}
		else{
			$('.' + mainClass + ' .placeholder').hide();
		}

	}


	function doFocus(obj){
		selectedID = 0;
		if(recentDeleted === obj.attr('id')){
			return false;
		}
		$('.' + mainClass + ' .item.selected').removeClass('selected');
		if(selectedID === obj.attr('id')){
			doUnfocus(obj);
			return false;
		}
		obj.addClass('selected');
		selectedID = obj.attr('id');
		$('.' + mainClass + ' .proper-select').val(obj.data('value'));
		$('.' + mainClass + ' .input-bar .proper-keyword').val(obj.data('attr'));
		$('.' + mainClass + ' .input-bar .proper-keyword').focus();
		$('.' + mainClass + ' .input-bar .add').html(settings.saveButtonText);
	}
	

	function doUnfocus(obj){
		obj.removeClass('selected');
		$('.' + mainClass + ' .input-bar .proper-keyword').val('');
		selectedID = 0;
		$('.' + mainClass + ' .input-bar .add').html(settings.addButtonText);
	}


 	return this;
};
