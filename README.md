Jobs Portal Beispiel
==================

Beispielprojekt für eine Anbindung an das Abacus Jobs Portal

JSON API Stellen
URL für Version 1: https://jobs.abasky.net/rest/v1

### Liste aller Stellen

Method: JSONP
/job/list/{customer_guid}?callback={JSONP_Callback}

- customer_guid: Identifikation der Stellenansicht.
- JSONP_Callback: Callback Funktion für CORS requests.

Response:
```
JSONP_Callback(
  [
    {
      "description":"Job",
      "jobId":"7d6e5e8d-30a8-41d6-a9dd-7b4f652e494a"
    }
  ]
)
```

### Stellenbeschreibung

Method: JSONP
/job/description/{jobId}?callback={JSONP_Callback}

- jobId: Identifikation der Stelle, die in der Liste aller Stellen mitgegeben wird.
- JSONP_Callback: Callback Funktion für CORS requests.
 
```
JSONP_Callback(
  [
    {
      "description":"Job",
      "descriptionPage":"<div></div>",
      "jobId":"7d6e5e8d-30a8-41d6-a9dd-7b4f652e494a"
    }
  ]
)
```
Der Parameter descriptionPage umfasst den kompletten Stellenbschrieb in HTML.

### Bewerbungsformular

Method: JSONP
/job/form/{jobId}?callback={JSONP_Callback}

- jobId: Identifikation der Stelle, die in der Liste aller Stellen mitgegeben wird.
- JSONP_Callback: Callback Funktion für CORS requests.
 
```
JSONP_Callback(
  [
    {
      "description":"Job",
      "form":{},
      "jobId":"7d6e5e8d-30a8-41d6-a9dd-7b4f652e494a"
    }
  ]
)
```
Der Parameter form umfasst die Formulardefinition in JSON.

Bespiel eines Formulars:

```
{
  "Text": "Sachbearbeiter/in Human Resources",
  "DataRecord": {
    "Values": [
      {
        "Value": "D",
        "Type": "String",
        "ID": "Language"
      }
    ],
    "Fields": [
      {
        "Visible": true,
        "Type": "String",
        "Mandatory": true,
        "Length": 25,
        "DisplayLanguage": "de",
        "ID": "FirstName",
        "DisplayName": "Vorname"
      },
      {
        "Visible": true,
        "Type": "Date",
        "DisplayLanguage": "de",
        "ID": "DateOfBirth",
        "DisplayName": "Geburtsdatum"
      },
      {
        "IsRadio": true,
        "Visible": true,
        "Type": "String",
        "ID": "Language",
        "DisplayLanguage": "de",
        "RadioValues": [
          {
            "Value": "D",
            "DisplayLanguage": "de",
            "ID": "D",
            "DisplayName": "Deutsch"
          },
          {
            "Value": "E",
            "DisplayLanguage": "de",
            "ID": "E",
            "DisplayName": "Englisch"
          }
        ],
        "DisplayName": "Sprache"
      }
    ]
  },
  "Title": "Sachbearbeiter/in Human Resources"
}
```
- Fields: Felddefinition die im Formular angezeigt werden sollen.
- Values: Standardwert eines Feldes, bspw. das selektierte Element einer ComboBox

### Dateiupload

Method: POST
/application/file/put/{jobId}/{applicationId}

- jobId:  Identifikation der Stelle.
- applicationId: GUID der Bewerbung welche beim Formular Post ebenfalls mitgegeben wird. Wird vom Client erzeugt.

Dateien werden als Teil eines multipart requests mitgeschickt. Beim Bewerbungsfoto muss als Name applicant_pic .jpg|.png mitgegeben werden.

Response:
```
{"files": [
  {
    "name": "CV.pdf",
    "size": 902604,
    "deleteUrl": "https:\/\/jobs.abasky.net\/rest\/v1\/application\/file\/delete\/{attachmentId}",
    "deleteType": "DELETE"
  },
  {
    "name": "applicant_pic.jpg",
    "size": 841946,
    "deleteUrl": "https:\/\/jobs.abasky.net\/rest\/v1\/application\/file\/delete\/{attachmentId}",
    "deleteType": "DELETE"
  }
]}
```

Mögliche Response bei einem Fehler:

```
{"files": [
  {
    "name": "CV.pdf",
    "size": 90260400,
    "error": "File is too big"
  }
]}
```

### Löschen einer Datei

Um eine Datei zu löschen, kann die deleteUrl aus der Response des Dateiuploads aufgerufen werden mit der entsprechenden Request Methode, im obigen Beispiel DELETE.

Z.B.:
Method: DELETE
https://jobs.abasky.net/rest/v1/application/file/delete/{attachmentId}

Reponse:

```
{"files": [
  {
    "CV.pdf": true
  },
  {
    "applicant_pic.jpg": true
  }
]}
```

### Formular Upload

Method: POST
/application/put/{jobId}/{applicationId}

- jobId:  Identifikation der Stelle.
- applicationId: GUID der Bewerbung welche zuvor bei den Dateiuploads mitgegeben wurde.

Reponse Body:
JSON mit Formulardaten.

```
{
  "0": {
    "Zip": {
      "dataType": "String",
      "name": "Zip",
      "processEngineValues": ["9300"],
      "isList": false
    },
    "DateOfBirth": {
      "dataType": "Date",
      "name": "DateOfBirth",
      "processEngineValues": ["2014-12-03"],
      "isList": false
    },
    "Email": {
      "dataType": "String",
      "name": "Email",
      "processEngineValues": ["hans.muster@bewerber.ch"],
      "isList": false
    }
  }
}
```
0: Ist die Seitenanzahl, aktuell immer 0.

Bei diesem Request gibt es keine Response die geparsed werden müsste, ledigich der Status Code ist zu beachten.

