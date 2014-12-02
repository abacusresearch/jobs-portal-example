Jobs Portal Beispiel
==================

Beispielprojekt für eine Anbindung an das Abacus Jobs Portal

JSON API Stellen
URL für Version 1: https://jobs.abasky.net/rest/v1

### Liste aller Stellen

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

/job/description/{jobId}?callback={JSONP_Callback}

- jobId: Identifikation der Stelle, die in der Liste aller Stellen mitgegeben wird.
- JSONP_Callback: Callback Funktion für CORS requests.
 
```
angular.callbacks._0({"description":"Job","descriptionPage":"
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
