from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Bussiness(db.Model):
    __tablename__ = 'bussiness'
    id = db.Column(db.Integer, primary_key=True)
    is_active = db.Column(db.Boolean, nullable=False, default=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    _password = db.Column(db.String, nullable=False)
    place_name = db.Column(db.String, nullable=False)
    address = db.Column(db.String(250), nullable=False)
    description = db.Column(db.Text, nullable=False) #Import this (¿?)
    phone_number = db.Column(db.String(15), nullable=False)
    open_hour = db.Column(db.Time, nullable=False)
    close_hour = db.Column(db.Time, nullable=False) 
    menu = db.relationship('Menu', backref='bussiness',lazy=True)

    def __repr__(self):
        return f'Bussiness: {self.place_name}'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
        }

class Menu(db.Model):
    __tablename__ = 'menu'
    id = db.Column(db.Integer, primary_key=True)
    bussiness_id = db.Column(db.Integer, db.ForeignKey("bussiness.id"), nullable=False)
    template_id = db.Column(db.Integer, db.ForeignKey("template.id"), nullable=False)
    meal = db.relationship('Meal', backref='menu',lazy=True)

    def __repr__(self):
        return f'The menu of bussiness: {self.bussiness_id}'

    def serialize(self):
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

    def serialize(self):
        return {
            "id": self.id,
            # do not serialize the password, its a security breach
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

    def serialize(self):
        return {
            "id": self.id,
            # do not serialize the password, its a security breach
        }

class Meal_Info(db.Model):
    __tablename__ = 'meal_info'
    id = db.Column(db.Integer, primary_key=True) 
    info = db.Column(db.String, nullable=False)
    meal = db.relationship(
        "Meal",
        secondary=association_table,
        back_populates="meal_info")

    def __repr__(self):
        return f'The meal info: {self.info}'

    def serialize(self):
        return {
            "id": self.id,
            # do not serialize the password, its a security breach
        }

class Category(db.Model):
    __tablename__ = 'category'
    id = db.Column(db.Integer, primary_key=True) 
    category = db.Column(db.String, nullable=False)
    meal = db.relationship('Meal', backref='category',lazy=True)

    def __repr__(self):
        return f'The meal is: {self.meal_name}'

    def serialize(self):
        return {
            "id": self.id,
            # do not serialize the password, its a security breach
        }