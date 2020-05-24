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
    window.location.href = "commands.html";
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
   if (device == "TV") document.getElementById("temperature").disabled = true;                                              
}

function izviniAnja() {
    alert("Izvini Anja nisam jos ovo napravio...");
}