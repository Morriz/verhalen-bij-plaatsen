$(function(){

  var images = [
    "http://images.memorix.nl/rce/thumb/400x400/f31641dc-ca07-ef2a-d85f-fafa52899a84.jpg",
    "http://images.memorix.nl/rce/thumb/400x400/3b24017a-e7ed-c2dd-2452-207db67dc03e.jpg"
  ];

  /* Config */
  var canvas = $("#tiles");
  var xtiles = 3;
  var ytiles = 4;

  /* No touchy */
  var tiles = [];
  var xtilesize = 100/xtiles;
  var ytilesize = 100/ytiles

  function fill ()
  {
    tiles = [];
    canvas.empty();

    var w = canvas.width();
    var h = canvas.height();

    var current = {x:0,y:0};

    for( var index = 0; index < ((100/xtilesize)*(100/ytilesize)); index++ ) {
      var xpos = index%(100/xtilesize) * xtilesize;
      var ypos = Math.floor(index/(100/xtilesize)) * ytilesize;
      renderTile( xpos, ypos );
    }
  }

  setInterval( function () { fill(); }, 10000 );

  setInterval( function () {
    var tile = tiles[Math.floor(Math.random()*tiles.length)];
    var url = images[Math.floor(Math.random()*images.length)];
    tile.fadeTo( 100, 0, function () {
      tile.css( "background", "url("+ url +") no-repeat 50% 50%" );
      tile.fadeTo( 700, 1 );
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
      width: xtilesize + "%",
      height: ytilesize + "%"
    } );
    tiles.push( img );
    canvas.append(img);
    setTimeout( function () { img.fadeTo( 600, 1 ); }, Math.random()*500 );
  }

  fill();
});