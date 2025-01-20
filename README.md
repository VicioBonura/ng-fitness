# AngFitness

## Mock Development Backend
Per la gestione dei dati è stato implementato un backend di sviluppo utilizzando `json-server` per simulare un'API RESTful e servire asset statici durante lo sviluppo locale.

### Endpoint disponibili
Il server è disponibile di default sulla porta 3000.

#### API
- GET `/courses` - Restituisce la lista di tutti i corsi disponibili.
- GET `/bookings` - Restituisce la lista di tutte le prenotazioni effettuate.
- POST `/courses` - Crea un nuovo corso.
- POST `/bookings` - Crea una nuova prenotazione.

#### Asset statici
Le immagini sono servite da `json-server` e sono disponibili all'indirizzo `http://localhost:3000/images/:filename`.


