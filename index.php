<!doctype html>
<html lang="en">
	<head>
  		<meta charset="utf-8">

		<title>Trello uploader</title>
		<meta name="description" content="Trello uploader">
		<meta name="author" content="SitePoint">

		<link rel="stylesheet" href="styles.css?v=1.0">
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">

		<!--[if lt IE 9]>
		<script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
		<![endif]-->
		<script src="http://code.jquery.com/jquery-1.7.1.min.js"></script>
		<script src="https://api.trello.com/1/client.js?key=f0232b37cba133351f64c578935cfffb"></script>
	</head>
	<body>
  		<div class="header well">
  			<h2>Trello task uploader</h2>
  		</div>
  		<div class="well">

			<div id="loggedout">
	  			<a class="btn-default btn-small" id="connectLink" href="#">Connectar a trello</a>
			</div>

			<div id="loggedin">
	  			<div id="header">
	    			Conectado como:  <span id="fullName"></span>
	    			<a class="btn-default" id="disconnect" href="#">Cerrar sesión</a>
	  			</div>
	  			<h2>Listado de tableros disponibles</h2>
	  			<div id="output-boards"></div>
	  			<h2>Listado de tarjetas cargadas para agregar a trello</h2>
	  			<div id="output-newcards">

	  			</div>
	  			<h2>Listas de tarjetas</h2>
	  			<div id="output-lists">

	  			</div>
	  			
	  			

	  			<div id="form-step">
	  				<button id="btn-step" value="Siguiente">Ver tarjetas</button>
	  				<button id="btn-step2" value="Ver listas" style="display:none;">Ver listas</button>
	  				<button id="btn-step3" value="Agregar tarjetas" style="display:none;">Agregar tarjetas</button>
	  			</div>
	  			<script src="scripts.js"></script>
			</div>
  		</div>		
	</body>
</html>
