import os
from app import app
from controllers import events, auth, users

# -------------- blueprints -----------------------
app.register_blueprint(events.api, url_prefix='/api')
app.register_blueprint(auth.api, url_prefix='/api')
app.register_blueprint(users.api, url_prefix='/api')


# if doesn't find the blueprint, use these default routes
@app.route('/', defaults={'path': ''})  # homepage
@app.route('/<path:path>')          # anything else eg: /app.js /css/style.css
def catch_all(path):
    if os.path.isfile('public/' + path):  # if path is a file
        return app.send_static_file(path)  # send back the file

    return app.send_static_file('index.html')
    # otherwise send back index.html
