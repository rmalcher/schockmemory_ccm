/**
 * @overview Schock-Memory ccm component
 * @version 0.0.1
 * @author rmalcher
 * @requires ccm
 * @copyright MIT License
 */

/**
 * @namespace
 */

ccm.components.schockMemory = {
    /*-------------------------------------------- public component members --------------------------------------------*/

    /**
     * @summary default instance configuration
     * @type {ccm.components.schockMemory.config}
     * @readonly
     */
    config: {
        //store: [ ccm.store ]
        //schockMemoryStore: [ ccm.store ]
        question_topic: 'uml',
        title: 'Use Case Diagram',
        couchDbQueryInterface: 'http://localhost:5984',
        serverQueryInterface: 'http://localhost:8080/query',
        serverStoreInterface: [ccm.store, {url: 'http://localhost:8080/store'}],
        couchDbStore: [ccm.store, {url: 'http://localhost:5984/schock_memory_questions/_design/schock_memory_questions/test.js'}],
        schockMemoryStore: {store: 'schockMemoryStore'}
    },
    /*-------------------------------------------- public component classes --------------------------------------------*/


    /**
     * @summary create ccm instance for schockMemory
     * @alias ccm.components.schockMemory.SchockMemory
     * @constructor
     */
    Instance: function () {

        /*----------------------------------------------- instance members -----------------------------------------------*/

        /**
         * @summary own context
         * @private
         * @type {ccm.instance}
         * @this ccm.instance
         */
        var self = this;

        /*------------------------------------------- public instance methods --------------------------------------------*/

        self.render = function () {

            /**
             * website area for own content
             * @type {ccm.element}
             */
            var element = ccm.helper.element(self);

            var value = element.html();
            //element.html( 'Hello world !!!' );


            //$(element).text("Hello World !!!");

            // remove pending wheel
            $('div.schockMemory').children('img').remove();

            $(element).append($('<h2>').attr('id', 'title').text("Das ist die Überschrift"));
            $(element).append($("<p>").attr('id', 'desc').text("Hello World !!!"));

            $(element).append($('<div>').addClass('question_list_container'));
            $('div.question_list_container').append($('<h3>').text("Bisherige Fragen"));
            //$('div.question_list_container').append($('<div>').addClass('question_list'));
//      $('div.question_list').append($('<p>').text("1. Frage"));
//      $('div.question_list').append($('<p>').text("2. Frage"));
            $('div.question_list_container').hide();

            $(element).append($('<p>').text("Stellen Sie nur Fragen, die Sie gerne in einer Prüfung auch tatsächlich haben wollten. " +
                "Formulieren Sie Frage und Antwort so klar und verständlich wie möglich, so dass beides in den Frage-/Antwort-Katalog " +
                "für die Prüfungsvorbereitung übernommen werden kann."));
            $(element).append($('<p>').text("Schreiben Sie in das erste Eingabefeld nur die Frage, und in das zweite nur die Antwort."));

            $(element).append($('<p>').text("Ihre Frage zum Thema: " + self.title));
            $(element).append($('<textarea>').addClass('user_question').attr('rows', '4').attr('cols', '50').attr('placeholder', "Ihre Frage"));

            $(element).append($('<p>').text("Ihre Muster-Anwort auf die Frage:"));
            $(element).append($('<textarea>').addClass('user_answer').attr('rows', '4').attr('cols', '50').attr('placeholder', "Ihre Muster-Antwort"));

            $(element).append($('<p>').text("Ihre Quelle(n):"));
            $(element).append($('<textarea>').addClass('user_reference').attr('rows', '1').attr('cols', '50').attr('placeholder', "Quelle(n)"));

            $(element).append($('<div>').addClass('button_container'));
            $('div.button_container').append($('<button>').attr('id', 'submit_button').attr('type', 'button').text("Absenden"));
            $('div.button_container').append($('<button>').attr('id', 'question_list_toogle_button').attr('type', 'button').text("Bisherige Fragen anzeigen"));





            $('#submit_button').click(function () {
               /* self.couchDbStore.set({key: 'THEKEY', value: 'THEVALUE'}, function (result) {
                    //http://localhost:5984/schock_memory_questions/_design/schock_memory_questions/test.js?callback=jQuery111108620596727125331_1434374360840&dataset%5Bkey%5D=THEKEY&dataset%5Bvalue%5D=THEVALUE&_=1434374360841
                    console.log("The result is: "+result);
                    alert(result);
                });*/

                self.serverStoreInterface.set({key: 'THEKEY', value: 'THEVALUE'}, function(result) {
                    alert(result);
                });

               /* $.getScript('http://examples.oreilly.de/german_examples/hfhtml5ger/Kapitel06/Servercode/hund2.js', function (data, textSatus, jqxhr) {
                    console.log( data ); // Data returned
                    console.log( textStatus ); // Success
                    console.log( jqxhr.status ); // 200
                    console.log( "Load was performed." );
                });*/

                /*$.getJSON('http://examples.oreilly.de/german_examples/hfhtml5ger/Kapitel06/Servercode/hund2.js', null, function (result) {
                    alert(JSON.stringify(result));
                });*/

               /*$.getJSON('http://localhost:5984/schock_memory_questions/_design/schock_memory_questions/test.js?callback=?', null, function (result) {
                   alert(JSON.stringify(result));
                });*/
/*               ccm.load(['http://localhost:5984/schock_memory_questions/_design/schock_memory_questions/test.js', {name: 'test', value: 'test'} ], function(result) {
                   console.log("Result: "+result);
               });*/

            });


            $('#question_list_toogle_button').click(function () {
//          $.ajax({
//              type: "GET",
//              url: "http://localhost:5984/schock_memory",
//              contentType: "application/json",
//              dataType: "json",
//              complete: function( req ){
//                  if( req.status == 200 ){
//                      alert("Erfolg: " + req.responseText);
//                  }else{
//                      alert("Fehler");
//                  }
//              }
//          });
                //ccm.load('http://localhost:5984/schock_memory_questions/_design/schockmemory/_view/questionlist?key="' + self.question_topic + '"', function (result) {
                ccm.load([self.serverQueryInterface, {keys: [self.question_topic]}], function (result) {
                    console.log("In der callback function");

                    if (typeof result == 'object') {
                        console.log("DB response: " + JSON.stringify(result));
                        if (result.rows.length > 0) {
                            $('div.question_list_container').append($('<ol>'));
                            for (var i = 0; i < result.rows.length; i++) {
                                var row = result.rows[i];
                                $('div.question_list_container > ol').append($('<li>').text(row.value));
                            }
                        } else {
                            $('div.question_list_container').append($('<p>').text("Keine Fragen vorhanden"));
                        }
                        $('div.question_list_container').toggle('fast');
                    }
                });
            });



            //$(element).append($("<ul>").append($("<li>").text("Das ist ein Test")));


            setValue('question1', 'Die erste Frage!!!');

            getDataset('question1', function (dataset) {
                console.log("[TEST] key: " + dataset.key + " - value: " + dataset.value);
            });

//      ccm.store( self.schockMemoryStore, function (store) {
//          store.set( {key: "question", value: "1. Frage"});
//          store.set( {key: "question2", value: "2. Frage"});
//      });


//      ccm.store( {store: 'myStore'}, function (createdStore) {
//          console.log(createdStore);
//          createdStore.set( {key: "question", value: "1. Frage"});
//          createdStore.set( {key: "question2", value: "2. Frage"});
//          console.log(createdStore);
//      });
//      ccm.store( {store: 'myStore'} , function (createdStore) {
//          createdStore.set( {key: "question", value: "Erste Frage"});
//          createdStore.set( {key: "question3", value: "3. Frage"});
//      });

//      ccm.store( function ( store ) {
//
//
//          store.set({key: 'A'}, function (dataset) {
//
//            console.log( dataset );
//          });
//
//      } );

        };


        function setValue(key, value) {
            ccm.store(self.schockMemoryStore, function (store) {
                store.set({key: key, value: value}, function (dataset) {
                    //console.log(dataset);
                });
            });

        }

        function getDataset(key, callback) {
            ccm.store(self.schockMemoryStore, function (store) {
                store.get(key, function (dataset) {
                    callback(dataset);
                });
            });
        }
    }

};


/**
 * Created by romek on 16.06.2015.
 */
