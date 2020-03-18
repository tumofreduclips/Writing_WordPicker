/**
 * Created by DavidMcarati on 4/9/2019.
 */
var mainText = document.getElementById("tx");
var txId;
var txIdAnswersArray = [];

$('document').ready(function () {
    generateText();

});

document.addEventListener("contextmenu", function(e){
    e.preventDefault();
}, false);


function closeTutorial(){
    var tut = document.getElementById("tutorial");
    tut.style.display = "none";
}


function generateText() {
    txId = getRandomInt(data.length);
    var txToShow = "";
    for(var i = 0; i < data[txId].text.length; i++) {
        txToShow += data[txId].text[i];
        if (i != data[txId].text.length - 1) {
            txToShow += generateSpace(i, data[txId].values[i].type);
            console.log('#id' + i);

        }
    }
    document.getElementById("tx").innerHTML = txToShow;
    for(var i = 0; i < data[txId].values.length; i++){
        var tempListContent = "<ol>";
        for(var j = 0; j < data[txId].values[i].answers.length; j++){
            tempListContent += "<li><a onclick='SetAnswer("+ i +","+ j +")'>" + data[txId].values[i].answers[j] + "</a></li>";
        }
        tempListContent += "</ol>";
        tippy('#id' + i, {
            theme: 'light',
            trigger: 'click',
            interactive: true,
            placement: 'bottom',
            arrow : true,
            content: tempListContent
        })
    }
    recalculateUI();
    setTimeout(function(){console.log("recalculate");recalculateUI()},500);
}

function SetAnswer(placeId, answerId) {
    var ans = data[txId].values[placeId].answers[answerId];
    document.getElementById("id" + placeId).innerHTML = ans;
    recalculateUI();
    txIdAnswersArray[placeId] = answerId;
    return;
    if(answerId === data[txId].values[placeId].correct){
        $("#id"+placeId).css("color", "#23ff00" );
    } else {
        $("#id"+placeId).css("color", "#ff1a26" );
    }

}

function recalculateUI() {
    $("#tx").css("fontSize", "50px" );
    fitText("tx");
}

function generateKey() {
    var key = "";
    key += txId + "_";
    if(txIdAnswersArray.length !== data[txId].values.length){
        window.parent.window.alert("Work is not done yet");
        return;
    }
    for(var i = 0; i < txIdAnswersArray.length; i++){
        if(txIdAnswersArray[i] === undefined){
            window.parent.window.alert("Work is not done yet");
            return;
        }
    }

    for(var i = 0; i < txIdAnswersArray.length; i++){
        key += txIdAnswersArray[i];
        if(i !== txIdAnswersArray.length - 1){
            key += "-";
        }
    }
    var text = "Example text to appear on clipboard";
    var encodedString = Base64.encode(key);
    prompt("Please copy this key:", encodedString);
}

