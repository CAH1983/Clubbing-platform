import os
from app import app

# register your blueprints here ..

@app.route('/', defaults={'path': ''}) #homepage
@app.route('/<path:path>') #anything else eg: /app.js /css/style.css
def catch_all(path):
    if os.path.isfile('public/' + path):  #if path is a file
        return app.send_static_file(path) # send back the file

    return app.send_static_file('index.html') #otherwise send back index.html
