'use strict';

var app = angular.module('jobsApp',
    ['jobsControllers', 'jobsServices', 'pascalprecht.translate']);

app.config(function ($translateProvider) {
    $translateProvider.translations('de', textDe);
    $translateProvider.translations('en', textEn);
    $translateProvider.translations('fr', textFr);
    $translateProvider.translations('it', textIt);
});
var jobsController = angular.module('jobsControllers', []);

jobsController.controller('JobsListCtrl', function ($translate, $scope, jobsAPIService) {
    $scope.jobList = [];
    $scope.jobFilters = [];
    init($scope, $translate);
    jobsAPIService.getFilters()
        .success(
        function (response) {
            $scope.jobFilters = response;
        });
    jobsAPIService.getJobs()
        .success(
        function (response) {
            response.forEach(function (outerEl) {
                if (outerEl.filters && $scope.jobFilters) {
                    outerEl.filters.forEach(function (el) {
                        var filterId = el.id;
                        var valueId = el.values[0];
                        $scope.jobFilters.some(function (innerEl) {
                            if (innerEl.id === filterId) {
                                innerEl.values.some(function (innerEl) {
                                    if (innerEl.id === valueId) {
                                        el.displayValue = innerEl.value[$scope.language];
                                    }
                                });
                            }
                        });
                    });
                }
            });
            $scope.jobList = response;
            $scope.doFilter = function () {
                $scope.filterSearch;
                var criteria = $(this).val();
                if (criteria == 'ALL') {
                    $('.lilist').show();
                    return;
                }
                $('.country').each(function (i, option) {
                    if ($(this).html() == criteria) {
                        $(this).parent().show();
                    } else {
                        $(this).parent().hide();
                    }
                });
            };
        });
});

jobsController.controller('JobsDescriptionCtrl', function ($translate, $sce, $scope, jobsAPIService) {
    $scope.jobDescriptionPage = [];
    init($scope, $translate);
    jobsAPIService.getDescription()
        .success(function (response) {
            $scope.jobDescriptionPage = $sce.trustAsHtml(response.descriptionPage);
        });
});

jobsController.controller('JobsStyleCtrl', function ($translate, $scope) {
    init($scope, $translate);
});
