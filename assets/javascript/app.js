var config = {
    apiKey: "AIzaSyC7TgqAKLXu_ZliaG3L63feEIx3kU2LOYU",
    authDomain: "train-scheduler-6550f.firebaseapp.com",
    databaseURL: "https://train-scheduler-6550f.firebaseio.com",
    projectId: "train-scheduler-6550f",
    storageBucket: "",
    messagingSenderId: "304953293669"
};
firebase.initializeApp(config);

var database = firebase.database();

$("#submit").on('click', function (event) {
    event.preventDefault();

    var trainName = $("#train-name").val();
    var trainDestination = $("#destination").val();
    var firstTrainTime = $("#first-train-time").val();
    var trainFrequency = $("#frequency").val();

    database.ref().push({
        name: trainName,
        destination: trainDestination,
        time: firstTrainTime,
        frequency: trainFrequency
    });

   document.getElementById('train-info').reset();

});

database.ref().on('child_added', function (snapshot) {

    var trainNameResult = snapshot.val().name;
    var trainDestinationResult = snapshot.val().destination;
    var firstTrainResult = snapshot.val().time;
    var trainFrequencyResult = snapshot.val().frequency;

    var timeStart = firstTrainResult;
    var frequencyCalc = trainFrequencyResult;
    var firstTrainTimeConvert = moment(timeStart, "hh:mm").subtract(1, "years");
    var timeDifferenceCalc = moment().diff(moment(firstTrainTimeConvert), "minutes");
    var timeRemainderCalc = timeDifferenceCalc % frequencyCalc;
    var nextTrainDuration = frequencyCalc - timeRemainderCalc;
    var nextTrain = moment().add(nextTrainDuration, "minutes").format("hh:mm");

    var tableRow = $("<tr>");

    tableRow.append("<td>" + trainNameResult + "</td>");
    tableRow.append("<td>" + trainDestinationResult + "</td>");
    tableRow.append("<td>" + trainFrequencyResult + "</td>");
    tableRow.append("<td>" + nextTrain + "</td>");
    tableRow.append("<td>" + nextTrainDuration + "</td>");


    $("#train-schedule-table").append(tableRow);
})