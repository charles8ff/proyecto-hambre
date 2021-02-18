"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Business, Menu, Template, Meal, Meal_Info, Category
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


# @api.route('/business', methods=['POST'])
# def create_business():
#     body = request.get_json()
#     if body.get('email', None) and body.get('password', None):
#         business = Bussiness(email=email, _password=password, place_name=place_name, address=address, )
#         business.add()
#         return "Created user", 201
#     return 'Fallaste', 400

@api.route('/profile/<profile_id>', methods=['GET'])
def profile_id(profile_id):
   # Business.add()
    business_profile = Business.get_by_id(profile_id)
    ##print
    return jsonify(business_profile), 200