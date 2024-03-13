from flask import Flask, render_template, request, redirect, url_for, jsonify, session
from flask_pymongo import PyMongo
import bcrypt
import base64
from flask_session import Session
from flask_mail import Mail, Message
import random

app = Flask(__name__, static_url_path='/static')
app.config["MONGO_URI"] = "mongodb+srv://omkarr:Omkar786@tbs.inphtk9.mongodb.net/TBS"

app.config['SECRET_KEY'] = b'idkwhatitis'
app.config['SESSION_TYPE'] = 'filesystem'

app.config['MAIL_SERVER'] = 'smtp.elasticemail.com'
app.config['MAIL_PORT'] = 2525
app.config['MAIL_USERNAME'] = 'turftribe0781@gmail.com'
app.config['MAIL_PASSWORD'] = 'F2560104AC310A61E0ECE9183FD3BAF8009A'
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False

Session(app)

mail = Mail(app)
mongo = PyMongo(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        password = request.form['user_password']
        
        # Hashing the password with a new salt before storing in the database
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

        # Converting the hashed password to base64 encoding before storing in the database
        encoded_password = base64.b64encode(hashed_password).decode('utf-8')

        users = mongo.db.users
        users.insert_one({'name': name, 'email': email, 'password': encoded_password})
        
        return render_template('signinreg.html')
    else:
        return render_template('signinreg.html')

@app.route('/signinreg')
def signinreg():
    return render_template('signinreg.html')

@app.route('/signin', methods=['POST'])
def signin():
    email = request.form.get('email')
    password = request.form.get('user_password')

    if not email or not password:
        return jsonify({'error': 'Please enter email and password'}), 400

    # Retrieve user from MongoDB
    users = mongo.db.users
    user = users.find_one({'email': email})

    if user and bcrypt.checkpw(password.encode('utf-8'), base64.b64decode(user['password'])):
        # Set user's name in session
        session['user_name'] = user['name']
        return jsonify({'message': 'Login Success'}), 200
    else:
        return jsonify({'error': 'Login Failed'}), 401

@app.route('/forgot_password', methods=['GET', 'POST'])
def forgot_password():
    if request.method == 'POST':
        email = request.form['email']
        otp = str(random.randint(100000, 999999))

        session['otp'] = otp
        session['email'] = email

        msg = Message('Forgot Password OTP', sender='turftribe0781@gmail.com', recipients=[email])
        msg.body = f'Your OTP for password reset is: {otp}'
        mail.send(msg)

        return redirect(url_for('reset_password'))
    return render_template('forgot_password.html')

@app.route('/reset_password', methods=['GET', 'POST'])
def reset_password():
    if request.method == 'POST':
        user_otp = request.form['otp']
        new_password = request.form['new_password']
        email = session.get('email')

        if 'otp' in session and session['otp'] == user_otp:
            users = mongo.db.users
            hashed_password = bcrypt.hashpw(new_password.encode('utf-8'), bcrypt.gensalt())
            encoded_password = base64.b64encode(hashed_password).decode('utf-8')
            users.update_one({'email': email}, {'$set': {'password': encoded_password}})

            session.pop('otp', None)
            session.pop('email', None)

            return jsonify({'success': True, 'message': 'Password updated successfully'})
        else:
            return jsonify({'success': False, 'error': 'Invalid OTP'})
    return render_template('reset_password.html')

@app.route('/cricket')  
def cricket():
    return render_template('cricket.html')

@app.route('/tennis')  
def tennis():
    return render_template('tennis.html')

@app.route('/football')
def football():
    return render_template('football.html')

@app.route('/yoga')
def yoga():
    return render_template('yoga.html')

@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

@app.route('/location')
def location():
    return render_template('location.html')

@app.route('/aboutus')
def about_us():
    return render_template('aboutus.html')

@app.route('/history')
def history():
    return render_template('history.html')



if __name__ == '__main__':
    app.run(debug=True)
