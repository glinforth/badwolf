/**
 * Created by glinforth on 18/04/14.
 */

var chai = require('chai'),
    expect = chai.expect,
    sinon = require('sinon'),
    dalek = require('./dalek');

chai.use(require('sinon-chai'));
require('mocha-sinon');

describe('dalek', function() {
    describe('beforeNight', function() {
       it('should be safe', function(done) {
           var me = {};
           dalek.beforeNight(me);
           expect(me).to.have.property('isSafe').to.be.true;
           done();
       }) 
    });
    describe('doNight', function(){
        it('should emit a getTarget', function(done) {
            var g = {
                emit: sinon.stub()
            };
            var fn = sinon.stub();
            dalek.doNight(g, 0, fn);
            expect(g.emit).to.be.calledWith('gettarget');
            done();
        });
        it('should emit a getTarget on night 1', function(done) {
            var g = {
                emit: sinon.stub()
            };
            var fn = sinon.stub();
            dalek.doNight(g, 1, fn);
            expect(g.emit).to.be.calledWith('gettarget');
            done();
        });
        it('should emit a getTarget on night 2', function(done) {
            var g = {
                emit: sinon.stub()
            };
            var fn = sinon.stub();
            dalek.doNight(g, 2, fn);
            expect(g.emit).to.be.calledWith('gettarget');
            done();
        });
    });

    describe('chooseTarget', function() {
        it('should add a player to the death list', function(done) {
            var p = {};
            var me = {};
            dalek.chooseTarget(me, p);
            expect(p.toBeKilled).to.be.true;
            done();
        });
        it('should not add an already killed player to the death list', function(done) {
            var p = {
                isDead: true
            };
            var me = {};
            dalek.chooseTarget(me, p);
            expect(p.toBeKilled).to.be.not.true;
            done();
        });
        it('should not add a protected player to the death list', function(done) {
            var p = {
                isSafe: true
            };
            var me = {};
            dalek.chooseTarget(me, p);
            expect(p.toBeKilled).to.be.not.true;
            done();
        });
        it('should not add an already killed player to the death list', function(done) {
            var p = {
                isDead: true
            };
            var me = {};
            dalek.chooseTarget(me, p);
            expect(p.toBeKilled).to.be.not.true;
            done();
        });
        it('should not kill a player if i am dead', function(done) {
            var p = {};
            var me = { isDead: true };
            dalek.chooseTarget(me, p);
            expect(p.toBeKilled).to.be.not.true;
            done();
        });
    });
});