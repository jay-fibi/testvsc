/**
 * Button Component
 * A reusable button component for the UI
 * Located in nested directory: components/ui/buttons/
 */

class Button {
    constructor(options = {}) {
        this.text = options.text || 'Click Me';
        this.type = options.type || 'primary';
        this.size = options.size || 'medium';
        this.disabled = options.disabled || false;
        this.onClick = options.onClick || (() => {});
    }

    render() {
        const button = document.createElement('button');
        button.textContent = this.text;
        button.className = `btn btn-${this.type} btn-${this.size}`;
        button.disabled = this.disabled;
        
        button.addEventListener('click', (e) => {
            if (!this.disabled) {
                this.onClick(e);
            }
        });

        return button;
    }

    enable() {
        this.disabled = false;
    }

    disable() {
        this.disabled = true;
    }

    setText(text) {
        this.text = text;
    }
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Button;
}
