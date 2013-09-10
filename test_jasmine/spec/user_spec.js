describe("JsAuto.User", function() {
    'use strict';

    describe("getProfile", function() {
        var xhr = null;
        var requests = null;
        var user = null;

        beforeEach(function() {
            xhr = sinon.useFakeXMLHttpRequest();
            requests = [];
            xhr.onCreate = function(request) {
                requests.push(request);
            };
            user = new JsAuto.User();
        });

        afterEach(function() {
            xhr.restore();
        });

        it("calls get profile API", function() {
            var id;
            var url;

            id = 0;
            url = JsAuto.Config.SERVER_URL + JsAuto.Config.API_NAME_USER + '?' +
            JsAuto.Config.API_PARAM_USER_ID + '=' + id;
            user.get(id);

            expect(requests.length).toBe(1);
            expect(requests[0].url).toBe(url);

            id = 1000;
            url = JsAuto.Config.SERVER_URL + JsAuto.Config.API_NAME_USER + '?' +
            JsAuto.Config.API_PARAM_USER_ID + '=' + id;
            user.get(id);

            expect(requests.length).toBe(2);
            expect(requests[1].url).toBe(url);
        });

        it("call done callback with user profile object if succeeeds", function() {
            var id = 0;
            var promise = user.get(id);
            var request = requests[0];
            var profile = {
                firstName : 'Taro',
                lastName : 'Yamamoto',
                mailAddress : 'taro.yamamoto@example.com'
            };
            var doneSpy = jasmine.createSpy('done');
            var failSpy = jasmine.createSpy('fail');

            promise.done(doneSpy);
            promise.fail(failSpy);
            request.respond(200, {
                'Content-Type': 'application/json' 
                }, JSON.stringify(profile));

            expect(doneSpy).toHaveBeenCalled();
            expect(doneSpy.calls.length).toBe(1);
            expect(doneSpy.mostRecentCall.args[0]).toEqual(profile);
            expect(failSpy).not.toHaveBeenCalled();
        });

        it("call fail callback if fails", function() {
            var id = 0;
            var promise = user.get(id);
            var request = requests[0];
            var doneSpy = jasmine.createSpy('done');
            var failSpy = jasmine.createSpy('fail');

            promise.done(doneSpy);
            promise.fail(failSpy);
            request.respond(403);

            expect(doneSpy).not.toHaveBeenCalled();
            expect(failSpy).toHaveBeenCalled();
            expect(failSpy.calls.length).toBe(1);
        });
    });
});
