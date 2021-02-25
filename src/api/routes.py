from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Business, Menu, Template, Meal, Meal_Info, Menu_Type
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
import datetime
from datetime import timedelta
from werkzeug.security import generate_password_hash
from werkzeug.security import check_password_hash
from werkzeug import security

api = Blueprint('api', __name__)

@api.route('/place/<place_id>', methods=['GET'])
def profile_id(place_id):
    business_profile = Business.get_by_id(place_id)
    business_menus = Menu.get_by_business_id(place_id)
    if business_profile['is_active']:
        business_info = {**business_profile, "menus": business_menus}
        return jsonify(business_info)
    else:
        return 'User does not exist', 400

@api.route('/place/<place_id>', methods=['DELETE'])
def delete_profile(place_id):
    delete_profile = Business.delete_profile(place_id)
    return jsonify(delete_profile), 202

@api.route('/user', methods=['POST'])
def handle_new_user():
    email, password, place_name, address, description, phone_number, open_hour, close_hour = request.json.get(
        "email", None
    ), request.json.get(
        "password", None
    ), request.json.get(
        "place_name", None
    ), request.json.get(
        "address", None
    ), request.json.get(
        "description", None
    ), request.json.get(
        "phone_number", None
    ), request.json.get(
        "open_hour", None
    ), request.json.get(
        "close_hour", None
    )
    if not email or not password:
        return "Missing info", 400
    password_hash = generate_password_hash(password, method='pbkdf2:sha256')
    user = Business.add(email, password_hash, place_name, address, description, phone_number, open_hour, close_hour)
    user = Business.get_by_email(email)
    if check_password_hash(password_hash, password):
        access_token = create_access_token(
            identity=user.to_dict(), 
            expires_delta=timedelta(minutes=90)
        )
        return jsonify({'access_token': access_token}), 201
    return jsonify('Invalid info'), 400

@api.route('/user/<user_email>', methods=['GET'])
def get_by_email(user_email):
    profile = Business.get_by_email(user_email)
    if profile is not None:
        if profile.get_is_active() is True:
            return jsonify('Invalid email'), 409
        else:
            Business.active_profile(profile.to_dict().get('id'))
    return jsonify('User created successfully'), 201

@api.route('/login', methods=['GET', 'POST'])
def login():
    email, password = request.json.get(
        "email", None
    ), request.json.get(
        "password", None
    )
    if not email or not password:
        return jsonify("Missing info"), 400
    user = Business.get_by_email(email)
    if check_password_hash(user.get_password(), password):
        access_token = create_access_token(
            identity=user.to_dict(), 
            expires_delta=timedelta(minutes=90)
        )
        return jsonify({'access_token': access_token}), 200
    return jsonify('Invalid info'), 409