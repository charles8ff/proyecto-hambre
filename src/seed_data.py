from werkzeug.security import generate_password_hash
from werkzeug import security
from api.models import db, Business

data = [
        Business(
            id= 1,
            is_active= True,
            email = "rigoberto_el_guapo@gmail.com" , 
            _password = generate_password_hash(" 1234567890" ),
            place_name =" Bar Rigoberto" , 
            address = "Calle López de Hoyos 42, Entrada por Edison, 3, 28006 Madrid" , 
            description = "Bar de toda la vida, con sus cañitas, ambiente distendido, desde 2021 ",
            phone_number = 669109474 ,
            open_hour =" 09:00" ,
            close_hour = "18:00 "
        )]
    #     Business(
    #         {'id':2,
    #         'is_active':True,
    #         'email':'tasca_trini@gmail.com', 
    #         '_password':generate_password_hash('9876543210'),
    #         'place_name':'Tasca Trini', 
    #         'address':'Calle Leganés, 21, esquina, 28981 Parla, Madrid', 
    #         'description':'Platos de siempre hechos con amor y cariño, la Trini ',
    #         'phone_number':'622954368',
    #         'open_hour':'10:00',
    #         'close_hour':'21:00'}
    #     ),
    #     Business(
    #         {'id':3,
    #         'is_active':True,
    #         'email':'bollitos_veganitos@gmail.com', 
    #         '_password':generate_password_hash('333333333'),
    #         'place_name':'EatGreenAndHealthy', 
    #         'address':'Calle del Príncipe de Vergara, 55, 28006 Madrid', 
    #         'description':'Tu refugio vegan & vegetarian friendly para comprar productos de alimentación.',
    #         'phone_number':'915645576',
    #         'open_hour':'09:30',
    #         'close_hour':'17:00'}
    #     ),
    # ]

    # 'Menu":[{
    #     "id":1,
    #     "business_id":1,
    #     "template_id":1,
    # },
    # {
    #     "id":2,
    #     "business_id":1,
    #     "template_id":2,
    # },
    # {
    #     "id":3,
    #     "business_id":2,
    #     "template_id":3,
    # }],
    # "Template":[{
    #     "id":1,
    #     "title":"Template Red Arrows",
    #     "description":"Has Red Arrows",
    #     "price":5.00,
        
    # },
    # {
    #     "id":2,
    #     "title":"Template White",
    #     "description":"Is White",
    #     "price":0.00,
        
    # },
    # {
    #     "id":3,
    #     "title":"Template Green",
    #     "description":"Is Green",
    #     "price":0.00,
        
#     # }]
# }
