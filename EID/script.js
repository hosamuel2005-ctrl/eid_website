const SERVICE_UUID = "0000ffe0-0000-1000-8000-00805f9b34fb";
const CHARACTERISTIC_UUID = "0000ffe1-0000-1000-8000-00805f9b34fb";
const connectBtn = document.getElementById("connectBtn");
const output = document.getElementById("output");
const bluetooth = document.getElementById("bluetooth");
let device = null;
let lastPacketTime = 0;
let watchdogInterval = null;
connectBtn.addEventListener("click", connectBLE);


function updateData(phase) {

    let phaseBox = document.getElementById("phaseBox");
    let text = document.getElementById("statusText");

    phaseBox.className = phase;

    if (phase === "initial") {
        phaseBox.innerText = "OFF";
        text.innerText = "Device not connected";
        text.style.fontWeight = "400";
        text.style.color = "black";
        document.getElementById("cane_status").style.color = "#000080";
        document.querySelectorAll(".fall").forEach(element => {
            element.style.color = "#000080";
        });
        document.querySelectorAll(".buzzer").forEach(element => {
            element.innerText = "OFF";
        });
        document.querySelectorAll(".led").forEach(element => {
            element.innerText = "OFF";
        });
        document.querySelectorAll(".led").forEach(element => {
            element.style.color = "#000080";
        });
        document.querySelector(".card_status img").src = "onoff.png";
        document.querySelectorAll(".light_icone").forEach(element => {
            element.src = "light_grey.png";
        });
        document.getElementById("card_status").style.border = "5px solid grey";
        document.getElementById("alarm").muted = true;
        document.getElementById("warning_alarm").muted = true;
        document.getElementById("state_page").style.backgroundColor = "#0147AB";
        document.getElementById("card_status").style.position = "relative";
        document.getElementById("fall").innerText = "No Fall Detected";
        document.getElementById("fall").style.fontWeight = "bold";
        document.getElementById("fall").style.color = "#0147AB";
        document.getElementById("card_fall").style.border = "0px solid white";
        document.getElementById("card_fall").style.position = "static";
        document.querySelector(".card_fall img").src = "fall.png";
    }

    if (phase === "safe") {
        phaseBox.innerText = "SAFE";
        text.innerText = "User is safe";
        text.style.fontWeight = "400";
        text.style.color = "black";
        document.getElementById("cane_status").style.color = "#000080";
        document.querySelectorAll(".buzzer").forEach(element => {
            element.innerText = "OFF";
        });
        document.querySelectorAll(".led").forEach(element => {
            element.innerText = "GREEN";
        });
        document.querySelectorAll(".led").forEach(element => {
            element.style.color = "green";
        });
        document.querySelector(".card_status img").src = "safe.png";
        document.querySelectorAll(".light_icone").forEach(element => {
            element.src = "light_safe.png";
        });
        document.getElementById("card_status").style.border = "5px solid green";
        document.getElementById("alarm").muted = true;
        document.getElementById("warning_alarm").muted = true;
        document.getElementById("state_page").style.backgroundColor = "#0147AB";
        document.getElementById("card_status").style.position = "relative";
        document.getElementById("fall").innerText = "No Fall Detected";
        document.getElementById("fall").style.fontWeight = "bold";
        document.getElementById("fall").style.color = "#0147AB";
        document.getElementById("card_fall").style.border = "0px solid white";
        document.getElementById("card_fall").style.position = "static";
        document.querySelector(".card_fall img").src = "fall.png";
    }

    if (phase === "warning") {
        fallData("nfall");
        phaseBox.innerText = "WARNING";
        text.innerText = "User might be in danger";
        text.style.fontWeight = "400";
        text.style.color = "black";
        document.getElementById("cane_status").style.color = "#000080";
        document.querySelectorAll(".buzzer").forEach(element => {
            element.innerText = "ON";
        });
        document.querySelectorAll(".led").forEach(element => {
            element.innerText = "YELLOW";
        });
        document.querySelectorAll(".led").forEach(element => {
            element.style.color = "orange";
        });
        document.querySelector(".card_status img").src = "warning.png";
        document.querySelectorAll(".light_icone").forEach(element => {
            element.src = "light_warning.png";
        });
        document.getElementById("card_status").style.border = "5px solid orange";
        document.getElementById("alarm").muted = true;
        document.getElementById("warning_alarm").muted = false;
        document.getElementById("warning_alarm").play();
        document.getElementById("state_page").style.backgroundColor = "orange";
        document.getElementById("card_status").style.position = "relative";
        document.querySelector(".card_fall img").src = "fall.png";
    }

    if (phase === "danger") {
        phaseBox.innerText = "DANGER";
        text.innerText = "USER IS IN DANGER";
        text.style.fontWeight = "bold";
        text.style.color = "red";
        document.getElementById("cane_status").style.color = "red";
        document.querySelectorAll(".buzzer").forEach(element => {
            element.innerText = "ON";
        });
        document.querySelectorAll(".led").forEach(element => {
            element.innerText = "RED";
        });
        document.querySelectorAll(".led").forEach(element => {
            element.style.color = "red";
        });
        document.querySelector(".card_status img").src = "danger.png";
        document.querySelectorAll(".light_icone").forEach(element => {
            element.src = "light_danger.png";
        });
        document.getElementById("card_status").style.border = "20px solid red";
        document.getElementById("alarm").muted = false;
        document.getElementById("warning_alarm").muted = true;
        document.getElementById("alarm").play();
        document.getElementById("state_page").style.backgroundColor = "red";
        document.getElementById("card_status").style.position = "fixed";
        document.getElementById("card_status").style.zIndex = "2";
    }
}

function fallData(phase) {
    if (phase === "fall") {
        document.getElementById("fall").innerText = "FALL DETECTED";
        document.getElementById("fall").style.fontWeight = "bold";
        document.getElementById("fall").style.color = "red"
        document.getElementById("card_fall").style.border = "20px solid red";
        document.getElementById("card_fall").style.position = "fixed";
        document.getElementById("card_fall").style.left = "300px";
        document.getElementById("card_fall").style.zIndex = "1";
        document.querySelector(".card_fall img").src = "fall_red.png";
        updateData("danger");
        document.getElementById("fall_det").style.color = "red";
    }
    if (phase == "nfall") {
        updateData("safe");
        document.getElementById("fall_det").style.color = "#000080";
    }
}

function button(type) {
    if (type === 0) {
        updateData("initial");
    }
    else if (type === 1) {
        updateData("safe");
    }

    else if (type === 2) {
        updateData("warning");
    }
    else if (type === 3) {
        updateData("danger");
    }
    else if (type === 4) {
        fallData("fall");
    }
    else if (type === 5) {
        fallData("nfall")
    }
}

function showMap() {
    let lat = document.getElementById("lat").value;
    let lng = document.getElementById("lng").value;

    if (lat == "" || lng == "") {
        lat = 1.340167;
        lng = 103.675497;
    }
    document.getElementById("map").src = `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`;
}

function drop(state) {
    if (state === 1) {
        document.querySelectorAll(".member").forEach(element => {
            element.style.display = "block"
        });
        document.getElementById("dropup").style.display = "block";
        document.getElementById("dropdown").style.display = "none";
    }

    if (state === 2) {
        document.querySelectorAll(".member").forEach(element => {
            element.style.display = "none"
        });
        document.getElementById("dropup").style.display = "none";
        document.getElementById("dropdown").style.display = "block";
    }
}


function setStatus(text, color) {
    bluetooth.textContent = text;
    bluetooth.style.color = color; 
}

async function connectBLE() {

    try {

        setStatus("Connecting...", "orange");
        document.getElementById("liveStatus").style.color = "orange";
        updateData("initial");

        device = await navigator.bluetooth.requestDevice({
            filters: [
                { services: [SERVICE_UUID] }
            ]
        });

        device.addEventListener(
            "gattserverdisconnected", onDisconnected
        )

        const server = await device.gatt.connect();

        setStatus("Connected", "green");
        document.getElementById("liveStatus").style.color = "green";

        console.log("Device:", device.name);

        // Get service
        const service =
          await server.getPrimaryService(
            SERVICE_UUID
        );

        // Get characteristic
        const characteristic =
          await service.getCharacteristic(
            CHARACTERISTIC_UUID
        );

        // Enable notifications
        await characteristic.startNotifications();
        lastPacketTime = Date.now();

        console.log(
          "Notifications started"
        );

        // Receive BLE data
        characteristic.addEventListener(
          "characteristicvaluechanged",
          (event) => {

            const value =
              event.target.value;

            console.log(
              new Uint8Array(value.buffer)
            );

            const decoder =
              new TextDecoder("utf-8");

            const text =
              decoder.decode(value).trim();

            console.log(
              "Received:",
              text
            );

            lastPacketTime = Date.now();

            //output.textContent += text + "\n";
            
            if (text === "F") {
                fallData("fall");
            }
            else {
                fallData("nfall");
                if (text === "D") {
                    updateData("danger");
                }
                else if (text === "W") {
                    updateData("warning");
                }
                else if (text === "S") {
                    updateData("safe");
                }
            }
          }
        );
        startConnectionWatchdog();
    } catch (error) {

        console.error(error);
    }
}

function onDisconnected() {
    setStatus("Disconnected", "grey");
    document.getElementById("liveStatus").style.color = "grey";
    updateData("initial");
    console.log("Device disconnected");
}

function startConnectionWatchdog() {
    setInterval(() => {
        if (!device || !device.gatt.connected) {
            setStatus("Disconnected", "grey");
            updateData("initial");
            return;
        }
        const now = Date.now();

        if (now - lastPacketTime > 5000) {
            setStatus("Disonnected", "grey");
            document.getElementById("liveStatus").style.color = "grey";
            updateData("initial");
            console.log("No data timeout -> treating as disconnected");
        }
    }, 2000);
}