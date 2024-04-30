from flask import Flask, render_template, request, redirect, url_for, jsonify, session
from flask_pymongo import PyMongo
import bcrypt
import base64
from flask_mail import Mail, Message
import random
import subprocess
from functools import wraps
from datetime import datetime, timedelta

app = Flask(__name__, static_url_path='/static')
app.config["MONGO_URI"] = "mongodb+srv://omkarr:Omkar786@tbs.inphtk9.mongodb.net/TBS"
app.config['SECRET_KEY'] = b'idkwhatitis'

app.config['MAIL_SERVER'] = 'smtp.elasticemail.com'
app.config['MAIL_PORT'] = 2525
app.config['MAIL_USERNAME'] = 'turftribe0781@gmail.com'
app.config['MAIL_PASSWORD'] = 'F2560104AC310A61E0ECE9183FD3BAF8009A'
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False

mongo = PyMongo(app)
mail = Mail(app)
bookings = mongo.db.bookings

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user_name' not in session:
            return redirect(url_for('/signinreg'))
        return f(*args, **kwargs)
    return decorated_function



@app.route('/')
def index():
    user_name = session.get('user_name')
    success_message = request.args.get('success')  
    error_message = request.args.get('error') 
    return render_template('index.html', user_name=user_name, success_message=success_message, error_message=error_message)

@app.route('/logout')
def logout():
    session.pop('user_name', None)
    return redirect('/')

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

@app.route('/signin', methods=['POST'])
def signin():
    email = request.form.get('email')
    password = request.form.get('user_password')

    if not email or not password:
        return redirect(url_for('index', error='Please enter email and password'))

    # Retrieve user from MongoDB
    users = mongo.db.users
    user = users.find_one({'email': email})

    if user and bcrypt.checkpw(password.encode('utf-8'), base64.b64decode(user['password'])):
        # Set user's name in session
        session['user_name'] = user['name']
        
        # Redirect based on user's email
        if email == "admin@gmail.com":
            return redirect(url_for('adminpage', success='Admin logged in successfully!'))
        else:
            # Only pass success message if user logs in successfully
            return redirect(url_for('index', success='Logged in Successfully!!'))
    else:
        return redirect(url_for('index', error='Invalid Credentials!!'))

    

@app.route('/adminpage')
def adminpage():
    success_message = request.args.get('success')  
    error_message = request.args.get('error') 
    return render_template('adminpage.html', success_message=success_message, error_message=error_message)


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

            return redirect(url_for('register'))  # Redirect to login page after resetting password

        else:
            error_message = "Invalid OTP"
            return render_template('reset_password.html', error_message=error_message)
    
    return render_template('reset_password.html')

@app.route('/submit_booking', methods=['POST'])
def submit_booking():
    if request.method == 'POST':
        # Parse JSON data sent from frontend
        data = request.json
        turf_name = data.get('turfName')
        date = data.get('date')
        name = data.get('name')
        mobile = data.get('mobile')
        selected_slots = data.get('selectedSlots')  # Get the selected slots

        print("Received data:", turf_name, date, name, mobile, selected_slots)

        # Check if the time slot is already booked
        existing_booking = bookings.find_one({
            'turf_name': turf_name,
            'date': date,
            'selected_slots': selected_slots
        })
        if existing_booking:
            return jsonify({'message': 'This time slot is already booked by another user'}), 400
        
        # Save booking information into MongoDB
        bookings.insert_one({
            'turf_name': turf_name,
            'date': date,
            'name': name,
            'mobile': mobile,
            'selected_slots': selected_slots,  # Inserting selected slots into the booking data
            'timestamp': datetime.now()  # Adding current timestamp to the booking data
        })

        return jsonify({'message': 'Booking submitted successfully'})

# To delete booking data from MongoDB after one day, we are using MongoDB's TTL (Time-To-Live) indexes
mongo.db.bookings.create_index("timestamp", expireAfterSeconds=86400)

    
@app.route('/api/booking')
def get_booking_data():
    # Fetch booking data from MongoDB
    booking_data = list(bookings.find({}, {'_id': 0}))  # Exclude _id field from the result

    # Mark time slots as unavailable if they were booked within the past 24 hours
    for booking in booking_data:
        if 'timestamp' in booking:
            booking_time = booking['timestamp']
            if datetime.now() - booking_time < timedelta(days=1):
                booking['status'] = 'Booked'
            else:
                booking['status'] = 'Available'
        else:
            booking['status'] = 'Available'

    return jsonify(booking_data)



@app.route('/cricket')
@login_required
def cricket():
    subprocess.run(['python', 'location_turf.py'])  # Run location_turf.py
    return render_template('cricket.html')

@app.route('/tennis')  
@login_required
def tennis():
    subprocess.run(['python', 'location_tennis.py'])  # Run location_turf.py
    return render_template('tennis.html')

@app.route('/football')
@login_required
def football():
    subprocess.run(['python', 'location_football.py'])  # Run location_turf.py
    return render_template('football.html')

@app.route('/yoga')
@login_required
def yoga():
    subprocess.run(['python', 'location_yoga.py'])  # Run location_turf.py
    return render_template('yoga.html')

@app.route('/dashboard')
@login_required
def dashboard():
    return render_template('dashboard.html')

@app.route('/location')
@login_required
def location():
    subprocess.run(['python', 'location.py'])
    return render_template('location.html')

@app.route('/aboutus')
@login_required
def about_us():
    return render_template('aboutus.html')

@app.route('/history')
@login_required
def history():
    return render_template('history.html')

@app.route('/slotbooking')
def render_slotbooking():
    return render_template('slotbooking.html')

if __name__ == '__main__':
    app.run(debug=True)
