imgSRC = [];
imgSRC["TV"] = "tv.png"; imgSRC["Stove"] = "stove.png"; imgSRC["Air conditioner"] = "ac.png";
imgSRC["Washing maschine"] = "washingmaschine.png"; imgSRC["Heating"] = "heating.png"; imgSRC["Floor heating"] = "floor.png"; imgSRC["Dishwasher"] = "dishwasher.png";

fullName = [];
fullName["TV"] = "TV LED Fox 32DLE172"; fullName["Stove"] = "Hotpoint HAE60KS 60cm"; fullName["Air conditioner"] = "MRCOOL DIY 12k BTU 22";
fullName["Washing maschine"] = "BOSCH Serie | 8 washing machine"; fullName["Heating"] = "Heating"; fullName["Floor heating"] = "Floor heating"; fullName["Dishwasher"] = "Bosch 12 Place Setting Dishwasher";

function search() {
    document.getElementById("found").style.display = "block";
    document.getElementById("searchButton").style.display = "none";
    document.getElementById("searchParagraph").textContent = "We found these devices";
}

function newConnectedRow(imgSRC, device) {
    id = parseInt(sessionStorage.getItem("connectedID")) + 1;
    sessionStorage.setItem("connectedID", parseInt(sessionStorage.getItem("connectedID")) + 1);
    functionText = 'disconnect(\''+ device + '\', ' + id + ')';
    commandText = 'command(\''+ device + '\')';

    return '<div class="row" id="' + id + '"><div class="col-sm-3"><img src="img/' + imgSRC + '"></div>'+
				'<div class="col-sm-3"><div class="deviceText">' + device + '</div></div>'+
				'<div class="col-sm-3"><button class="btn btn-primary" onclick="' + commandText + '">Command</button></div>'+
				'<div class="col-sm-3"><button class="btn btn-outline-light" onclick="' + functionText + '">Disconnect</button></div>'+
			'</div>';
}

function newDisconnectedRow(imgSRC, device) {
    id = parseInt(sessionStorage.getItem("disconnectedID")) + 1;
    sessionStorage.setItem("disconnectedID", parseInt(sessionStorage.getItem("disconnectedID")) + 1);
    functionText = 'connect(\''+ device + '\', ' + id + ')';

    return '<div class="row" id="' + id + '"><div class="col-sm-3"><img src="img/' + imgSRC + '"></div>'+
				'<div class="col-sm-3"><div class="deviceText">' + device + '</div></div>'+
				'<div class="col-sm-6"><button class="btn btn-outline-light" onclick="' + functionText + '">Connect</button></div>'+
			'</div>';
}

function connect(device, rowID) { 
    oldHTML = document.getElementById("connectedDevices").innerHTML;
    newHTML = oldHTML + newConnectedRow(imgSRC[device], device);
    document.getElementById("connectedDevices").innerHTML = newHTML;

    rowID = '#' + rowID;
    $(rowID).remove();

    sessionStorage.setItem("numConnected", parseInt(sessionStorage.getItem("numConnected")) + 1);
    if (sessionStorage.getItem("numConnected") == "7") {
        document.getElementById("searchParagraph").textContent = 'You connected all nearby devices';
        document.getElementById("found").style.display = "none";
    }
}

function disconnect(device, rowID) {
    oldHTML = document.getElementById("found").innerHTML;
    newHTML = oldHTML + newDisconnectedRow(imgSRC[device], device);
    document.getElementById("found").innerHTML = newHTML;

    rowID = '#' + rowID;
    $(rowID).remove();

    if (sessionStorage.getItem("numConnected") == "7") {
        document.getElementById("searchParagraph").textContent = 'Search for other devices';
        document.getElementById("searchButton").style.display = "block";
        document.getElementById("searchButton").style.margin = "auto";
    }
    
    sessionStorage.setItem("numConnected", parseInt(sessionStorage.getItem("numConnected")) - 1);
}

function setCounter() {
    sessionStorage.setItem("numConnected", "4");
    sessionStorage.setItem("connectedID", "1004");
    sessionStorage.setItem("disconnectedID", "3");
}

function command(device) {
    sessionStorage.setItem("device", device);
    window.location.href = "singleCommand.html";
}

function statistics(device) {
    sessionStorage.setItem("device", device);
}

function setDeviceForCommand() {
    device = sessionStorage.getItem("device");

    document.getElementById("dd").innerHTML = '<div class="row">'+
                                                    '<div class="nameHolder">'+
                                                        '<p>' + fullName[device] + '</p>'+
                                                    '</div>'+
                                                '</div>'+
                                                '<div class="row">'+
                                                    '<div class="imgHolder">'+
                                                        '<img src="img/' + imgSRC[device] + '">'+
                                                    '</div>'+
                                                '</div>';

   if (device == "TV" || device == "Dishwasher" ||  device == "Washing maschine") document.getElementById("variationExtent").disabled = true;
   if (device == "TV" || device == "Dishwasher") document.getElementById("temperature").disabled = true;                                              
}

function smacoECO() {
    if (sessionStorage.getItem('device') == 'TV') {
        document.getElementById('durationHours').value = 2;
        document.getElementById('durationMinutes').value = 20;
        document.getElementById('additional').value = "ask if watching";
    }

    if (sessionStorage.getItem('device') == 'Stove') {
        document.getElementById('durationHours').value = 3;
        document.getElementById('durationMinutes').value = 14;
        document.getElementById('temperature').value = 140;
        document.getElementById('variationExtent').value = 7;
        document.getElementById('additional').value = "place = 2";
    }

    if (sessionStorage.getItem('device') == 'Washing maschine') {
        document.getElementById('durationHours').value = 1;
        document.getElementById('durationMinutes').value = 12;
        document.getElementById('temperature').value = 40;
        document.getElementById('additional').value = "quick wash";
    }

    if (sessionStorage.getItem('device') == 'Air conditioner') {
        document.getElementById('durationHours').value = 0;
        document.getElementById('durationMinutes').value = 30;
        document.getElementById('temperature').value = 22;
        document.getElementById('variationExtent').value = 9;
    }

    if (sessionStorage.getItem('device') == 'Heating') {
        document.getElementById('durationHours').value = 5;
        document.getElementById('durationMinutes').value = 30;
        document.getElementById('temperature').value = 23;
        document.getElementById('variationExtent').value = 11;
    }

    if (sessionStorage.getItem('device') == 'Floor heating') {
        document.getElementById('durationHours').value = 6;
        document.getElementById('durationMinutes').value = 10;
        document.getElementById('temperature').value = 22;
        document.getElementById('variationExtent').value = 10;
    }

    if (sessionStorage.getItem('device') == 'Dishwasher') {
        document.getElementById('durationHours').value = 1;
        document.getElementById('durationMinutes').value = 0;
        document.getElementById('additional').value = "quick wash";
    }
}

function smacoCOMFY() {
    if (sessionStorage.getItem('device') == 'TV') {
        document.getElementById('durationHours').value = 4;
        document.getElementById('durationMinutes').value = 33;
        document.getElementById('additional').value = "volume = 16";
    }

    if (sessionStorage.getItem('device') == 'Stove') {
        document.getElementById('durationHours').value = 1;
        document.getElementById('durationMinutes').value = 20;
        document.getElementById('temperature').value = 250;
        document.getElementById('variationExtent').value = 3;
        document.getElementById('additional').value = "place = 4";
    }

    if (sessionStorage.getItem('device') == 'Washing maschine') {
        document.getElementById('durationHours').value = 3;
        document.getElementById('durationMinutes').value = 5;
        document.getElementById('temperature').value = 70;
        document.getElementById('additional').value = "double wash";
    }

    if (sessionStorage.getItem('device') == 'Air conditioner') {
        document.getElementById('durationHours').value = 1;
        document.getElementById('durationMinutes').value = 40;
        document.getElementById('temperature').value = 26;
        document.getElementById('variationExtent').value = 4;
    }

    if (sessionStorage.getItem('device') == 'Heating') {
        document.getElementById('durationHours').value = 9;
        document.getElementById('durationMinutes').value = 14;
        document.getElementById('temperature').value = 25;
        document.getElementById('variationExtent').value = 3;
    }

    if (sessionStorage.getItem('device') == 'Floor heating') {
        document.getElementById('durationHours').value = 10;
        document.getElementById('durationMinutes').value = 49;
        document.getElementById('temperature').value = 24;
        document.getElementById('variationExtent').value = 3;
    }

    if (sessionStorage.getItem('device') == 'Dishwasher') {
        document.getElementById('durationHours').value = 2;
        document.getElementById('durationMinutes').value = 22;
    }
}

function setStatisticsInfo() {
    device = sessionStorage.getItem("device");

    document.getElementById("dd").innerHTML = '<div class="row">'+
                                                    '<div class="nameHolder">'+
                                                        '<p style="font-weight: 400;">' + fullName[device] + '</p>'+
                                                    '</div>'+
                                                '</div>';
}

function toTVMe() {
    window.location.href = "statisticsTVMe.html";
}
function toTVNearby() {
    window.location.href = "statisticsTVNearby.html";
}
function toTVGlobal() {
    window.location.href = "statisticsTVGlobal.html";
}
function toStoveMe() {
    window.location.href = "statisticsStoveMe.html";
}
function toStoveNearby() {
    window.location.href = "statisticsStoveNearby.html";
}
function toStoveGlobal() {
    window.location.href = "statisticsStoveGlobal.html";
}
function toWashingMaschineMe() {
    window.location.href = "statisticsWashingMaschineMe.html";
}
function toWashingMaschineNearby() {
    window.location.href = "statisticsWashingMaschineNearby.html";
}
function toWashingMaschineGlobal() {
    window.location.href = "statisticsWashingMaschineGlobal.html";
}
function toAirConditionerMe() {
    window.location.href = "statisticsAirConditionerMe.html";
}
function toAirConditionerNearby() {
    window.location.href = "statisticsAirConditionerNearby.html";
}
function toAirConditionerGlobal() {
    window.location.href = "statisticsAirConditionerGlobal.html";
}
