# SelectSpecify
SelectSpecify is a jQuery-plugin that turns a select-element into a linking table that allows for an extra attribute, such as a keyword or any other extra attribute of the link.

![](https://github.com/blekerfeld/SelectSpecify/blob/master/docs/images/image1.PNG?raw=true)

## Requirements
* jQuery 1.3+
* Clone the repository (or alternativly download its content) and add `jquery.selectspecify.js` and `jquery.selectspecify.css` to your page

# Simple usage

## HTML

```html
<select class='example'>
  <option value='1'>Apple</option>
  <option value='2'>Pear</option>
</select>
```

## Javascript

```html
<script type='text/javascript'>
  $('.example').SelectSpecify();
</script>
```

### Getting the value

The links (and attributes) are stored inside a javascript object that can be accessed like this:

```html
<script type='text/javascript'>
  $('.example').data('storage');
</script>
```

After being send to the server, to PHP via AJAX for example, the example shown above (with 'apple' being selected, the being attribute 'cake'), looks like this:

```
array (size=1)
  0 => 
    array (size=2)
      'value' => string '1' (length=1)
      'keyword' => string 'cake' (length=4)
```

# Options

## Pre-loaded items

Preloading options is a bit more complex than just giving `selected` attributes to the options, because SelectSpecify allows the same option to be selected more than once. Preloaded options need to be specified seperatly within the select element like this:

```html
<select class='example'>
  <option role='load' data-value='1' data-attr='cake' /> 
  <option value='1'>Apple</option>
  <option value='2'>Pear</option>
</select>
``` 

`<option>` elements with a ` role='load' ` attribute, are rendered as pre-loaded values, the `data-value` attribute holds the value, that means there needs to be a regular option-element with the same value. The `data-attr` attribute holds the specification (i.e. the keyword).
