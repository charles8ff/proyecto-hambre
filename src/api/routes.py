from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Business, Menu, Template, Meal, Meal_Info, Menu_Type
from api.utils import generate_sitemap, APIException


api = Blueprint('api', __name__)

@api.route('/place/<place_id>', methods=['GET'])
def profile_id(place_id):
    # Business.add()
    # Template.add()
    # Menu.add()
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

# @api.route('/place/<place_id>', methods=['PUT'])
# def edit_profile(place_id):
    # body=request.get_json()
    # business_profile = Business.get_by_id(place_id)
    # bussines_profile
    # business_menus = Menu.get_by_business_id(place_id)
