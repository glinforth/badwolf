/**
 * Created by glinforth on 26/04/14.
 */

var chai = require('chai'),
    expect = chai.expect,
    sinon = require('sinon'),
    doctor = require('./doctor');

chai.use(require('sinon-chai'));
require('mocha-sinon');

describe('doctor', function() {
    describe('beforeNight', function() {
        it('should have a beforeNight function', function(done) {
            var me = {};
            doctor.beforeNight(me);
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
            doctor.doNight(g, 0, fn);
            expect(g.emit).to.be.calledWith('gettarget');
            done();
        });
        it('should emit a getTarget on night 1', function(done) {
            var g = {
                emit: sinon.stub()
            };
            var fn = sinon.stub();
            doctor.doNight(g, 1, fn);
            expect(g.emit).to.be.calledWith('gettarget');
            done();
        });
        it('should emit a getTarget on night 2', function(done) {
            var g = {
                emit: sinon.stub()
            };
            var fn = sinon.stub();
            doctor.doNight(g, 2, fn);
            expect(g.emit).to.be.calledWith('gettarget');
            done();
        });
    });

    describe('chooseTarget', function() {
        it('should protect the player', function(done) {
            var p = {};
            var me = {};
            doctor.chooseTarget(me, p);
            expect(p.isSafe).to.be.true;
            done();
        });
        it('should not protect an already dead player', function(done) {
            var p = {
                isDead: true
            };
            var me = {};
            doctor.chooseTarget(me, p);
            expect(p.isSafe).to.be.not.true;
            done();
        });
        it('should keep an already protected player protected', function(done) {
            var p = {
                isSafe: true
            };
            var me = {};
            doctor.chooseTarget(me, p);
            expect(p.isSafe).to.be.true;
            done();
        });
        it('should not protect a player if i am dead', function(done) {
            var p = {};
            var me = { isDead: true };
            doctor.chooseTarget(me, p);
            expect(p.isSafe).to.be.not.true;
            done();
        });
        it('should not protect the same target twice', function(done) {
            var p = {};
            var me = {};
            doctor.chooseTarget(me, p);
            expect(p.isSafe).to.be.true;
            p.isSafe = false;
            doctor.chooseTarget(me, p);
            expect(p.isSafe).to.be.not.true;
            done();
        });
    });
});