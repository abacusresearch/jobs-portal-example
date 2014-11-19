var baseUrl = "TODO";

var jobsService = angular.module('jobsServices', []);

jobsService.factory('jobsAPIService', function ($http) {
    var jobsAPI = {};

    jobsAPI.getJobs = function () {
        return $http({
            method: 'JSONP',
            url: baseUrl + '/job/list/' + customer + '?callback=JSON_CALLBACK'
        });
    };

    jobsAPI.getDescription = function () {
        return $http({
            method: 'JSONP',
            url: baseUrl + '/job/description/' + jobId + '?callback=JSON_CALLBACK'
        });
    };

    jobsAPI.getForm = function () {
        return $http({
            method: 'JSONP',
            url: baseUrl + '/job/form/' + jobId + '?callback=JSON_CALLBACK'
        });
    };

    jobsAPI.submitForm = function (formData) {
        return $http({
            data: formData,
            method: 'POST',
            url: baseUrl + '/application/put/' + jobId + '/' + applicationId,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    };

    return jobsAPI;
});
