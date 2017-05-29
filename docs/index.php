<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>Card Tabs demo</title>
        <link rel='stylesheet' href='jquery.selectspecify.css'>
        <link rel='stylesheet' href='jquery.select2.css'>
        <link rel='stylesheet' href='demo.css'>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <script type='text/javascript' src='jquery.selectspecify.js'></script>
        <script type='text/javascript' src='jquery.select2.js'></script>
    </head>
    <body>
        <?php if(isset($_GET['ajax'])){
            var_dump($_POST);
            die();}
        ?>

        <div class='dump'></div>

        <select class='st' style='width: 40%;'>
     <!--        <option role='load' data-value='1' data-attr='voorbeeld' /> 
            <option role='load' data-value='1' data-attr='voorbeeld' /> 
            <option role='load' data-value='1' data-attr='voorbeeld' />  -->
            <option value='1'>Apple</option>
            <option value='2'>Pear</option>
            <option value='3'>Orange</option>
        </select>


        <br /> 

            <a class='submit'>submit</a>
            <script type='text/javascript'>
                $('.st').selectSpecify({
                    'select2': true,
                    'noDuplicates': false
                });$('.st2').selectSpecify({
                    
                });
                $('.submit').click(function(){
                    $('.dump').load('index.php?ajax', {'examples': $('.st').data('storage')})
                })
            </script>
        </div>
    </body>
</html>