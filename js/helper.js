'use strict';

var customer, jobId, applicationId, language;

var textDe = {
    APPLY: 'Bewerben',
    APPLICATION_SENT: 'Bewerbung abgeschickt',
    APPLICATION_SENT_MESSAGE: 'Besten Dank f\u00FCr Ihr Interesse.',
    JOB_DESCRIPTION: 'Stellenbezeichnung',
    OPEN_JOBS: 'Offene Stellen',
    SEARCH_PLACEHOLDER: 'Suchbegriff',
    SEND: 'Abschicken'
};

var textEn = {
    APPLY: 'Apply',
    APPLICATION_SENT: 'Application sent',
    APPLICATION_SENT_MESSAGE: 'Thank you for your interest.',
    JOB_DESCRIPTION: 'Job title',
    OPEN_JOBS: 'Job vacancies',
    SEARCH_PLACEHOLDER: 'Search term',
    SEND: 'Send'
};

var textFr = {
    APPLY: 'Poser sa candidature',
    APPLICATION_SENT: 'Candidature envoy\u00e9e',
    APPLICATION_SENT_MESSAGE: 'Nous vous remercions pour votre int\u00e9r\u00eat.',
    JOB_DESCRIPTION: 'Description de poste',
    OPEN_JOBS: 'Postes vacants',
    SEARCH_PLACEHOLDER: 'Terme de recherche',
    SEND: 'Envoyer'
};

var textIt = {
    APPLY: 'Candidare',
    APPLICATION_SENT: 'Candidatura inviata',
    APPLICATION_SENT_MESSAGE: 'Grazie per il vostro interesse.',
    JOB_DESCRIPTION: 'Descrizione funzione',
    OPEN_JOBS: 'Posti di lavoro vacanti',
    SEARCH_PLACEHOLDER: 'Termine di ricerca',
    SEND: 'Inviare'
};

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

function getLanguage() {
    if (!language) {
        var browserLanguage = navigator.language || navigator.userLanguage;
        if (!browserLanguage && browserLanguage.length < 2)
            return "de";
        language = browserLanguage.substring(0, 2);
    }
    switch (language) {
        case "en":
        case "fr":
        case "it":
            return language;
        default:
            return "de";
    }
}

function getRequestParam(name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    return results == null ? null : results[1] || 0;
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

function init($scope, $translate) {
    customer = getRequestParam("customer");
    $scope.customer = customer;
    jobId = getRequestParam("job");
    $scope.jobId = jobId;
    language = getRequestParam("language");
    $scope.language = getLanguage();
    $translate.use($scope.language);
}
