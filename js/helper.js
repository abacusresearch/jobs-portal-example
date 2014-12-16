'use strict';

var customer, jobId, applicationId, language;

var textDe = {
    ADD_FILES: 'Dateien hinzuf\u00FCgen',
    ADD_PICTURE: 'Foto hinzuf\u00FCgen',
    APPLY: 'Bewerben',
    APPLICATION_SENT: 'Bewerbung abgeschickt',
    APPLICATION_SENT_MESSAGE: 'Besten Dank f\u00FCr Ihr Interesse.',
    CANCEL: 'Abbrechen',
    DELETE: 'L\u00F6schen',
    JOB_DESCRIPTION: 'Stellenbezeichnung',
    OPEN_JOBS: 'Offene Stellen',
    SEARCH_PLACEHOLDER: 'Suchbegriff',
    SEND: 'Abschicken',
    UPLOAD: 'Hochladen'
};

var textEn = {
    ADD_FILES: 'Add files',
    ADD_PICTURE: 'Add picture',
    APPLY: 'Apply',
    APPLICATION_SENT: 'Application sent',
    APPLICATION_SENT_MESSAGE: 'Thank you for your interest.',
    CANCEL: 'Cancel',
    DELETE: 'Delete',
    JOB_DESCRIPTION: 'Job title',
    OPEN_JOBS: 'Job vacancies',
    SEARCH_PLACEHOLDER: 'Search term',
    SEND: 'Send',
    UPLOAD: 'Upload'
};

var textFr = {
    ADD_FILES: 'Ajouter des fichiers',
    ADD_PICTURE: 'Ajouter photo',
    APPLY: 'Poser sa candidature',
    APPLICATION_SENT: 'Candidature envoy\u00e9e',
    APPLICATION_SENT_MESSAGE: 'Nous vous remercions pour votre int\u00e9r\u00eat.',
    CANCEL: 'Annuler',
    DELETE: 'Effacer',
    JOB_DESCRIPTION: 'Description de poste',
    OPEN_JOBS: 'Postes vacants',
    SEARCH_PLACEHOLDER: 'Terme de recherche',
    SEND: 'Envoyer',
    UPLOAD: 'T\u00e9l\u00e9charger'
};

var textIt = {
    ADD_FILES: 'Aggiungi file',
    ADD_PICTURE: 'Aggiungi foto',
    APPLY: 'Candidare',
    APPLICATION_SENT: 'Candidatura inviata',
    APPLICATION_SENT_MESSAGE: 'Grazie per il vostro interesse.',
    CANCEL: 'Annullare',
    DELETE: 'Cancellare',
    JOB_DESCRIPTION: 'Descrizione funzione',
    OPEN_JOBS: 'Posti di lavoro vacanti',
    SEARCH_PLACEHOLDER: 'Termine di ricerca',
    SEND: 'Inviare',
    UPLOAD: 'Caricare'
};

function getFormData(id) {
    var formData = {};
    $(id + ' *').filter(':input').each(function () {
        if (this.getAttribute("data-dtype") !== null) {
            var field = {};
            field["dataType"] = this.getAttribute("data-dtype");
            field["isList"] = false;
            field["name"] = this.name;
            if ('Date' === this.getAttribute("data-dtype")) {
                field["processEngineValues"] = [parseDate(this.value)];
            } else {
                field["processEngineValues"] = [this.value];
            }
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

function parseDate(input) {
    var parts = input.split('.');
    if (parts.length < 3) return input;
    return parts[2] + '-' + parts[1] + '-' + parts[0];
}
