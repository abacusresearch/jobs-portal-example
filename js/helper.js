'use strict';

var customer, jobId, applicationId;

function getFormData(id) {
    var formData = {};
    $(id + ' *').filter(':input').each(function () {
        if (this.getAttribute("data-dtype") !== null) {
            var field = {};
            field["dataType"] = this.getAttribute("data-dtype");
            field["isList"] = false;
            field["name"] = this.name;
            field["processEngineValues"] = [this.value];
            formData[this.name] = field;
        }
    });
    return formData;
}

function getRequestParam(name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    return results == null ? null : results[1] || 0;
}

function getRequestParams($scope) {
    customer = getRequestParam("customer");
    $scope.customer = customer;
    jobId = getRequestParam("job");
    $scope.jobId = jobId;
}

var guid = (function () {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    return function () {
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    };
})();

function init($scope) {
    $("html").niceScroll({cursorcolor: "#A3A3A3"});
    getRequestParams($scope);
}
