// Initialize Firebase
var config = {
    apiKey: "AIzaSyDxMt4n7xBnhgwHG4sEqGARrV4wTMprgf0",
    authDomain: "jrewfirebase.firebaseapp.com",
    databaseURL: "https://jrewfirebase.firebaseio.com",
    projectId: "jrewfirebase",
    storageBucket: "jrewfirebase.appspot.com",
    messagingSenderId: "963793779975"
};
firebase.initializeApp(config);

const database = firebase.database();

$("#submitButton").on("click", (event) => {
    event.preventDefault();

    let newTrainName = $("#trainName").val().trim();
    let newDestination = $("#destination").val().trim();
    let newFirstTrainTime = $("#firstTrainTime").val().trim();
    let newFrequency = $("#frequency").val().trim();

    let newTrain = {
        "Train": newTrainName,
        "Place": newDestination,
        "TrainStart": newFirstTrainTime,
        "Frequency": newFrequency,
    }

    database.ref().push(newTrain);

    $("#trainName").val("");
    $("#destination").val("");
    $("#firstTrainTime").val("");
    $("#frequency").val("");

})

database.ref().on("child_added", (snapshot) => {
    // $("#listBody").append(`<tr>`);
    // $("#newRow").append(`<td>${snapshot.val().Train}</td>`)
    // $("#newRow").append(`<td>${snapshot.val().Place}</td>`)
    // $("#newRow").append(`<td>${snapshot.val().TrainStart}</td>`)
    // $("#newRow").append(`<td>${snapshot.val().Frequency}</td>`)
    var newRow = $("<tr>").append(
        $("<td>").text(`${snapshot.val().Train}`),
        $("<td>").text(`${snapshot.val().Place}`),
        $("<td>").text(`${snapshot.val().Frequency}`),
        $("<td>").text(`${snapshot.val().TrainStart}`),
    );

    $("#newTable > tbody").append(newRow);
})
