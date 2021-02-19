import enum
from flask_sqlalchemy import SQLAlchemy
import json  
from dataclasses import asdict, dataclass

db = SQLAlchemy()

class Business(db.Model):
    __tablename__ = 'business'
    id = db.Column(db.Integer, primary_key=True)
    is_active = db.Column(db.Boolean, nullable=False, default=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    _password = db.Column(db.String, nullable=False)
    place_name = db.Column(db.String, nullable=False)
    address = db.Column(db.String(250), nullable=False)
    description = db.Column(db.Text, nullable=False)
    phone_number = db.Column(db.String(15), nullable=False)
    open_hour = db.Column(db.Time, nullable=False)
    close_hour = db.Column(db.Time, nullable=False) 
    menu = db.relationship('Menu', backref='business',lazy=True)

    def __repr__(self):
        return f'business: {self.place_name}'

    def to_dict(self):
        return {
            "id": self.id,
            "email": self.email,
            "place_name": self.place_name,
            "address": self.address,
            "phone_number": self.phone_number,
            "open_hour": self.open_hour.isoformat(),
            "close_hour": self.close_hour.isoformat(),
            "description": self.description,
        }

    @classmethod
    def get_by_id(cls, profile_id):
        profile = cls.query.filter_by(id = profile_id).first()
        return profile.to_dict()
        
    def add():
        business = Business(
            email="chispis@gmail.com", 
            _password="123456789", 
            place_name="Bar Manolo", 
            address="Calle sevilla", 
            description="Este es mi restaurante chulo",
            phone_number="68792348",
            open_hour="10:00",
            close_hour="21:00"
            )
        db.session.add(business)
        db.session.commit()

class Menu(db.Model):
    __tablename__ = 'menu'
    id = db.Column(db.Integer, primary_key=True)
    business_id = db.Column(db.Integer, db.ForeignKey("business.id"), nullable=False)
    template_id = db.Column(db.Integer, db.ForeignKey("template.id"), nullable=False)
    meal = db.relationship('Meal', backref='menu',lazy=True)

    def __repr__(self):
        return f'The menu of business: {self.business_id}'

    def to_dict(self):
        return {
            "id": self.id,
        }

class Template(db.Model):
    __tablename__ = 'template'
    id = db.Column(db.Integer, primary_key=True) 
    title = db.Column(db.String(80), nullable=False)
    description = db.Column(db.Text, nullable=False)
    price = db.Column(db.Float, nullable=False)
    menu = db.relationship('Menu', backref='template',lazy=True)


    def __repr__(self):
        return f'The template is: {self.title}'

    def to_dict(self):
        return {
            "id": self.id,
            # do not to_dict the password, its a security breach
        }

association_table = db.Table('meal_contains_meal_info', db.Model.metadata,
    db.Column('meal', db.Integer, db.ForeignKey('meal.id')),
    db.Column('meal_info', db.Integer, db.ForeignKey('meal_info.id'))
)
class Meal(db.Model):
    __tablename__ = 'meal'
    id = db.Column(db.Integer, primary_key=True) 
    meal_name = db.Column(db.String(250), nullable=False)
    price = db.Column(db.Float, nullable=False)
    menu_id = db.Column(db.Integer, db.ForeignKey("menu.id"), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey("category.id"), nullable=False)
    meal_info = db.relationship(
        "Meal_Info",
        secondary=association_table,
        back_populates="meal")

    def __repr__(self):
        return f'The meal is: {self.meal_name}'

    def to_dict(self):
        return {
            "id": self.id,
            # do not to_dict the password, its a security breach
        }

class Enum_Info(enum.Enum):
    gluten = "gluten"
    peanuts = "peanuts"
    tree_nuts = "tree_nuts"
    celery = "celery"
    mustard = "mustard"
    eggs = "eggs"
    milk = "milk"
    sesame = "sesame"
    fish = "fish"
    custaceans = "custaceans"
    molluscs = "molluscs"
    soya = "soya"
    sulphites = "sulphites"
    lupin  = "lupin"
    vegetarian_friendly = "vegetarian_friendly"
    vegan_friendly = "vegan_friendly"

class Meal_Info(db.Model):
    __tablename__ = 'meal_info'
    id = db.Column(db.Integer, primary_key=True) 
    info = db.Column(db.Enum(Enum_Info), nullable=False)
    meal = db.relationship(
        "Meal",
        secondary=association_table,
        back_populates="meal_info")

    def __repr__(self):
        return f'The meal info: {self.info}'

    def to_dict(self):
        return {
            "id": self.id,
            # do not to_dict the password, its a security breach
        }


class Enum_Category(enum.Enum):
    daily_menu = "daily_menu"
    cart_menu = "cart_menu"
    drinks_menu = "drinks_menu"
    dessert_menu = "dessert_menu"
    cocktail_menu = "cocktail_menu"

class Category(db.Model):
    __tablename__ = 'category'
    id = db.Column(db.Integer, primary_key=True) 
    category = db.Column(db.String, nullable=False)
    meal = db.relationship('Meal', backref='category',lazy=True)

    def __repr__(self):
        return f'The meal is: {self.meal_name}'

    def to_dict(self):
        return {
            "id": self.id,
            # do not to_dict the password, its a security breach
        }