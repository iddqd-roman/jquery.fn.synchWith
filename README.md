# jquery.fn.synchWith

<p>
  Using this function you can synchronize your inputs that are placed outside of your form.
  It creates instances of "input[type=hidden]" with the same data ("name" and "value") as your fields have and adds
  to the specified form (or multiple forms). If this "copy" already exists, just copies "value" and adds to existing field.
</p>

<h2>Usage: </h2>

<code>
  $('#city, #address')
    .synchWith('#form-1, #form-2', 'Test')
    .on('keyup', function(){
      $(this).trigger('synch');
    });
</code>
