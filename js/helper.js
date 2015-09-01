'use strict';

var customer, jobId, applicationId, language;

var textDe = {
    ADD_FILES: 'Dateien hinzuf\u00FCgen',
    ADD_PICTURE: 'Foto hinzuf\u00FCgen',
    APPLY: 'Bewerben',
    APPLICATION_SENT: 'Bewerbung abgeschickt',
    APPLICATION_SENT_MESSAGE: 'Besten Dank f\u00FCr Ihr Interesse.',
    BROWSER_NOT_SUPPORTED: 'Dieser Browser wird nicht unterst\u00FCtzt',
    CANCEL: 'Abbrechen',
    DELETE: 'L\u00F6schen',
    FROM_VERSION: 'ab Version',
    INVALID_DATE_FORMAT: 'Das Datumsformat ist ung\u00FCltig (erwartetes Format: 30.12.1999)',
    INVALID_FILENAME: 'Dateiname enth\u00E4lt ung\u00FCltige Zeichen.',
    JOB_DESCRIPTION: 'Stellenbezeichnung',
    LINK_TO: 'Link zu',
    MISSING_FILES: 'Dateien fehlen. Bitte die Bewerbungsunterlagen hinzuf\u00FCgen.',
    OPEN_JOBS: 'Offene Stellen',
    SEARCH_PLACEHOLDER: 'Suchbegriff',
    SEND: 'Abschicken',
    SUPPORTED_BROWSERS: 'Folgende Browser werden unterst\u00FCtzt:',
    UPLOAD: 'Hochladen',
    WHAT_BROWSER: 'Welchen Browser verwende ich?',
    WHAT_BROWSER_URL: 'http://www.whatbrowser.org/intl/de/'
};

var textEn = {
    ADD_FILES: 'Add files',
    ADD_PICTURE: 'Add picture',
    APPLY: 'Apply',
    APPLICATION_SENT: 'Application sent',
    APPLICATION_SENT_MESSAGE: 'Thank you for your interest.',
    BROWSER_NOT_SUPPORTED: 'This browser is not supported',
    CANCEL: 'Cancel',
    DELETE: 'Delete',
    FROM_VERSION: 'from version',
    INVALID_DATE_FORMAT: 'The date format is invalid (expected format: 30.12.1999)',
    INVALID_FILENAME: 'Filename contains invalid character.',
    JOB_DESCRIPTION: 'Job title',
    LINK_TO: 'Link to',
    MISSING_FILES: 'Files are missing. Please add the application materials.',
    OPEN_JOBS: 'Job vacancies',
    SEARCH_PLACEHOLDER: 'Search term',
    SEND: 'Send',
    SUPPORTED_BROWSERS: 'Supported browsers are:',
    UPLOAD: 'Upload',
    WHAT_BROWSER: 'What browser do I use?',
    WHAT_BROWSER_URL: 'http://www.whatbrowser.org/intl/en/'
};

var textFr = {
    ADD_FILES: 'Ajouter des fichiers',
    ADD_PICTURE: 'Ajouter photo',
    APPLY: 'Poser sa candidature',
    APPLICATION_SENT: 'Candidature envoy\u00e9e',
    APPLICATION_SENT_MESSAGE: 'Nous vous remercions pour votre int\u00e9r\u00eat.',
    BROWSER_NOT_SUPPORTED: 'C\'est navigateur n\'est pas support\u00e9',
    CANCEL: 'Annuler',
    DELETE: 'Effacer',
    FROM_VERSION: 'partir de la version',
    INVALID_DATE_FORMAT: 'Le format date n\'est pas valable (format attendu: 30.12.1999)',
    INVALID_FILENAME: 'Nom de fichier contient des caract\u00e8res non valides.',
    JOB_DESCRIPTION: 'Description de poste',
    LINK_TO: 'Lien pour',
    MISSING_FILES: 'Les fichiers manquent. Veuillez ajouter les documents de candidature.',
    OPEN_JOBS: 'Postes vacants',
    SEARCH_PLACEHOLDER: 'Terme de recherche',
    SEND: 'Envoyer',
    SUPPORTED_BROWSERS: 'Les navigateurs suivants sont support\u00e9s:',
    UPLOAD: 'T\u00e9l\u00e9charger',
    WHAT_BROWSER: 'Quel est le navigateur que j\'utilise?',
    WHAT_BROWSER_URL: 'http://www.whatbrowser.org/intl/fr/'
};

var textIt = {
    ADD_FILES: 'Aggiungi file',
    ADD_PICTURE: 'Aggiungi foto',
    APPLY: 'Candidare',
    APPLICATION_SENT: 'Candidatura inviata',
    APPLICATION_SENT_MESSAGE: 'Grazie per il vostro interesse.',
    BROWSER_NOT_SUPPORTED: 'Questo browser non \u00e8 supportato',
    CANCEL: 'Annullare',
    DELETE: 'Cancellare',
    FROM_VERSION: 'dalla versione',
    INVALID_DATE_FORMAT: 'Il formato della data non \u00e9 validto (formato atteso: 30.12.1999)',
    INVALID_FILENAME: 'Nome del file contiene caratteri non validi.',
    JOB_DESCRIPTION: 'Descrizione funzione',
    LINK_TO: 'Link al',
    MISSING_FILES: 'File mancanti. Perfavore aggiungere i documenti di domanda di assunzione.',
    OPEN_JOBS: 'Posti di lavoro vacanti',
    SEARCH_PLACEHOLDER: 'Termine di ricerca',
    SEND: 'Inviare',
    SUPPORTED_BROWSERS: 'I seguenti browser sono supportati:',
    UPLOAD: 'Caricare',
    WHAT_BROWSER: 'Quale browser sto utilizzando?',
    WHAT_BROWSER_URL: 'http://www.whatbrowser.org/intl/it/'
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

function validateForm(form, jobsAPIService) {
    var result = true;
    $(form).find("input[data-dtype='Date']").each(function() {
        var date = parseDate($(this).val());
        if(date != "" && !date.match(/^[0-9]{4}\-[0-9]{2}\-[0-9]{2}$/i)) {
            result = false;
            var errorText = $(this).closest(".col-sm-10").find(".invalid-data-msg").html();
            $(this).closest(".col-sm-10").find(".invalid-data-msg").attr('style','display: block !important');
            $(this).on('input change onpaste',function() {
                var date = parseDate($(this).val());
                if(date != "" && !date.match(/^[0-9]{4}\-[0-9]{2}\-[0-9]{2}$/i)) {
                    $(this).closest(".col-sm-10").find(".invalid-data-msg").html(errorText)
                } else {
                    $(this).closest(".col-sm-10").find(".invalid-data-msg").html("<br/>")
                }
            });
        } else {
            $(this).closest(".col-sm-10").find(".invalid-data-msg").html("<br/>");
        }
    });
    if(!jobsAPIService.hasSuccessfullFile()) {
        result = false;
        $(form).find(".files-msg").attr('style', 'display: block !important');
    }
    return result;
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
