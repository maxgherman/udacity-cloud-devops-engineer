from flask import Flask, request, jsonify
from flask.logging import create_logger
from functools import wraps
import logging
import os

import pandas as pd
from sklearn.externals import joblib
from sklearn.preprocessing import StandardScaler

app = Flask(__name__)
LOG = create_logger(app)
LOG.setLevel(logging.INFO)

API_KEY = os.environ.get("PREDICT_API_KEY")

def require_api_key(view_func):
    """Requires a valid X-API-Key header to access the decorated view"""
    @wraps(view_func)
    def wrapped(*args, **kwargs):
        if not API_KEY or request.headers.get("X-API-Key") != API_KEY:
            return jsonify({"error": "Unauthorized"}), 401
        return view_func(*args, **kwargs)
    return wrapped

def scale(payload):
    """Scales Payload"""
    
    LOG.info("Scaling Payload: %s\n", payload)
    scaler = StandardScaler().fit(payload.astype(float))
    scaled_adhoc_predict = scaler.transform(payload.astype(float))
    return scaled_adhoc_predict

@app.route("/")
def home():
    html = f"<h3>Sklearn Prediction Home</h3>"
    return html.format(format)

@app.route("/predict", methods=['POST'])
@require_api_key
def predict():
    """Performs an sklearn prediction
        
        input looks like:
        {
        "CHAS":{
        "0":0
        },
        "RM":{
        "0":6.575
        },
        "TAX":{
        "0":296.0
        },
        "PTRATIO":{
        "0":15.3
        },
        "B":{
        "0":396.9
        },
        "LSTAT":{
        "0":4.98
        }
        
        result looks like:
        { "prediction": [ <val> ] }
        
        """
    
    # Logging the input payload
    json_payload = request.json
    LOG.info("JSON payload: %s", json_payload)
    inference_payload = pd.DataFrame(json_payload)
    LOG.info("Inference payload DataFrame: %s", inference_payload)
    # scale the input
    scaled_payload = scale(inference_payload)
    # get an output prediction from the pretrained model, clf
    prediction = list(clf.predict(scaled_payload))
    # TO DO:  Log the output prediction value
    LOG.info("Prediction value: %s", prediction)
    return jsonify({'prediction': prediction})

if __name__ == "__main__":
    # load pretrained model as clf
    clf = joblib.load("./model_data/boston_housing_prediction.joblib")
    app.run(host=os.environ.get("APP_HOST", "127.0.0.1"), port=80, debug=False) # specify port=80
