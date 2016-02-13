'use strict'

var _ = require('lodash'),
  fs = require('fs'),
  inspect = require('util').inspect;

module.exports.parse = processLine
module.exports.test = test

var filter = {};

var filterFiles = fs.readdirSync('edi-parser/parsers/keys/')
filterFiles.forEach(function(file){
  filter[file.replace('.js', '')] = require('./keys/' + file.replace('.js', ''))
})

function processLine(line, key){
  if(filter[key]){
    var slice = {},
      segments = line.split('*').splice(1);
    if(line.split('*')[0] !== key){ 
      throw new TypeError('Not valid '+ key +'  line') 
    }else{
    for(var i=0, j=segments.length; i<j; i++){
      if(filter[key]){
        slice[filter[key][i]] = segments[i].trim()        
      }
    }
    return slice
    }
  }else {
    return null
  }
  
}

function test(key){
  if(filter[key]){
    return true
  }else{
    return null
  }
}