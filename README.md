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
After being send to the server, to PHP via AJAX for example, the example shown above (with apple being selected, with the attribute pear), looks like this:

```
array (size=1)
  0 => 
    array (size=2)
      'value' => string '1' (length=1)
      'keyword' => string 'cake' (length=4)
```
