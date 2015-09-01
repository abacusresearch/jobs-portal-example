var baseUrl = "https://jobs.abasky.net/rest/v1";

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

    jobsAPI.getFilters = function () {
        return $http({
            method: 'JSONP',
            url: baseUrl + '/job/filters/' + customer + '?callback=JSON_CALLBACK'
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

    jobsAPI.files = [];

    jobsAPI.hasSuccessfullFile = function() {
        if(this.files) {
            for(var i = 0; i < this.files.length; i++) {
                if(!this.files[i].error) {
                    return true;
                }
            }
        }
        return false;
    };

    return jobsAPI;
});
