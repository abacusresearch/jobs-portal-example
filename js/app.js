'use strict';

var app = angular.module('jobsApp',
    ['ngSanitize', 'jobsControllers', 'jobsServices', 'pascalprecht.translate']);

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
                        var tmpJobFilters = [];
                        if($scope.jobFilters) {
                            $scope.jobFilters.forEach(function(jobFilter) {
                                var filterFound = false;
                                if(job.filters) {
                                    job.filters.some(function(filter) {
                                        if(filter.id === jobFilter.id) {
                                          tmpJobFilters.push(filter);
                                          filterFound = true;
                                          return true;
                                        }
                                    });
                                }
                                if(!filterFound) {
                                    tmpJobFilters.push({
                                        id : jobFilter.id,
                                        displayValue : ''
                                    });
                                }
                            });
                        }
                        job.filters = tmpJobFilters;
                    });
                    $scope.jobList = response;
                });
        });
    $scope.doFilter = function() {
        $('.nav-row').each(function() {
            var isHidden = false;
            var row = $(this);
            var filterText = $('.filterText').val();
            if(filterText && filterText.trim() != '') {
                var itemText = $(this).find('.nav-item').html();
                if(itemText) {
                    isHidden = itemText.toLowerCase().indexOf(filterText.trim().toLowerCase()) == -1;
                }
            }
            if(!isHidden) {
                $('.filterSelect').each(function(){
                    var criteria = $(this).find('option:selected').text();
                    var filterId = $(this).attr('id').substring(2);
                    var value = row.find('.cl' + filterId).html();
                    if(criteria != '' && value != criteria) {
                        isHidden = true;
                    }
                });
            }
            if(isHidden) {
                $(this).hide();
            } else {
                $(this).show();
            }
        });
    };
    $scope.$on('ngRepeatFinished', function () {
        $scope.doFilter();
    });
    $('.filterText').on('input', function() {
        $scope.doFilter();
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
