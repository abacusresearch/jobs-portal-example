'use strict';

var app = angular.module('jobsApp',
    ['jobsControllers', 'jobsServices', 'pascalprecht.translate']);

app.config(function ($translateProvider) {
    $translateProvider.translations('de', textDe);
    $translateProvider.translations('en', textEn);
    $translateProvider.translations('fr', textFr);
    $translateProvider.translations('it', textIt);
});

app.directive('onFinishRender', function ($timeout) {
    return {
        restrict: 'A',
        link: function (scope) {
            if (scope.$last === true) {
                $timeout(function () {
                    scope.$emit('ngRepeatFinished');
                });
            }
        }
    }
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
            $scope.doFilter = function (id) {
                var criteria = $('#id' + id + ' option:selected').text();
                $('.nav-filter').each(function () {
                        if ($(this).hasClass('cl' + id)) {
                            if ('' === criteria || $(this).html() === criteria) {
                                $(this).closest('tr').show();
                            } else {
                                $(this).closest('tr').hide();
                            }
                        } else if ('' === $(this).html()) {
                            if ('' === criteria) {
                                $(this).closest('tr').show();
                            } else {
                                $(this).closest('tr').hide();
                            }
                        }
                    }
                );
            };
        });
    $scope.$on('ngRepeatFinished', function () {
        $scope.jobFilters.forEach(function (el) {
            $scope.doFilter(el.id);
        });
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
