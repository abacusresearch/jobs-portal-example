'use strict';

angular.module('jobsApp',
    ['jobsControllers', 'jobsServices']);

var jobsController = angular.module('jobsControllers', []);

jobsController.controller('JobsListCtrl', function ($scope, jobsAPIService) {
    $scope.jobList = [];
    init(jobsAPIService, $scope);
    jobsAPIService.getJobs()
        .success(
        function (response) {
            $scope.jobList = response;
        })
});

jobsController.controller('JobsDescriptionCtrl', function ($sce, $scope, jobsAPIService) {
    $scope.jobDescriptionPage = [];
    init(jobsAPIService, $scope);
    jobsAPIService.getDescription()
        .success(function (response) {
            $scope.jobDescriptionPage = $sce.trustAsHtml(response.descriptionPage);
        });
});