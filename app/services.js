var sys = require('sys')
  , _ = require('underscore')
  , xml2js = require('xml2js')
  , rest = require('restler')
  , myRedis = require('backbone-redis');

var utils = {
  createMyRedisPacket:function (type, id, extKey, callback) {
    // options can also be just an id int
    return {
      model:{
        id:id
      },
      options:{
        type:type,
        extKey:extKey,
        success:callback
      }
    };
  }
};

var reg = /<reproduction.reference>[a-f0-9-]*<\/reproduction.reference>/gi
  , services = {
    images:{
      get:function (args, options, callback) {
        var place = args[0]
          , limit = args[1] || 10
          , url = "http://cultureelerfgoed.adlibsoft.com/harvest/wwwopac.ashx?database=images&search=pointer%201009%20and%20monument.record_number->mB=%22" + place + "%22&limit=" + limit + "&xmltype=grouped";
        rest.get(url, {
//        parser:rest.parsers.xml
        }).on('complete', function (result) {
            console.log(url);
            if (result instanceof Error) {
              sys.puts('Error: ' + result.message);
              this.retry(5000); // try again after 5 sec
            } else {
              var res = result.match(reg);
              var list = _.map(res, function (item) {
                return item.substr(24, 36);
              });
              callback(list);
            }
          });
      }
    },
    stories:{
      get:function (args, options, callback) {
        var packet = utils.createMyRedisPacket('stories', args[0], null, callback);
        myRedis.read(null, packet);
      },
      create:function (args, options, callback) {
        var packet = utils.createMyRedisPacket('stories', args[0], null, callback);
        packet.model.story = args[1];
        myRedis.create(null, packet);
      }
    }
  };

module.exports = services;