from flask import Flask, render_template, request, jsonify
import random

app = Flask(__name__)

DB = {
    "admin@gmail.com": 12,
    "root": 15,
    "test@yahoo.com": 6,
    "user123": 3,
    "demo@site.com": 2,
    "john@company.com": 9,
    "mike@mail.com": 4,
    "alice@site.com": 7
}

def analyze(target):
    target = target.lower().strip()

    breaches = DB.get(target, random.randint(0, 5))
    risk = min(100, breaches * 10 + random.randint(5, 15))

    status = "HIGH" if risk >= 70 else "MEDIUM" if risk >= 30 else "LOW"

    return {
        "target": target,
        "breaches": breaches,
        "risk": risk,
        "status": status
    }

@app.route("/")
def home():
    return render_template("dashboard.html")

@app.route("/scan", methods=["POST"])
def scan():
    data = request.json
    return jsonify(analyze(data["target"]))

if __name__ == "__main__":
    app.run(debug=True)