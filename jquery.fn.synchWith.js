jQuery.fn.synchWith = function(form_selector, common_prefix){
    // Generate full name for each field in appropriate form
    var generateFullFieldName = function(str, prefix){
        if(prefix === undefined){
            return str;
        }
        if(typeof prefix !== 'string'){
            return str;
        }
        var f_name = str.replace(/\[\w+\]/g, ''),
            f_subnames = f_name.length === str.length ? '' : str.substring(f_name.length);
        return prefix + '[' + f_name + ']' + f_subnames;
    };

    // Affect each field
    return jQuery(this).each(function(){
        var field = jQuery(this);

        var field_name = field.attr('name'),
            field_value = field.val(),
            hidden_copies = [];
        
        // Affect each form
        jQuery(form_selector).each(function(){
            var form = jQuery(this),
                data_prefix = form.data('prefix'),
                _prefix = data_prefix !== undefined ? data_prefix : common_prefix,
                full_field_name = generateFullFieldName(field_name, _prefix),
                hidden_copy_selector = 'input[name="' + full_field_name + '"]';
            
            hidden_copy = form.find(hidden_copy_selector);
            if(!hidden_copy.length){
                hidden_copy = jQuery('<input name="' + full_field_name + '" value="' + field_value + '" type="hidden">');
                hidden_copy.appendTo(form);
            }
            hidden_copies.push(hidden_copy);
        });

        // Create "synch" event for every affected input
        field.on('synch', function(){
            var i, l = hidden_copies.length;
            for(i = 0; i < l; i++){
                hidden_copies[i].val(this.value);
            }
        }).trigger('synch');
    });
};
