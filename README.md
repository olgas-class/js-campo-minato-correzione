### Esercizio
Generare una griglia di gioco quadrata in cui ogni cella contiene un numero compreso tra 1 e 100.
Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro.

Bonus:
Aggiungere la possibilità di scegliere un livello di difficoltà in base al quale viene generata una griglia di uno dei seguenti range:
con difficoltà 1 => tra 1 e 100
con difficoltà 2 => tra 1 e 81
con difficoltà 3 => tra 1 e 49

### Svolgimento
[X]Quanto utente clicca PLAY:
    [X] Prelevare dal select la difficoltà scelta che ci definisce X il numero delle celle da creare
    [X] Generare 16 bombe: array di 16 numeri casuali non duplicati compresi nel range del gioco (1 a 100 / 81 / 49)
    [X] definire il numero massimo di tentativi consentiti: 100 / 81 / 49 - 16
    [X] array di numeri "non bombe" cliccate dall'utente per avere il punteggio 
    [X] Nascondere title
    [X] Ripulire la griglia precedente
    [X] Mostrare la griglia
    [X] Creare X celle, per ogni numero da 1 a X:
        [X] Creare la cella
        [X] Settare la dimensione della cella in base alla difficoltà
        - [X] Popolare la cella con il numero
        - [X] Aggiungere il click listener alla cella generata
        - [X] Aggiungere la cella alla griglia
    
    []Al click sulla cella della griglia
        [X] leggo il numero cliccato
        [X] SE il numero cliccato è nell'array di bombe
            [X] la cella diventa rossa
            [X] fine gioco --> utente perde
        [X] ALTRIMENTI
            [X] la cella diventa azzurra
            [X] SE questo numero non è stato già cliccato precedentemente 
                [X] aggiungere il numero all'array di numeri "non bombe" cliccati 
            [X] SE la lunghezza dell'array di "non bombe" è uguale al numero massimo di tentativi
                [X] fine gioco --> utente vince

    [x] funzione endGame
        - stampo il punteggio
        - bloccare il click sulle celle
        SE Utente perde:
            Scoprire le bombe:
                Per ogni cella
                    Prendere il numero dalla cella
                    Se il numero sta nell'array delle bombe
                        Coloro la cella di rosso

        ALTRIMENTI SE Utente vince: 
