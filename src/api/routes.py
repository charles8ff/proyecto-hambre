from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Business, Menu, Template, Meal, Meal_Info, Menu_Type
from api.utils import generate_sitemap, APIException


api = Blueprint('api', __name__)

@api.route('/place/<place_id>', methods=['GET'])
def profile_id(place_id):
    #Business.add()
    business_profile = Business.get_by_id(place_id)
    if business_profile['is_active']:
        return jsonify(business_profile)
    else:
        return 'User does not exsist', 400

@api.route('/place/<place_id>', methods=['DELETE'])
def delete_profile(place_id):
    #print('funciona chucha')
    delete_profile = Business.delete_profile(place_id)
    return 'The user has been successfully deleted', 200
