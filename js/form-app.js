'use strict';

angular.module('jobsFormApp',
    ['blueimp.fileupload', 'jobsFormControllers', 'jobsServices', 'jobsFormConfig']);

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

jobsFormController.controller('JobsFormCtrl', function ($scope, jobsAPIService) {
    $scope.jobFields = [];
    init($scope);
    jobsAPIService.getForm()
        .success(function (response) {
            var form = JSON.parse(response.form);
            $scope.jobFields = form.DataRecord.Fields;
        });
    $scope.submitForm = function () {
        jobsAPIService.submitForm(getFormData("#applicationForm"))
            .success(function () {
                window.location = "message.html";
            });
    };
});

jobsFormController.controller('JobFileUploadController', [
    '$scope',
    function ($scope) {
        if (!applicationId)
            applicationId = guid();
        $scope.options = {
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
