jQuery.fn.synchWith = function(form_selector, prefix){
        return jQuery(this).each(function(){
            var field = jQuery(this);

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

            var field_name = field.attr('name'),
                full_field_name = generateFullFieldName(field_name, prefix),
                field_value = field.val(),
                hidden_copy_selector = 'input[name="' + full_field_name + '"]';


            jQuery(form_selector).each(function(){
                var form = jQuery(this),
                    _prefix;

                if(prefix !== undefined){
                    if(typeof prefix === 'function'){
                        _prefix = prefix(form);
                        full_field_name = generateFullFieldName(field_name, _prefix);
                        hidden_copy_selector = 'input[name="' + full_field_name + '"]';
                    }
                }

                hidden_copy = form.find(hidden_copy_selector);

                if(!hidden_copy.length){
                    hidden_copy = jQuery('<input name="' + full_field_name + '" value="' + field_value + '" type="hidden">');
                    hidden_copy.appendTo(form);
                }

                hidden_copy.val(field_value);
            });
        });
    };
