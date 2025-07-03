// HAQ Utility Tools

const tools = {
    passwordGenerator: {
        render: (container) => {
            container.innerHTML = `
                <h2>Password Generator</h2>
                <p>Generate a random secure password</p>
                <label>Length: <input type="number" id="pwLength" value="12" min="6" max="64"></label>
                <button id="generatePw">Generate</button>
                <textarea id="pwOutput" readonly rows="3" style="width:100%;margin-top:10px;"></textarea>
            `;
            const lengthInput = container.querySelector('#pwLength');
            const generateBtn = container.querySelector('#generatePw');
            const output = container.querySelector('#pwOutput');

            function generatePassword(length) {
                const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
                let pw = '';
                for(let i=0; i<length; i++) {
                    pw += chars.charAt(Math.floor(Math.random() * chars.length));
                }
                return pw;
            }

            generateBtn.addEventListener('click', () => {
                let len = parseInt(lengthInput.value);
                if(isNaN(len) || len < 6) len = 12;
                output.value = generatePassword(len);
            });
        }
    },
    calculator: {
        render: (container) => {
            container.innerHTML = `
                <h2>Simple Calculator</h2>
                <input type="text" id="calcInput" readonly style="width:100%; font-size:1.2rem; margin-bottom:1rem; padding:8px;" />
                <div class="calc-buttons" style="display:grid; grid-template-columns: repeat(4,1fr); gap:10px;">
                    <button>7</button><button>8</button><button>9</button><button>/</button>
                    <button>4</button><button>5</button><button>6</button><button>*</button>
                    <button>1</button><button>2</button><button>3</button><button>-</button>
                    <button>0</button><button>.</button><button>=</button><button>+</button>
                    <button id="clearCalc" style="grid-column: span 4; background:#00796b; color:#fff;">Clear</button>
                </div>
            `;

            const input = container.querySelector('#calcInput');
            const buttons = container.querySelectorAll('.calc-buttons button');
            buttons.forEach(btn => {
                btn.addEventListener('click', () => {
                    if(btn.id === 'clearCalc') {
                        input.value = '';
                    } else if(btn.textContent === '=') {
                        try {
                            input.value = eval(input.value) || '';
                        } catch {
                            input.value = 'Error';
                        }
                    } else {
                        input.value += btn.textContent;
                    }
                });
            });
        }
    },
    ageCalculator: {
        render: (container) => {
            container.innerHTML = `
                <h2>Age Calculator</h2>
                <label>Enter your birthdate: <input type="date" id="birthdate"></label>
                <button id="calcAgeBtn">Calculate Age</button>
                <p id="ageResult" style="margin-top:1rem; font-weight:bold;"></p>
            `;
            const birthdateInput = container.querySelector('#birthdate');
            const calcBtn = container.querySelector('#calcAgeBtn');
            const result = container.querySelector('#ageResult');

            calcBtn.addEventListener('click', () => {
                const birthdate = new Date(birthdateInput.value);
                if(!birthdate.getTime()) {
                    result.textContent = 'Please enter a valid birthdate.';
                    return;
                }
                const now = new Date();
                let age = now.getFullYear() - birthdate.getFullYear();
                const m = now.getMonth() - birthdate.getMonth();
                if(m < 0 || (m === 0 && now.getDate() < birthdate.getDate())) {
                    age--;
                }
                result.textContent = `You are ${age} years old.`;
            });
        }
    },
    encoderDecoder: {
        render: (container) => {
            container.innerHTML = `
                <h2>Text Encoder / Decoder</h2>
                <textarea id="inputText" placeholder="Enter text here" rows="4" style="width:100%;"></textarea>
                <div style="margin-top:1rem;">
                    <button id="encodeBtn">Base64 Encode</button>
                    <button id="decodeBtn">Base64 Decode</button>
                </div>
                <textarea id="outputText" readonly rows="4" style="width:100%; margin-top:1rem;"></textarea>
            `;
            const input = container.querySelector('#inputText');
            const output = container.querySelector('#outputText');
            const encodeBtn = container.querySelector('#encodeBtn');
            const decodeBtn = container.querySelector('#decodeBtn');

            encodeBtn.addEventListener('click', () => {
                try {
                    output.value = btoa(input.value);
                } catch {
                    output.value = 'Invalid input for encoding.';
                }
            });

            decodeBtn.addEventListener('click', () => {
                try {
                    output.value = atob(input.value);
                } catch {
                    output.value = 'Invalid Base64 input for decoding.';
                }
            });
        }
    },
    notepad: {
        render: (container) => {
            container.innerHTML = `
                <h2>NotePad</h2>
                <textarea id="notes" placeholder="Write your notes here..." rows="10" style="width:100%;"></textarea>
                <button id="saveNotes" style="margin-top:1rem;">Save Notes</button>
                <button id="clearNotes" style="margin-left:1rem;">Clear Notes</button>
                <p id="saveStatus" style="margin-top:0.5rem;"></p>
            `;
            const notes = container.querySelector('#notes');
            const saveBtn = container.querySelector('#saveNotes');
            const clearBtn = container.querySelector('#clearNotes');
            const status = container.querySelector('#saveStatus');

            // Load saved notes
            notes.value = localStorage.getItem('haqutility_notes') || '';

            saveBtn.addEventListener('click', () => {
                localStorage.setItem('haqutility_notes', notes.value);
                status.textContent = 'Notes saved successfully.';
                setTimeout(() => status.textContent = '', 2000);
            });

            clearBtn.addEventListener('click', () => {
                notes.value = '';
                localStorage.removeItem('haqutility_notes');
                status.textContent = 'Notes cleared.';
                setTimeout(() => status.textContent = '', 2000);
            });
        }
    },
    qrCodeGenerator: {
        render: (container) => {
            container.innerHTML = `
                <iframe src="qr.html" 
                        width="100%" 
                        height="520px" 
                        style="border:none; border-radius:12px;">
                </iframe>
            `;
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const toolModal = document.getElementById('toolModal');
    const toolContainer = document.getElementById('toolContainer');
    const closeBtn = toolModal.querySelector('.close-btn');
    const darkModeToggle = document.getElementById('darkModeToggle');

    function openTool(name) {
        toolContainer.innerHTML = '<p>Loading tool...</p>';
        if(tools[name]) {
            tools[name].render(toolContainer);
        } else {
            toolContainer.innerHTML = '<p>Tool not found.</p>';
        }
        toolModal.classList.remove('hidden');
    }

    document.querySelectorAll('.open-tool-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const toolName = btn.closest('.tool-card').dataset.tool;
            openTool(toolName);
        });
    });

    closeBtn.addEventListener('click', () => {
        toolModal.classList.add('hidden');
        toolContainer.innerHTML = '';
    });

    // Dark mode toggle
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        if (document.body.classList.contains('dark')) {
            localStorage.setItem('haqUtilityDarkMode', 'true');
        } else {
            localStorage.removeItem('haqUtilityDarkMode');
        }
    });

    // Restore dark mode state on page load
    if(localStorage.getItem('haqUtilityDarkMode') === 'true') {
        document.body.classList.add('dark');
    }
});

// Register service worker for PWA support
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
        .then(() => console.log('HAQ Utility PWA: Service Worker registered.'))
        .catch(err => console.error('SW registration failed:', err));
                }
