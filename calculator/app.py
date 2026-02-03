"""
Flask Backend API for Calculator
Exposes calculator methods as REST API endpoints
"""

from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from calculator import calc_instance

app = Flask(__name__, static_folder='../calculator-web')
CORS(app)

@app.route('/')
def index():
    """Serve the main calculator webpage"""
    return send_from_directory(app.static_folder, 'calculator.html')

@app.route('/api/add', methods=['POST'])
def add():
    """API endpoint for addition"""
    try:
        data = request.get_json()
        a = float(data['a'])
        b = float(data['b'])
        result = calc_instance.add(a, b)
        return jsonify({'success': True, 'result': result})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 400

@app.route('/api/subtract', methods=['POST'])
def subtract():
    """API endpoint for subtraction"""
    try:
        data = request.get_json()
        a = float(data['a'])
        b = float(data['b'])
        result = calc_instance.subtract(a, b)
        return jsonify({'success': True, 'result': result})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 400

@app.route('/api/multiply', methods=['POST'])
def multiply():
    """API endpoint for multiplication"""
    try:
        data = request.get_json()
        a = float(data['a'])
        b = float(data['b'])
        result = calc_instance.multiply(a, b)
        return jsonify({'success': True, 'result': result})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 400

@app.route('/api/divide', methods=['POST'])
def divide():
    """API endpoint for division"""
    try:
        data = request.get_json()
        a = float(data['a'])
        b = float(data['b'])
        result = calc_instance.divide(a, b)
        return jsonify({'success': True, 'result': result})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 400

@app.route('/api/power', methods=['POST'])
def power():
    """API endpoint for power/exponentiation"""
    try:
        data = request.get_json()
        base = float(data['base'])
        exponent = float(data['exponent'])
        result = calc_instance.power(base, exponent)
        return jsonify({'success': True, 'result': result})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 400

@app.route('/api/modulo', methods=['POST'])
def modulo():
    """API endpoint for modulo operation"""
    try:
        data = request.get_json()
        a = float(data['a'])
        b = float(data['b'])
        result = calc_instance.modulo(a, b)
        return jsonify({'success': True, 'result': result})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 400

@app.route('/api/sqrt', methods=['POST'])
def square_root():
    """API endpoint for square root"""
    try:
        data = request.get_json()
        a = float(data['a'])
        result = calc_instance.square_root(a)
        return jsonify({'success': True, 'result': result})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 400

@app.route('/api/percentage', methods=['POST'])
def percentage():
    """API endpoint for percentage calculation"""
    try:
        data = request.get_json()
        value = float(data['value'])
        percent = float(data['percent'])
        result = calc_instance.percentage(value, percent)
        return jsonify({'success': True, 'result': result})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 400

@app.route('/api/history', methods=['GET'])
def get_history():
    """API endpoint to get calculation history"""
    try:
        history = calc_instance.get_history()
        return jsonify({'success': True, 'history': history})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 400

@app.route('/api/history/clear', methods=['POST'])
def clear_history():
    """API endpoint to clear calculation history"""
    try:
        calc_instance.clear_history()
        return jsonify({'success': True, 'message': 'History cleared'})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 400

# Serve static files (CSS, JS)
@app.route('/<path:filename>')
def serve_static(filename):
    return send_from_directory(app.static_folder, filename)

if __name__ == '__main__':
    print("Starting Calculator API Server...")
    print("Access the calculator at: http://localhost:5000")
    app.run(debug=True, port=5000)
