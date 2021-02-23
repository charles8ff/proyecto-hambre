from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Business, Menu, Template, Meal, Meal_Info, Menu_Type
from api.utils import generate_sitemap, APIException


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
def create_user():
    user_profile = request.json
    new_user = Business(
        email=user_profile['email'], 
        _password=user_profile['password'],
        place_name=user_profile['place_name'], 
        address=user_profile['address'],
        description=user_profile['description'], 
        phone_number=user_profile['phone_number'],
        close_hour=user_profile['close_hour'],
        open_hour=user_profile['open_hour'],
    )
    new_user.add()
    return "Missing new user name", 200