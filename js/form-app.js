'use strict';

var app = angular.module('jobsFormApp',
    [
        'blueimp.fileupload',
        'jobsFormControllers',
        'jobsServices',
        'jobsFormConfig',
        'pascalprecht.translate',
        'ui.bootstrap'
    ]);

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

var jobsConfig = angular.module('jobsFormConfig', []);
jobsConfig.config([
    '$httpProvider', 'fileUploadProvider',
    function ($httpProvider, fileUploadProvider) {
        angular.extend(fileUploadProvider.defaults, {
            maxFileSize: 5000000
        });
    }
]);

var jobsFormController = angular.module('jobsFormControllers', []);

jobsFormController.controller('JobsFormCtrl', function ($translate, $scope, jobsAPIService) {
    $scope.jobFields = [];
    $scope.jobValues = [];
    init($scope, $translate);
    jobsAPIService.getForm()
        .success(function (response) {
            $scope.jobFields = response.form.DataRecord.Fields;
            $scope.jobValues = response.form.DataRecord.Values;
            $scope.jobDescription = response.description;
        });
    var form = document.getElementById('appform');
    form.addEventListener('submit', function (event) {
        if (form.classList) form.classList.add('submitted');
        if (!this.checkValidity()) {
            event.preventDefault();
        } else {
            jobsAPIService.submitForm(getFormData("#appform"))
                .success(function () {
                    window.location = "message.html?customer=" + $scope.customer;
                });
        }
    }, false);
    $scope.$on('ngRepeatFinished', function () {
        $scope.jobValues.forEach(function (el) {
            $('#f' + el.ID).val(el.Value);
        });
    });
});

jobsFormController.controller('JobFileUploadController', [
    '$scope',
    function ($scope) {
        if (!applicationId)
            applicationId = guid();
        $scope.options = {
            dropZone: null,
            autoUpload: true,
            url: baseUrl + '/application/file/put/' + jobId + '/' + applicationId
        };
    }
]);

jobsFormController.controller('FileDestroyController', [
    '$scope', '$http',
    function ($scope, $http) {
        var file = $scope.file,
            state;
        if (file.deleteUrl) {
            file.$state = function () {
                return state;
            };
            file.$destroy = function () {
                state = 'pending';
                return $http({
                    url: file.deleteUrl,
                    method: file.deleteType
                }).then(
                    function () {
                        state = 'resolved';
                        $scope.clear(file);
                    },
                    function () {
                        state = 'rejected';
                    }
                );
            };
        } else if (!file.$cancel && !file._index) {
            file.$cancel = function () {
                $scope.clear(file);
            };
        }
    }
]);

jobsFormController.controller('PictureUploadController', [
    '$scope',
    function ($scope) {
        if (!applicationId)
            applicationId = guid();
        $scope.picOptions = {
            dropZone: null,
            autoUpload: true,
            url: baseUrl + '/application/file/put/' + jobId + '/' + applicationId + "?applicantPic=true"
        };
    }
]);


jobsFormController.controller('PictureDestroyController', [
    '$scope', '$http',
    function ($scope, $http) {
        var file = $scope.picture,
            state;
        if (file.deleteUrl) {
            file.$state = function () {
                return state;
            };
            file.$destroy = function () {
                state = 'pending';
                return $http({
                    url: file.deleteUrl,
                    method: file.deleteType
                }).then(
                    function () {
                        state = 'resolved';
                        $scope.clear(file);
                    },
                    function () {
                        state = 'rejected';
                    }
                );
            };
        } else if (!file.$cancel && !file._index) {
            file.$cancel = function () {
                $scope.clear(file);
            };
        }
    }
]);

jobsFormController.controller('DatepickerCtrl', function ($scope) {
    $scope.clear = function () {
        $scope.dt = null;
    };

    $scope.open = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = true;
    };
});