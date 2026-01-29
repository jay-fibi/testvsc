// Matrix Rain Animation
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

const matrixChars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
const fontSize = 16;
const columns = Math.floor(width / fontSize);
const drops = Array(columns).fill(3);

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = '#00ff00';
    ctx.font = `${fontSize}px 'Courier New'`;

    for (let i = 0; i < drops.length; i++) {
        const text = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        drops[i]++;
    }
}

setInterval(drawMatrix, 55);

window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
});

// Terminal Functionality
const terminal = document.getElementById('terminal');
const terminalContainer = document.querySelector('.terminal-container');
const output = document.getElementById('output');
const input = document.getElementById('terminal-input');

const commands = {
    help: () => {
        return `Available commands:\n  help     - Show this help message\n  clear    - Clear the terminal\n  matrix   - Display Matrix ASCII art\n  whoami   - Display user info\n  date     - Show current date/time\n  hack     - Initiate hacking sequence\n  neon     - Toggle glitch effect\n  hud      - Toggle HUD panels\n  logs     - Toggle log feed\n  scan     - Trigger a radar scan burst\n  session  - Show session stats`;
    },
    clear: () => {
        output.innerHTML = '';
        return '';
    },
    matrix: () => {
        return `<div class="ascii-art">
    ███╗   ███╗ █████╗ ████████╗██████╗ ██╗██╗  ██╗
    ████╗ ████║██╔══██╗╚══██╔══╝██╔══██╗██║╚██╗██╔╝
    ██╔████╔██║███████║   ██║   ██████╔╝██║ ╚███╔╝ 
    ██║╚██╔╝██║██╔══██║   ██║   ██╔══██╗██║ ██╔██╗ 
    ██║ ╚═╝ ██║██║  ██║   ██║   ██║  ██║██║██╔╝ ██╗
    ╚═╝     ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝╚═╝  ╚═╝
        </div>`;
    },
    whoami: () => {
        return 'root (Matrix Admin)';
    },
    date: () => {
        return new Date().toString();
    },
    hack: () => {
        return '<span class="green">Initiating hack sequence...</span>\n<span class="yellow">Bypassing firewall...</span>\n<span class="red">Access granted. Welcome, Neo.</span>';
    },
    neon: () => {
        terminal.classList.toggle('glitch');
        return terminal.classList.contains('glitch') ? 'Glitch mode enabled' : 'Glitch mode disabled';
    },
    redpill: () => {
        return '<span class="red">You chose the red pill.</span>\n<span class="green">Welcome to Wonderland, Neo.</span>\n<span class="yellow">Loading deep system access...</span>';
    },
    bluepill: () => {
        return '<span class="blue">You chose the blue pill.</span>\n<span class="cyan">Simulation restored. Sweet dreams.</span>';
    },
    hud: () => {
        const isHidden = hudLeft.classList.toggle('hud-hidden');
        hudRight.classList.toggle('hud-hidden');
        return isHidden ? 'HUD offline' : 'HUD online';
    },
    logs: () => {
        logsEnabled = !logsEnabled;
        logFeed.classList.toggle('hud-hidden', !logsEnabled);
        return logsEnabled ? 'Log feed streaming' : 'Log feed paused';
    },
    scan: () => {
        radar.classList.remove('scan-burst');
        void radar.offsetWidth;
        radar.classList.add('scan-burst');
        addLog('RADAR', 'Active sweep burst executed.', 'info');
        return 'Radar sweep intensified.';
    },
    session: () => {
        return `Session stats:\n  USER: ${sessionUser.textContent}\n  UPTIME: ${sessionUptime.textContent}\n  PACKETS: ${sessionPackets.textContent}\n  THREATS: ${sessionThreats.textContent}`;
    }
};

function appendOutput(command, result) {
    const commandLine = document.createElement('div');
    commandLine.className = 'command-line';
    commandLine.innerHTML = `<span class="prompt">root@matrix:~$</span> <span class="command">${command}</span>`;
    output.appendChild(commandLine);

    if (result) {
        const resultLine = document.createElement('div');
        resultLine.className = 'output-text';
        resultLine.innerHTML = result;
        output.appendChild(resultLine);
    }

    terminal.scrollTop = terminal.scrollHeight;
}

function handleCommand(cmd) {
    const command = cmd.trim().toLowerCase();

    if (command === '') return;

    if (commands[command]) {
        const result = commands[command]();
        if (command !== 'clear') {
            appendOutput(cmd, result);
        }
    } else {
        appendOutput(cmd, `<span class="error">Command not found: ${command}</span>`);
    }
}

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        handleCommand(input.value);
        input.value = '';
    }
});

// Focus input when clicking anywhere in terminal
terminal.addEventListener('click', () => {
    input.focus();
});

// Auto-focus on load
const pillOverlay = document.getElementById('pill-overlay');
const redPillButton = document.getElementById('red-pill');
const bluePillButton = document.getElementById('blue-pill');
const hudLeft = document.getElementById('hud-left');
const hudRight = document.getElementById('hud-right');
const radar = document.getElementById('radar');
const logFeed = document.getElementById('log-feed');
const newsFeed = document.getElementById('news-feed');
const radarDots = Array.from(document.querySelectorAll('.radar-dot'));
const signalStatus = document.getElementById('signal-status');
const sessionUser = document.getElementById('session-user');
const sessionUptime = document.getElementById('session-uptime');
const sessionPackets = document.getElementById('session-packets');
const sessionThreats = document.getElementById('session-threats');
const signalBars = Array.from(document.querySelectorAll('#signal-bars .bar'));
const statsSelect = document.getElementById('stats-select');
const statsLabel = document.getElementById('stats-label');
const statsValue = document.getElementById('stats-value');
const statsMeta = document.getElementById('stats-meta');
const gitCommits = document.getElementById('git-commits');
const gitAuthors = document.getElementById('git-authors');
const gitFiles = document.getElementById('git-files');

let logsEnabled = true;
let sessionStart = Date.now();
let packetsCount = 0;
let threatsCount = 0;
let statsFallbackInterval;
let gitStatsInterval;

const statsConfig = {
    population: {
        label: 'Global Population',
        indicator: 'SP.POP.TOTL',
        format: (value) => `${(value / 1e9).toFixed(2)} B`
    },
    co2: {
        label: 'CO2 Emissions',
        indicator: 'EN.ATM.CO2E.KT',
        format: (value) => `${(value / 1e6).toFixed(1)} M kt`
    },
    energy: {
        label: 'Energy Use',
        indicator: 'EG.USE.PCAP.KG.OE',
        format: (value) => `${value.toFixed(0)} kg oil eq.`
    },
    health: {
        label: 'Life Expectancy',
        indicator: 'SP.DYN.LE00.IN',
        format: (value) => `${value.toFixed(1)} years`
    }
};

const logTemplates = [
    { label: 'TRACE', message: 'Packet routed through proxy node.', type: 'info' },
    { label: 'WARN', message: 'Encrypted handshake latency detected.', type: 'warning' },
    { label: 'INFO', message: 'VPN tunnel integrity verified.', type: 'info' },
    { label: 'ALERT', message: 'Unauthorized ping blocked.', type: 'danger' },
    { label: 'NODE', message: 'Signal triangulation completed.', type: 'info' }
];

const attackNews = [
    { location: 'Tokyo', headline: 'Quantum botnet traced.', impact: 'Sev-2' },
    { location: 'Berlin', headline: 'Grid exploit contained.', impact: 'Sev-3' },
    { location: 'New York', headline: 'Zero-day breach detected.', impact: 'Sev-1' },
    { location: 'Dubai', headline: 'Satellite uplink hijack.', impact: 'Sev-2' },
    { location: 'Sydney', headline: 'AI firewall rerouted.', impact: 'Sev-4' }
];
let newsIndex = 0;
const gitFilePool = ['core/kernel.c', 'net/secure.go', 'ui/hud.js', 'ops/firewall.py', 'ai/agent.ts'];

function formatUptime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

function addLog(label, message, type = 'info') {
    if (!logsEnabled) return;
    const entry = document.createElement('div');
    entry.className = `log-entry ${type}`;
    const timestamp = new Date().toLocaleTimeString();
    entry.textContent = `[${timestamp}] ${label}: ${message}`;
    logFeed.prepend(entry);
    while (logFeed.children.length > 10) {
        logFeed.removeChild(logFeed.lastChild);
    }
}

function updateSession() {
    sessionUptime.textContent = formatUptime(Date.now() - sessionStart);
    sessionPackets.textContent = packetsCount.toString();
    sessionThreats.textContent = threatsCount.toString();
}

function simulateSignal() {
    const statuses = ['LINK: STABLE', 'LINK: OPTIMAL', 'LINK: ENCRYPTED', 'LINK: SECURE'];
    const strength = Math.floor(Math.random() * signalBars.length) + 1;
    signalBars.forEach((bar, index) => {
        bar.style.opacity = index < strength ? '1' : '0.2';
    });
    signalStatus.textContent = `${statuses[Math.floor(Math.random() * statuses.length)]} (${strength}/${signalBars.length})`;
}

function repositionRadarDots() {
    radarDots.forEach((dot) => {
        const x = Math.floor(Math.random() * 80) + 10;
        const y = Math.floor(Math.random() * 80) + 10;
        dot.style.setProperty('--x', `${x}%`);
        dot.style.setProperty('--y', `${y}%`);
        dot.classList.add('alert');
    });
    setTimeout(() => {
        radarDots.forEach((dot) => dot.classList.remove('alert'));
    }, 3000);
}

function rotateNews() {
    if (!newsFeed) return;
    const item = attackNews[newsIndex];
    const entry = document.createElement('div');
    entry.className = 'news-item';
    entry.innerHTML = `<span class="location">${item.location}</span> - ${item.headline} <span class="impact">${item.impact}</span>`;
    newsFeed.prepend(entry);
    while (newsFeed.children.length > 4) {
        newsFeed.removeChild(newsFeed.lastChild);
    }
    newsIndex = (newsIndex + 1) % attackNews.length;
}

function updateGitStats() {
    if (!gitCommits || !gitAuthors || !gitFiles) return;
    const commits = Math.floor(Math.random() * 1200) + 8000;
    const authors = Math.floor(Math.random() * 20) + 12;
    gitCommits.textContent = commits.toString();
    gitAuthors.textContent = authors.toString();

    gitFiles.innerHTML = '';
    const shuffled = gitFilePool.sort(() => 0.5 - Math.random());
    shuffled.slice(0, 3).forEach((file) => {
        const li = document.createElement('li');
        li.textContent = file;
        gitFiles.appendChild(li);
    });
}

async function fetchWorldBankStat(key) {
    const config = statsConfig[key];
    if (!config) return;
    statsLabel.textContent = config.label;
    statsValue.textContent = 'Loading...';
    statsMeta.textContent = 'Fetching latest data';
    if (statsFallbackInterval) {
        clearInterval(statsFallbackInterval);
    }

    try {
        const response = await fetch(`https://api.worldbank.org/v2/country/WLD/indicator/${config.indicator}?format=json`);
        const data = await response.json();
        const series = data[1] || [];
        const latest = series.find((entry) => entry.value !== null);
        if (!latest) {
            throw new Error('No data');
        }
        statsValue.textContent = config.format(latest.value);
        statsMeta.textContent = `Year: ${latest.date}`;
    } catch (error) {
        statsMeta.textContent = 'Live fetch failed, simulating updates';
        let simulatedValue = statsConfig[key].indicator === 'SP.DYN.LE00.IN'
            ? 70
            : statsConfig[key].indicator === 'EG.USE.PCAP.KG.OE'
                ? 1000
                : statsConfig[key].indicator === 'EN.ATM.CO2E.KT'
                    ? 35000000
                    : 8000000000;
        statsFallbackInterval = setInterval(() => {
            const delta = (Math.random() * 2 - 1) * (simulatedValue * 0.001);
            simulatedValue = Math.max(0, simulatedValue + delta);
            statsValue.textContent = config.format(simulatedValue);
            statsMeta.textContent = 'Simulated live feed';
        }, 2000);
    }
}

function handlePillChoice(choice) {
    if (pillOverlay) {
        pillOverlay.classList.add('hidden');
    }

    if (terminalContainer) {
        terminalContainer.classList.add('loaded');
    }

    if (hudLeft && hudRight) {
        hudLeft.classList.add('loaded');
        hudRight.classList.add('loaded');
    }

    if (choice === 'red') {
        appendOutput('redpill', commands.redpill());
    } else {
        appendOutput('bluepill', commands.bluepill());
    }
}

if (redPillButton && bluePillButton) {
    redPillButton.addEventListener('click', () => handlePillChoice('red'));
    bluePillButton.addEventListener('click', () => handlePillChoice('blue'));
}

if (statsSelect) {
    statsSelect.addEventListener('change', (event) => {
        fetchWorldBankStat(event.target.value);
    });
}

window.onload = () => {
    input.focus();
    sessionUser.textContent = 'root';
    addLog('BOOT', 'Matrix HUD online.', 'info');
    rotateNews();
    fetchWorldBankStat(statsSelect?.value || 'population');
    setInterval(() => {
        packetsCount += Math.floor(Math.random() * 12);
        if (Math.random() > 0.85) {
            threatsCount += 1;
            addLog('ALERT', 'Intrusion attempt detected.', 'danger');
        } else {
            const template = logTemplates[Math.floor(Math.random() * logTemplates.length)];
            addLog(template.label, template.message, template.type);
        }
        updateSession();
    }, 2200);

    setInterval(() => {
        simulateSignal();
    }, 3500);

    repositionRadarDots();
    setInterval(() => {
        repositionRadarDots();
    }, 10000);

    setInterval(() => {
        rotateNews();
    }, 8000);

    updateGitStats();
    if (gitStatsInterval) {
        clearInterval(gitStatsInterval);
    }
    gitStatsInterval = setInterval(() => {
        updateGitStats();
    }, 12000);
};