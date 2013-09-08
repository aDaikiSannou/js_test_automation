(function() {
    /**
     * @class represents user.
     * @constructor
     */
    JsAuto.User = function() {
    };

    /**
     * get user profile.
     * 
     * @param {number} id user id.
     * @return {Promise} deferred object.
     */
    JsAuto.User.prototype.get = function(id) {
        var xhr = new XMLHttpRequest();
        var url = JsAuto.Config.SERVER_URL + JsAuto.Config.API_NAME_USER + '?' +
            JsAuto.Config.API_PARAM_USER_ID + '=' + id;
        var deferred = $.Deferred();

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    deferred.resolve(JSON.parse(xhr.responseText));
                } else {
                    deferred.reject();
                }
            }
        };
        xhr.open('GET', url);
        xhr.send();

        return deferred.promise();
    };

}).call(this);
