function Database(createTables) {

    var id;
    var db = window.openDatabase("Database", "1.0", "Cordova Demo", 200000);    


    if (createTables == true) {
        db.transaction(populateDB, errorCB);
    }

    this.SelectAll = function () {
        db.transaction(queryDB, errorCB);
    }

    this.SelectById = function (getId) {
        id = getId;
        db.transaction(queryDB, errorCB);
    }

    queryDB = function (tx) {

        if (id > 0) {
            tx.executeSql("SELECT * FROM DEMO where id="+ id, [], querySuccess, errorCB);            
        } else {
            tx.executeSql('SELECT * FROM DEMO', [], querySuccess, errorCB);
        }

    }

    querySuccess = function (tx, results) {
        console.log("results" + results.rows.length);
        for (var i = 0; i < results.rows.length; i++) {
            console.log("Returned rows = " + results.rows.item(i).data);
        }
    }


    function populateDB(tx) {
        tx.executeSql('DROP TABLE IF EXISTS DEMO');
        tx.executeSql('CREATE TABLE IF NOT EXISTS DEMO (id unique, data)');
        tx.executeSql('INSERT INTO DEMO (id, data) VALUES (1, "First row")');
        tx.executeSql('INSERT INTO DEMO (id, data) VALUES (2, "Second row")');
        tx.executeSql('INSERT INTO DEMO (id, data) VALUES (3, "third row")');
    }

    function errorCB(err) {
        console.log("Error processing SQL: " + err.code);
    }

}