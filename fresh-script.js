document.addEventListener('DOMContentLoaded', () => {
    // === OPTIMIZED MATRIX RAIN EFFECT (CANVAS) ===
    const canvas = document.getElementById('matrixCanvas');
    const ctx = canvas.getContext('2d');

    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Matrix characters
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%""\'\'#&_(),.;:?!\\|{}<>[]^~';
    const charArray = characters.split('');
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);

    // Array of drops - one per column
    const drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100; // Start at random positions above visible area
    }

    function drawMatrix() {
        // Semi-transparent black to create fade effect
        ctx.fillStyle = 'rgba(13, 13, 13, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Use CSS variable for color to sync with theme
        // Getting computed style every frame is fine for this simple animation
        // Using main matrix-green (which becomes blue in blue theme) for vibrant rain
        const color = getComputedStyle(document.documentElement).getPropertyValue('--matrix-green').trim();
        ctx.fillStyle = color || '#00ff41';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            // Pick a random character
            const text = charArray[Math.floor(Math.random() * charArray.length)];
            
            // Draw the character
            const x = i * fontSize;
            const y = drops[i] * fontSize;
            ctx.fillText(text, x, y);

            // Reset drop to top randomly after it has crossed screen
            // Adding randomness to the reset to vary rain density
            if (y > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }

            // Increment Y coordinate
            drops[i]++;
        }
    }

    // Run animation loop - 20 FPS for a slower, more cinematic effect
    setInterval(drawMatrix, 90);


    // === EDITOR FUNCTIONALITY ===
    const editor = document.getElementById('editor');
    const lineNumbers = document.getElementById('lineNumbers');
    const cursorPosition = document.getElementById('cursorPosition');
    const wordCount = document.getElementById('wordCount');
    const clearBtn = document.getElementById('clearBtn');
    const fillBtn = document.getElementById('fillBtn');

    function updateLineNumbers() {
        const lines = editor.value.split('\n').length;
        lineNumbers.innerHTML = Array(lines).fill(0).map((_, i) => i + 1).join('<br>');
    }

    function updateStats() {
        const text = editor.value;
        const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
        wordCount.textContent = `Words: ${words}`;
        
        const cursorPos = editor.selectionStart;
        const textBeforeCursor = text.substring(0, cursorPos);
        const lines = textBeforeCursor.split('\n');
        const currentLine = lines.length;
        const currentCol = lines[lines.length - 1].length + 1;
        
        cursorPosition.textContent = `Ln ${currentLine}, Col ${currentCol}`;
    }

    editor.addEventListener('input', () => {
        updateLineNumbers();
        updateStats();
    });

    editor.addEventListener('click', updateStats);
    editor.addEventListener('keyup', updateStats);
    editor.addEventListener('scroll', () => {
        lineNumbers.scrollTop = editor.scrollTop;
    });

    // Initial update
    updateLineNumbers();
    updateStats();


    // === UI INTERACTIONS ===
    
    // Clear Button
    clearBtn.addEventListener('click', () => {
        editor.value = '';
        updateLineNumbers();
        updateStats();
        editor.focus();
    });

    // === COOL FEATURES ===

    // 1. Hacker Mode (Type anything -> Output code)
    let hackerMode = false;
    const hackerCode = `
class Matrix {
    constructor() {
        this.reality = null;
        this.agents = [];
    }
    
    inject(target) {
        if (target.isAwake) return false;
        this.connect(target.port);
        return new Simulation(target);
    }
    
    // TRACE PROGRAM INITIATED
    // SEARCHING FOR ANOMALIES...
    // TARGET FOUND: NEO
}`;
    let hackerIndex = 0;

    // Add toggle button to UI
    const controls = document.querySelector('.quick-actions');
    const hackerBtn = document.createElement('button');
    hackerBtn.className = 'ghost-btn';
    hackerBtn.textContent = 'Hacker Mode';
    hackerBtn.style.color = '#ffbd2e';
    hackerBtn.style.borderColor = '#ffbd2e';
    controls.appendChild(hackerBtn);

    hackerBtn.addEventListener('click', () => {
        hackerMode = !hackerMode;
        hackerBtn.style.background = hackerMode ? 'rgba(255, 189, 46, 0.2)' : 'transparent';
        editor.focus();
        editor.placeholder = hackerMode ? "TYPE ANYTHING TO HACK..." : "";
        if (hackerMode) editor.value = '';
    });

    editor.addEventListener('keydown', (e) => {
        if (hackerMode && e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) {
            e.preventDefault();
            const char = hackerCode[hackerIndex % hackerCode.length];
            editor.value += char;
            hackerIndex++;
            
            // Auto-scroll
            editor.scrollTop = editor.scrollHeight;
            updateLineNumbers();
            updateStats();
            
            // Add randomness to make it feel organic
            if (Math.random() > 0.5) {
                editor.value += hackerCode[hackerIndex % hackerCode.length];
                hackerIndex++;
            }
        }
    });

    // 2. Typing Sounds (Synthesized)
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    
    function playKeySound() {
        if (audioCtx.state === 'suspended') audioCtx.resume();
        
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        
        // Randomize pitch slightly for realism
        osc.frequency.setValueAtTime(600 + Math.random() * 200, audioCtx.currentTime);
        osc.type = 'square'; // Clicky sound
        
        gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
        
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        
        osc.start();
        osc.stop(audioCtx.currentTime + 0.05);
    }

    editor.addEventListener('keydown', () => {
        playKeySound();
    });

    // 3. Boot Sequence Effect
    const originalText = editor.value;
    editor.value = '';
    
    const bootLines = [
        "INITIALIZING BIOS...",
        "CHECKING MEMORY... OK",
        "LOADING KERNEL... OK",
        "MOUNTING FILE SYSTEMS...",
        "ESTABLISHING SECURE CONNECTION...",
        "ACCESS GRANTED."
    ];
    
    let bootIndex = 0;
    
    function runBootSequence() {
        if (bootIndex < bootLines.length) {
            editor.value += bootLines[bootIndex] + '\n';
            updateLineNumbers();
            bootIndex++;
            setTimeout(runBootSequence, 300);
        } else {
            setTimeout(() => {
                editor.value = originalText;
                updateLineNumbers();
                updateStats();
            }, 800);
        }
    }
    
    // Start boot sequence on load
    // runBootSequence(); // Defer until choice

    // === STARTUP LOGIC ===
    const pillOverlay = document.getElementById('pillOverlay');
    const introRedPill = document.getElementById('introRedPill');
    const introBluePill = document.getElementById('introBluePill');
    const editorShell = document.querySelector('.editor-shell');

    function enterMatrix(theme) {
        setTheme(theme);
        
        // Fade out overlay
        pillOverlay.style.opacity = '0';
        setTimeout(() => {
            pillOverlay.style.display = 'none';
            editorShell.style.display = 'flex'; // Show editor
            
            // Start boot sequence
            runBootSequence();
        }, 800);
    }

    introRedPill.addEventListener('click', () => enterMatrix('green'));
    introBluePill.addEventListener('click', () => enterMatrix('blue'));

    // Inject Button (Simulate typing)
    const sampleCode = `function initiateMatrix() {
    const neo = new One();
    if (neo.believes()) {
        matrix.reload();
        return true;
    }
    return false;
}

// System Failure
// Rebooting...`;

    fillBtn.addEventListener('click', () => {
        editor.value = '';
        let i = 0;
        editor.disabled = true;
        
        const typeInterval = setInterval(() => {
            editor.value += sampleCode.charAt(i);
            editor.scrollTop = editor.scrollHeight;
            updateLineNumbers();
            updateStats();
            playKeySound(); // Play sound!
            i++;
            
            if (i >= sampleCode.length) {
                clearInterval(typeInterval);
                editor.disabled = false;
                editor.focus();
            }
        }, 50); // Slightly slower for better effect
    });

    // File Selection
    const files = document.querySelectorAll('.file');
    const tabs = document.querySelectorAll('.tab');
    
    files.forEach(file => {
        file.addEventListener('click', () => {
            files.forEach(f => f.classList.remove('active'));
            file.classList.add('active');
            
            // Simple file content simulation
            const fileName = file.innerText;
            if (fileName.includes('cipher')) {
                editor.value = '// ENCRYPTED CONTENT\n// ACCESS DENIED\n// 0x4F 0x9A 0x11...';
            } else if (fileName.includes('mission')) {
                editor.value = 'OBJECTIVE: LOCATE THE KEYMAKER\nPRIORITY: ALPHA\nSTATUS: PENDING...';
            } else if (fileName.includes('signal')) {
                editor.value = 'const signal = new BroadcastChannel("matrix");\nsignal.postMessage({ status: "alert" });';
            } else {
                editor.value = '// SYSTEM ONLINE :: MATRIX NODE 7\n// TYPE TO BEGIN THE TRANSMISSION\n\nWake up, Neo.\nThe Matrix has you...';
            }
            updateLineNumbers();
            updateStats();
        });
    });

    // Tab Switching
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
        });
    });

    // 4. Red Pill / Blue Pill Theme Toggle
    const redPill = document.getElementById('redPill');
    const bluePill = document.getElementById('bluePill');
    const root = document.documentElement;

    function setTheme(theme) {
        if (theme === 'blue') {
            root.style.setProperty('--matrix-green', '#0000ff');
            root.style.setProperty('--matrix-dark-green', '#00008b');
            root.style.setProperty('--matrix-cursor', '#000080');
            // Update canvas color context for next draw
            ctx.fillStyle = '#0000ff';
        } else {
            // Default Green (Red pill stays in Wonderland/Matrix)
            root.style.setProperty('--matrix-green', '#00ff41');
            root.style.setProperty('--matrix-dark-green', '#008f11');
            root.style.setProperty('--matrix-cursor', '#003b00');
        }
    }

    bluePill.addEventListener('click', () => setTheme('blue'));
    redPill.addEventListener('click', () => setTheme('green'));
});
