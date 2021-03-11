from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Business, Menu, Template, Meal, Meal_Info, Menu_Type, Section
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
    
    if business_profile.get_is_active():
        business_info = {**business_profile.to_dict(), "menus": business_menus}
        return jsonify(business_info)
    else:
        return 'User does not exist', 400
        
@jwt_required
@api.route('/place/<place_id>', methods=['PATCH'])
def edit_profile(place_id):
    data = request.get_json()
    business = Business.get_by_id(place_id)
    business.edit_profile(data)
    return business.to_dict(), 200

@jwt_required
@api.route('/place/<place_id>', methods=['DELETE'])
def delete_profile(place_id):
    business = Business.get_by_id(place_id)
    business.delete_profile()
    return jsonify(business), 202

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
   
    access_token = create_access_token(
        identity=user.to_dict(), 
        expires_delta=timedelta(minutes=90)
    )
    return jsonify({'access_token': access_token}), 201

@api.route('/user/<user_email>', methods=['GET'])
def get_by_email(user_email):
    profile = Business.get_by_email(user_email)
    if profile is not None and profile.get_is_active() is True :
        return jsonify('Invalid email'), 409
    else:
        Business.active_profile(profile.to_dict().get('id'))
    return jsonify('User created successfully'), 201
    #oscar lo necesita

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
    if user.get_is_active() is False:
        return jsonify('User does not exist'), 404
    if check_password_hash(user.get_password(), password):
        access_token = create_access_token(
            identity=user.to_dict(), 
            expires_delta=timedelta(minutes=90)
        )
        return jsonify({'access_token': access_token}), 200
    return jsonify('Invalid info'), 409

# @api.route('/section', methods=['POST'])
# def new_section():
#     name, meal_id, template_id = request.json.get(
#         "name", None
#     ), request.json.get(
#         "meal_id", None
#     ), request.json.get(
#         "template_id", None
#     )
#     section = Section(name, meal_id, template_id )
#     section.add()
#     return {}, 201

@api.route('/place/<int:place_id>/template/<int:template_id>', methods=['POST'])
def new_meals_in_template(place_id, template_id):
    body = request.get_json()
    for section, meals in body.items():
        for meal in meals:
            new_meal= Meal(
                name = meal.get("name"), 
                description = meal.get("description"),
                price = meal.get("price"),
                business_id = place_id,
            )
            
            new_meal.add(meal.get("meal_info"))
            
            section = Section(
                name = section, 
                meal_id = new_meal.id,
                template_id = template_id
            )
            new_section.add()
    return jsonify('Menu created successfully'), 201