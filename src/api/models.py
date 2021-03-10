import enum 
from flask_sqlalchemy import SQLAlchemy
import json  
from dataclasses import asdict, dataclass
from sqlalchemy.ext.hybrid import hybrid_property, hybrid_method 
from sqlalchemy import UniqueConstraint 

db = SQLAlchemy()

class Business(db.Model):
    __tablename__ = 'business'
    id = db.Column(db.Integer, primary_key=True)
    is_active = db.Column(db.Boolean, nullable=False, default=True)
    email = db.Column(db.VARCHAR, unique=True, nullable=False)
    _password = db.Column("password", db.VARCHAR, nullable=False)
    place_name = db.Column(db.String, nullable=False)
    address = db.Column(db.VARCHAR, nullable=False)
    description = db.Column(db.Text, nullable=False)
    phone_number = db.Column(db.String(15), nullable=False)
    open_hour = db.Column(db.Time, nullable=False)
    close_hour = db.Column(db.Time, nullable=False) 
    menu = db.relationship('Menu', backref='business',lazy=True)
    meal = db.relationship('Meal', backref='business',lazy=True)

    def __repr__(self):
        return f'business: {self.place_name}'

    def password(self):
        return self._password
    
    def to_dict(self):
        return {
            "id": self.id,
            "email": self.email,
            "place_name": self.place_name,
            "address": self.address,
            "description": self.description,
            "phone_number": self.phone_number,
            "open_hour": self.open_hour.isoformat(),
            "close_hour": self.close_hour.isoformat(),
            "description": self.description,
        }

    @classmethod
    def get_by_id(cls, place_id):
        profile = cls.query.filter_by(id = place_id).first_or_404(description=None)
        return profile

    @classmethod
    def get_all_profile(cls):
        return cls.query.all()

    @classmethod
    def delete_profile(cls, place_id):
        profile = cls.query.filter_by(id = place_id).first()
        profile.is_active = False
        db.session.commit()

    @classmethod
    def active_profile(cls, place_id):
        profile = cls.query.filter_by(id = place_id).first()
        profile.is_active = True
        db.session.commit()

    @classmethod  
    def get_by_email(cls, email):
        user = cls.query.filter_by(email = email).first_or_404(description=None)
        return user

    @classmethod
    def add(cls, email, password, place_name, address, description, phone_number, open_hour, close_hour):
        user = cls(
            email=email,
            _password=password,
            place_name=place_name,
            address=address,
            description=description,
            phone_number=phone_number,
            open_hour=open_hour,
            close_hour=close_hour
            )
        db.session.add(user)
        db.session.commit()
        return user

    def get_password(self):
        return self._password
    
    def get_is_active(self):
        return self.is_active
    
class Menu(db.Model):
    __tablename__ = 'menu'
    id = db.Column(db.Integer, primary_key=True)
    business_id = db.Column(db.Integer, db.ForeignKey("business.id"), nullable=False)
    template_id = db.Column(db.Integer, db.ForeignKey("template.id"), nullable=False)

    def __repr__(self):
        return f'The menu of business: {self.business_id}'

    def to_dict(self):
        return {
            "id": self.id,
            "business_id": self.business_id,
            "template_id": self.template_id
        }
    @classmethod
    def get_by_business_id(cls, place_id):
        menus = cls.query.filter_by(business_id = place_id).all()
        return [menu.to_dict() for menu in menus]

class Template(db.Model):
    __tablename__ = 'template'
    id = db.Column(db.Integer, primary_key=True) 
    title = db.Column(db.VARCHAR, nullable=False)
    description = db.Column(db.Text) # add nullable=False
    price = db.Column(db.Float) # add nullable=False
    menu_type_id = db.Column(db.Integer, db.ForeignKey("menu_type.id"), nullable=False) # add nullable=False
    menu = db.relationship('Menu', backref='template',lazy=True)
    section = db.relationship('Section', backref='template',lazy=True)

    def __repr__(self):
        return f'The template is: {self.title}'

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "price": self.price,
            "menu_type_id": self.menu_type_id
        }
    
    @classmethod
    def get_by_id(cls, menu_type_id):
        templates = cls.query.filter_by(menu_type_id = menu_type_id).all()
        return [template.to_dict() for template in templates]

    @classmethod
    def add(cls, title, description, price, menu_type_id):
        template = cls(
            title=title,
            description=description,
            price=price,
            menu_type_id=menu_type_id
            )
        db.session.add(template)
        db.session.commit()
        return template
    
    @classmethod
    def get_by_menu_type(cls, menu_type):
        template_list = cls.query.filter_by(menu_type = menu_type).all()
        return template_list

class Section(db.Model):
    __tablename__ = 'section'
    __table_args__ = ( db.UniqueConstraint('name', 'meal_id', 'template_id'), )
    id = db.Column(db.Integer, primary_key=True) 
    name = db.Column(db.VARCHAR, nullable=False)
    meal_id = db.Column(db.Integer, db.ForeignKey("meal.id"), nullable=True)
    template_id = db.Column(db.Integer, db.ForeignKey("template.id"), nullable=False)

    def __repr__(self):
        return f'The Menu Type is: {self.name}'

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "meal_id": self.meal_id,
            "template_id": self.template_id
        }

    def add(self):
        db.session.add(self)
        db.session.commit()
    
    @classmethod
    def get_by_meal(cls, meal_id):
        meal_in_section = cls.query.filter_by(meal_id = meal_id).first_or_404(description=None)
        return meal_in_section

    @classmethod
    def get_by_name(cls, name):
        section_name = cls.query.filter_by(name = name).all()
        return section_name

    @classmethod
    def get_by_template(cls, template_id):
        sections_in_template = cls.query.filter_by(template_id = template_id).all()
        return sections_in_template
    
    def delete(self):
        db.session.delete(self)
        db.session.commit()
        return self

    @classmethod
    def add_new(cls, name, meal_id, template_id):
        section = cls(
            name=name,
            meal_id=meal_id,
            template_id=template_id
            )
        db.session.add(section)
        db.session.commit()
        return section


    @classmethod
    def get_by_id(cls, template_id):
        sections = cls.query.filter_by(template_id = template_id).all()
        return [section.to_dict() for section in sections]

    @classmethod
    def get_by_id_without_meal(cls, template_id):
        sections = cls.query.filter_by( meal_id = None, template_id = template_id).order_by(Section.id).all()
        return [section.to_dict() for section in sections]


class Enum_Category(str, enum.Enum):
    daily_menu = "Menu del día"
    cart_menu = "Carta"
    drinks_menu = "Carta de bebidas"
    dessert_menu = "Carta de postres"
    cocktail_menu = "Carta de cocteles"


class Menu_Type(db.Model):
    __tablename__ = 'menu_type'
    id = db.Column(db.Integer, primary_key=True) 
    menu_type = db.Column(db.Enum(Enum_Category), nullable=False)
    template = db.relationship('Template', backref='menu_type',lazy=True)
    
    def __repr__(self):
        return f'The menu types are: {self.menu_type}'

    def to_dict(self):
        return {
            "id": self.id,
            "menu_type": self.menu_type
        }

    @classmethod
    def add(cls, menu_type):
        menu_type = cls(
            menu_type=menu_type
            )
        db.session.add(menu_type)
        db.session.commit()
        return menu_type
    
    @classmethod
    def get_all_menu_type(cls):
        menu_type = cls.query.all()
        return [menu_types.to_dict() for menu_types in menu_type]

association_table = db.Table('meal_contains_meal_info', db.Model.metadata,
    db.Column('meal', db.Integer, db.ForeignKey('meal.id')),
    db.Column('meal_info', db.Integer, db.ForeignKey('meal_info.id'))
)
class Meal(db.Model):
    __tablename__ = 'meal'
    id = db.Column(db.Integer, primary_key=True) 
    name = db.Column(db.VARCHAR, nullable=False)
    description = db.Column(db.Text)
    price = db.Column(db.Float, nullable=False)
    business_id = db.Column(db.Integer, db.ForeignKey("business.id"), nullable=False)
    section = db.relationship('Section', backref='meal',lazy=True)
    meal_info = db.relationship(
        "Meal_Info",
        secondary=association_table,
        back_populates="meal",
        )

    def __repr__(self):
        return f'The meal is: {self.meal_name}'

    def to_dict(self):
        return{
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "price": self.price,
            "business_id": self.business_id
            }

    def add(self , meal_info):
        if meal_info is not None:
            for info in meal_info:
                self.meal_info.append(Meal_Info.get_by_id(info))
        db.session.add(self)
        db.session.commit()

    @classmethod
    def get_by_id(cls, id):
        meal = cls.query.filter_by(id = id).first_or_404(description=None)
        return meal

    def delete(self):
        db.session.delete(self)
        db.session.commit() 
        return self

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
            "info": self.info
        }
    @classmethod
    def get_by_id(cls, id):
        info = cls.query.filter_by(id = id).first()
        return info

    
    @classmethod
    def add(cls, meal_info):
        meal_info = cls(
            info=meal_info
            )
        db.session.add(meal_info)
        db.session.commit()
        return meal_info