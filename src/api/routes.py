"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Business, Menu, Template, Meal, Meal_Info, Category
from api.utils import generate_sitemap, APIException


api = Blueprint('api', __name__)

@api.route('/profile/<profile_id>', methods=['GET'])
def profile_id(profile_id):
    #Business.add()
    business_profile = Business.get_by_id(profile_id)
    return jsonify(business_profile), 200