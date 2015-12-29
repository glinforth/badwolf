/**
 * Created by glinforth on 26/04/14.
 */

var chai = require('chai'),
    expect = chai.expect,
    sinon = require('sinon'),
    river = require('./river');

chai.use(require('sinon-chai'));
require('mocha-sinon');

describe('river', function() {
    describe('beforeNight', function() {
        it('should have a beforeNight function', function(done) {
            var me = {};
            river.beforeNight(me);
            expect(me).to.eql({});
            done();
        })
    });
    describe('doNight', function(){
        it('should emit a getTarget', function(done) {
            var g = {
                emit: sinon.stub()
            };
            var fn = sinon.stub();
            river.doNight(g, 0, fn);
            expect(g.emit).to.be.calledWith('gettarget');
            done();
        });
        it('should emit a getTarget on night 1', function(done) {
            var g = {
                emit: sinon.stub()
            };
            var fn = sinon.stub();
            river.doNight(g, 1, fn);
            expect(g.emit).to.be.calledWith('gettarget');
            done();
        });
        it('should emit a getTarget on night 2', function(done) {
            var g = {
                emit: sinon.stub()
            };
            var fn = sinon.stub();
            river.doNight(g, 2, fn);
            expect(g.emit).to.be.calledWith('gettarget');
            done();
        });
    });

    describe('chooseTarget', function() {
        it('should kill the player', function(done) {
            var p = {};
            var me = {};
            river.chooseTarget(me, p);
            expect(p.toBeKilled).to.be.true;
            done();
        });
        it('should not kill an already dead player', function(done) {
            var p = {
                isDead: true
            };
            var me = {};
            river.chooseTarget(me, p);
            expect(p.toBeKilled).to.be.not.true;
            done();
        });
        it('should not kill a protected player', function(done) {
            var p = {
                isSafe: true
            };
            var me = {};
            river.chooseTarget(me, p);
            expect(p.toBeKilled).to.be.not.true;
            done();
        });
        it('should not kill a player if i am dead', function(done) {
            var p = {};
            var me = { isDead: true };
            river.chooseTarget(me, p);
            expect(p.toBeKilled).to.be.not.true;
            done();
        });
        it('should bring the previously killed player back to life', function(done) {
            var p = {};
            var me = {};
            river.chooseTarget(me, p);
            expect(p.toBeKilled).to.be.true;
            p.isDead = true;
            p.toBeKilled = false;
            river.chooseTarget(me, {});
            expect(p.isDead).to.be.true;
            expect(p.toBeSaved).to.be.true;
            done();
        });
    });
});