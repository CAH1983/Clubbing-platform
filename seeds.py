from app import app, db
from models.Event import Event
from models.User import User

with app.app_context():
    db.drop_all()
    db.create_all()

    caro = User({
        'username': 'Caro-Promoter',
        'email': 'carolineho1983@yahoo.fr',
        'image': 'https://i.imgur.com/zG3qEjr.jpg',
        'password': 'pass',
        'password_confirmation': 'pass'
    })
    caro.save()

    spaceibiza = User({
        'username': 'space-ibiza',
        'email': 'space@ibiza.com',
        'image': 'https://cdn.worldvectorlogo.com/logos/space-ibiza.svg',
        'password': 'pass',
        'password_confirmation': 'pass'
    })
    spaceibiza.save()

    defectedrecords = User({
        'username': 'defected-records',
        'email': 'defected@defectedrecords.com',
        'image': 'https://i.imgur.com/CzWPSga.jpg',
        'password': 'pass',
        'password_confirmation': 'pass'
    })
    defectedrecords.save()

    eventtiga = Event({
        'name': 'Tiga - Boiler Room',
        'date': '2019-02-12',
        'location': 'Toronto',
        'genre': 'electronica, electro house',
        'image': 'https://i.imgur.com/CjVTbX9.jpg',
        'price': 45,
        'user': defectedrecords
    })
    eventtiga.save()

    eventcarlcox = Event({
        'name': 'Carl Cox - Opening party',
        'date': '2019-06-01',
        'location': 'Space, Ibiza',
        'genre': 'Techno',
        'image': 'https://i.imgur.com/3PY85OY.jpg',
        'price': 85,
        'user': spaceibiza
    })
    eventcarlcox.save()

    eventtomorrowland = Event({
        'name': 'TomorrowLand 2021',
        'date': '2021-07-05',
        'location': 'Brussels',
        'genre': 'Techno',
        'image': 'https://i.imgur.com/qfnzJ21.jpg',
        'price': 55,
        'user': caro
    })
    eventtomorrowland.save()

    print('Database successfully seeded')
