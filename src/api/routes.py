from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Business, Menu, Template, Meal, Meal_Info, Menu_Type
from api.utils import generate_sitemap, APIException


api = Blueprint('api', __name__)

@api.route('/place/<place_name>', methods=['GET'])
def profile_id(place_name):
    #Business.add()
    business_profile = Business.get_by_name(place_name)
    return jsonify(business_profile), 200

