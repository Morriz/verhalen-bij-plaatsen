$(function(){

  var images = [
    "http://images.memorix.nl/rce/thumb/400x400/f31641dc-ca07-ef2a-d85f-fafa52899a84.jpg",
    "http://images.memorix.nl/rce/thumb/400x400/3b24017a-e7ed-c2dd-2452-207db67dc03e.jpg"
  ];

  var canvas = $("#tiles");
  var tilesize = 20;
  var tiles = [];

  function fill ()
  {
    var w = canvas.width();
    var h = canvas.height();

    var current = {x:0,y:0};

    for( var index = 0; index < Math.pow(100/tilesize, 2); index++ ) {
      var ratio = 100/tilesize;
      var xpos = (index%ratio) * tilesize;
      var ypos = Math.floor(index/ratio) * tilesize;
      renderTile( xpos, ypos );
    }
  }

  setInterval( function () {
    var tile = tiles[Math.floor(Math.random()*tiles.length)];
    var url = images[Math.floor(Math.random()*images.length)];
    tile.fadeTo( 100, 0, function () {
      tile.css( "background", "url("+ url +") no-repeat 50% 50%" );
      tile.fadeTo( 500, 1 );
    } );
  }, 2000 );

  function renderTile( xpos, ypos  )
  {
    var url = images[Math.floor(Math.random()*images.length)];
    var img = $("<div></div>").css( {
      background: "url("+ url +") no-repeat 50% 50%",
      opacity: 0,
      position: "absolute",
      top: ypos + "%",
      left: xpos + "%",
      width: tilesize + "%",
      height: tilesize + "%"
    } );
    tiles.push( img );
    canvas.append(img);
    setTimeout( function () { img.fadeTo( 600, 1 ); }, Math.random()*500 );
  }

  fill();
});