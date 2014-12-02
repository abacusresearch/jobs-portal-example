Jobs Portal Beispiel
==================

Beispielprojekt für eine Anbindung an das Abacus Jobs Portal

API Stellen
URL für Version 1: https://jobs.abasky.net/rest/v1

1. Liste aller Stellen

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
