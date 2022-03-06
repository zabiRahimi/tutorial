<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'tutorial') }}</title>

    <!-- Scripts -->
    <!-- <script src="{{ asset('js/app.js') }}" defer></script> -->

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

    <!-- Styles -->
    <!-- <link href="{{ asset('css/prism.css') }}" rel="stylesheet"> -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>

<body>
    <div>
        @yield('content')

    </div>
    <script src="https://kit.fontawesome.com/a076d05399.js" crossorigin="anonymous"></script>
    <!-- <script src="{{ asset('js/prism.js') }}" data-manual></script> -->
    <script src="{{ asset('js/app.js') }}" defer></script>
    <!-- <script src="//s3-us-west-1.amazonaws.com/xinha/xinha-latest/XinhaEasy.js" type="text/javascript">
        xinha_options = {
            _editor_lang: 'fr',
            _editor_skin: 'blue-look',
            xinha_editors: 'textarea.xinha',
            xinha_plugins: ['minimal', 'TableOperations'],
            xinha_config: function(xinha_config) {
                xinha_config.Events.onKeyPress = function(e) {
                    //do something 
                    console.log(e.target.id);
                    // this.handleElement(e);
                    return true;
                }
            }

        }
    </script> -->
    <!-- <script  >
         xinha_config.Events.onInput = function (e) 
    {
       //do something 
       return true;
    }
    </script> -->
</body>

</html>