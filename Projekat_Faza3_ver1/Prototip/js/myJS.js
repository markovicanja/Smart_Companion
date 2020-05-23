imgSRC = [];
imgSRC["TV"] = "tv.png"; imgSRC["Stove"] = "stove.png"; imgSRC["Fridge"] = "fridge.png"; imgSRC["Air conditioner"] = "ac.png";
imgSRC["Washing maschine"] = "washingmaschine.png"; imgSRC["Heating"] = "heating.png"; imgSRC["Floor heating"] = "floor.png"; imgSRC["Dishwasher"] = "dishwasher.png";

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
    if (sessionStorage.getItem("numConnected") == "8") {
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

    if (sessionStorage.getItem("numConnected") == "8") {
        document.getElementById("searchParagraph").textContent = 'Search for other devices';
        document.getElementById("searchButton").style.display = "block";
        document.getElementById("searchButton").style.margin = "auto";
    }
    
    sessionStorage.setItem("numConnected", parseInt(sessionStorage.getItem("numConnected")) - 1);
}

function setCounter() {
    sessionStorage.setItem("numConnected", "5");
    sessionStorage.setItem("connectedID", "1005");
    sessionStorage.setItem("disconnectedID", "3");
}

function command(device) {
    sessionStorage.setItem("device", device);
}

function setDeviceForCommand() {
    device = sessionStorage.getItem("device");
    
}