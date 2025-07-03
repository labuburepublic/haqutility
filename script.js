// Tab Switching
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tab-button");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

// Password Generator
function generatePassword() {
    let dictionary = "";
    if (document.getElementById("lowercaseCb") && document.getElementById("lowercaseCb").checked) {
        dictionary += "qwertyuiopasdfghjklzxcvbnm";
    }
    if (document.getElementById("uppercaseCb") && document.getElementById("uppercaseCb").checked) {
        dictionary += "QWERTYUIOPASDFGHJKLZXCVBNM";
    }
    if (document.getElementById("digitsCb") && document.getElementById("digitsCb").checked) {
        dictionary += "1234567890";
    }
    if (document.getElementById("specialsCb") && document.getElementById("specialsCb").checked) {
        dictionary += "!@#$%^&*()_+-={}[];<>:"; 
    }
    const length = document.querySelector('#password-generator input[type="range"]') ? document.querySelector('#password-generator input[type="range"]').value : 12;
    if (length < 1 || dictionary.length === 0) {
        return;
    }
    let password = "";
    for (let i = 0; i < length; i++) {
        const pos = Math.floor(Math.random() * dictionary.length);
        password += dictionary[pos];
    }
    if (document.querySelector('#password-generator input[type="text"]')) {
        document.querySelector('#password-generator input[type="text"]').value = password;
    }
}

if (document.querySelector('#password-generator button')) {
    document.querySelector('#password-generator button').addEventListener("click", function(event) {
        event.preventDefault();
        generatePassword();
    });
}

// Time Zone Converter (Basic Example)
function convertTime() {
    const fromTimeZone = "UTC";
    const toTimeZone = "America/New_York";
    const time = new Date();

    const options = {
        timeZone: fromTimeZone,
        hour12: false,
        hour: '2-digit',
        minute: '2-digit'
    };

    const fromTime = time.toLocaleTimeString('en-US', options);
    const toTimeOptions = {
        timeZone: toTimeZone,
        hour12: false,
        hour: '2-digit',
        minute: '2-digit'
    };
    const toTime = time.toLocaleTimeString('en-US', toTimeOptions);

    if (document.getElementById("converted-time")) {
        document.getElementById("converted-time").innerHTML = `Converted Time: ${toTime}`;
    }
}

if (document.querySelector('#time-zone-converter button')) {
    document.querySelector('#time-zone-converter button').addEventListener("click", function(event) {
        event.preventDefault();
        convertTime();
    });
}

// Text Analysis
function analyzeText() {
    const text = document.getElementById("text") ? document.getElementById("text").value : "";
    const wordCount = text.split(" ").length;
    const characterCount = text.length;

    if (document.getElementById("word-count")) {
        document.getElementById("word-count").innerHTML = `Word Count: ${wordCount}`;
    }
    if (document.getElementById("character-count")) {
        document.getElementById("character-count").innerHTML = `Character Count: ${characterCount}`;
    }
}

if (document.querySelector('#text-analysis button')) {
    document.querySelector('#text-analysis button').addEventListener("click", function(event) {
        event.preventDefault();
        analyzeText();
    });
}

//