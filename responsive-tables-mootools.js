window.addEvent('domready', function() {

    var switched = false;

    var updateTables = function() {
    
        if (window.getSize().x < 767 && !switched ){
        
            switched = true;
            
            $$("table.responsive").each(function(element) {
                splitTable(element);
            });

            return true;
        
        } else if (switched && window.getSize().x > 767) {
    
            switched = false;
            $$("table.responsive").each(function(element) {
                unsplitTable(element);
            });
        }
    };

    window.addEvent('load', updateTables );
    window.addEvent('resize', updateTables );
  
    function splitTable(original) {

        // Setup wrappers
        var wrapper    = new Element('div', { 'class': 'table-wrapper' }).inject(original,'after');
        var scrollable = new Element('div', { 'class': 'scrollable' }).inject(wrapper);
        var pinned     = new Element('div', { 'class': 'pinned' }).inject(wrapper);
 
        // Inject original into scrollable
        original.inject(scrollable);

        // Make fixed first column
        var copy = original.clone();
        copy.getElements("td:not(:first-child), th:not(:first-child)").setStyle("display", "none");
        copy.removeClass("responsive");
        copy.inject(pinned);
    }

    function unsplitTable(original) {
        
        // Get the wrapper
        var wrapper = original.getParent('.table-wrapper');
        
        // Remove the fixed first column
        wrapper.getElement(".pinned").destroy();

        // Replaces wrapper with original table
        var original = wrapper.getElement('.responsive');
        original.replaces(wrapper);
    }
});

