var assert  = require('assert'),
    request = require('supertest'),
    app     = require('../app'),
    agent   = request.agent(app);

describe("routes", function(){
  describe("GET '/'", function(){
    it("renders index.jade", function(done){
      agent.get('/').expect(200, function(err, res){
        assert.equal(err, undefined);
        done();
      })
    })
  })

  describe("GET '/tutorial'", function(){
    it("renders tutorial.jade", function(done){
      agent.get('/tutorial').expect(200, function(err, res){
        assert.equal(err, undefined);
        done();
      })
    })
  })

  describe("GET '/about'", function(){
    it("renders index.jade", function(done){
      agent.get('/about').expect(200, function(err, res){
        assert.equal(err, undefined);
        done();
      })
    })
  })

})
