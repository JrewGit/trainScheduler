// Initialize Firebase
let config = {
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

    database.ref("trains").push(newTrain);

    $("#trainName").val("");
    $("#destination").val("");
    $("#firstTrainTime").val("");
    $("#frequency").val("");

})


database.ref("trains").on("child_added", (snapshot) => {

    let tFrequency = snapshot.val().Frequency;
    let firstTime = `${snapshot.val().TrainStart}`;
    let firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    let currentTime = moment();
    let diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    let tRemainder = diffTime % tFrequency;
    let tMinutesTillTrain = tFrequency - tRemainder;
    let nextTrain = moment().add(tMinutesTillTrain, "minutes");

    let newRow = $("<tr>").append(
        $("<td>").text(`${snapshot.val().Train}`),
        $("<td>").text(`${snapshot.val().Place}`),
        $("<td>").text(`${snapshot.val().Frequency}`),
        $("<td>").text(`${moment(nextTrain).format("hh:mm A")}`),
        $("<td>").text(`${tMinutesTillTrain}`),
    );

    $("#newTable > tbody").append(newRow);

})

