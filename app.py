from flask import (
    Flask, render_template
)

import json, toml

WIDGETS = toml.load("data/widgets.toml")

app = Flask(__name__)

@app.route("/")
def hello():
    return render_template("status_line.html")

@app.route("/widgets/<widget_uuid>")
def widget(widget_uuid):
    return json.dumps(
        {
            "left": {
                "type": "timer",
                "hours": 0,
                "mins": 25,
                "secs": 0
            },
            "center": {
                "type": "text",
                "value": "!project",
            },
            "right": {
                "type": "text",
                "value": "!focus mode"
            }
         }
    )
