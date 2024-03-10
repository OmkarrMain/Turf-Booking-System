from flask import Flask, render_template

app = Flask(__name__, static_url_path='/static')


@app.route('/')
def index():
    return render_template('index.html')

# route for registration
@app.route('/register')  
def register():
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
