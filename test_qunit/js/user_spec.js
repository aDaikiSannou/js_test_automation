(function() {
    'use strict';

    module("getProfile", {
        setup : function() {
            this.xhr = sinon.useFakeXMLHttpRequest();
            this.requests = [];
            this.xhr.onCreate = $.proxy(function(request) {
                this.requests.push(request);
            }, this);
            this.user = new JsAuto.User();
        },
        teardown : function() {
            this.xhr.restore();
        }
    });

    test("should call get profile API.", function() {
        var id;
        var url;

        id = 0;
        url = JsAuto.Config.SERVER_URL + JsAuto.Config.API_NAME_USER + '?' +
        JsAuto.Config.API_PARAM_USER_ID + '=' + id;
        this.user.get(id);

        strictEqual(this.requests.length, 1);
        strictEqual(this.requests[0].url, url);

        id = 1000;
        url = JsAuto.Config.SERVER_URL + JsAuto.Config.API_NAME_USER + '?' +
        JsAuto.Config.API_PARAM_USER_ID + '=' + id;
        this.user.get(id);

        strictEqual(this.requests.length, 2);
        strictEqual(this.requests[1].url, url);
    });

    test("should call done callback with user profile object if succeeeds.", function() {
        var id = 0;
        var promise = this.user.get(id);
        var request = this.requests[0];
        var profile = {
            firstName : 'Taro',
            lastName : 'Yamamoto',
            mailAddress : 'taro.yamamoto@example.com'
        };
        var spy = sinon.spy();

        promise.done(spy);
        promise.fail(function() {
            ok(false, 'fail callback should not be called.');
        });
        request.respond(200, {
            'Content-Type': 'application/json' 
            }, JSON.stringify(profile));

        strictEqual(spy.calledOnce, true);
        strictEqual(spy.args.length, 1);
        deepEqual(spy.args[0]. profile);
    });

    test("should call fail callback if fails.", function() {
        var id = 0;
        var promise = this.user.get(id);
        var request = this.requests[0];
        var spy = sinon.spy();

        promise.done(function() {
            ok(false, 'done callback should not be called.');
        });
        promise.fail(spy);
        request.respond(403);

        strictEqual(spy.calledOnce, true);
    });
}).call(this);
