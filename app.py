from flask import Flask, render_template, request, redirect, url_for
from flask_pymongo import PyMongo
from flask import jsonify

app = Flask(__name__, static_url_path='/static')

# Configure MongoDB connection
app.config["MONGO_URI"] = "mongodb+srv://omkarr:Omkar786@tbs.inphtk9.mongodb.net/TBS"
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
        
        # Insert data into MongoDB
        users = mongo.db.users
        users.insert_one({'name': name, 'email': email, 'password': password})
        
        return render_template('signinreg.html')
    else:
        return render_template('signinreg.html')


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
