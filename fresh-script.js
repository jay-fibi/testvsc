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

        ctx.fillStyle = '#00ff41'; // Green text
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
            i++;
            
            if (i >= sampleCode.length) {
                clearInterval(typeInterval);
                editor.disabled = false;
                editor.focus();
            }
        }, 30);
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
});
