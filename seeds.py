from app import app, db
from models.Event import Event
from models.User import User
from models.Photo import Photo
from models.EventComment import EventComment

with app.app_context():
    db.drop_all()
    db.create_all()

    # ------- USERS ------
    caro = User({
        'username': 'Caro-Promoter',
        'email': 'carolineho1983@yahoo.fr',
        'image': 'https://i.imgur.com/VY3wrcF.jpg',
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

    richiehawtin = User({
        'username': 'Richie-Hawtin',
        'email': 'richie@hawtin.com',
        'image': 'https://i.imgur.com/QeiE0In.jpg',
        'password': 'pass',
        'password_confirmation': 'pass'
    })
    richiehawtin.save()

    armandvh = User({
        'username': 'Armand_Van_H',
        'email': 'arman@vanhelden.com',
        'image': 'https://i.imgur.com/sGckMXA.jpg',
        'password': 'pass',
        'password_confirmation': 'pass'
    })
    armandvh.save()

    djpaulette = User({
        'username': 'DJ_Paulette',
        'email': 'dj@paulette.com',
        'image': 'https://i.imgur.com/GfOnptf.png',
        'password': 'pass',
        'password_confirmation': 'pass'
    })
    djpaulette.save()

    jason = User({
        'username': 'Jason',
        'email': 'jason@jason.com',
        'image': 'https://i.imgur.com/T1CsoL5.jpg',
        'password': 'pass',
        'password_confirmation': 'pass'
    })
    jason.save()

    ida = User({
        'username': 'Ida_Engberg',
        'email': 'ida@engberg.com',
        'image': 'https://i.imgur.com/JXSbOtW.png',
        'password': 'pass',
        'password_confirmation': 'pass'
    })
    ida.save()

    carl = User({
        'username': 'Carl_Cox',
        'email': 'carl@cox.com',
        'image': 'https://i.imgur.com/eI7REAU.jpg',
        'password': 'pass',
        'password_confirmation': 'pass'
    })
    carl.save()

    # --------- EVENTS -------------
    eventtiga = Event({
        'name': 'Tiga - Boiler Room',
        'date': '2019-02-12',
        'location': 'Toronto',
        'genre': 'electronica, electro house',
        'image': 'https://i.imgur.com/CjVTbX9.jpg',
        'price': 60,
        'user_id': defectedrecords.id
    })
    eventtiga.save()

    eventcarlcox = Event({
        'name': 'Carl Cox - Opening party',
        'date': '2019-06-01',
        'location': 'Space, Ibiza',
        'genre': 'Techno',
        'image': 'https://i.imgur.com/3PY85OY.jpg',
        'price': 85,
        'user_id': spaceibiza.id
    })
    eventcarlcox.save()

    eventtomorrowland = Event({
        'name': 'TomorrowLand 2021',
        'date': '2021-07-05',
        'location': 'Brussels',
        'genre': 'Techno',
        'image': 'https://i.imgur.com/qfnzJ21.jpg',
        'price': 255,
        'user_id': caro.id
    })
    eventtomorrowland.save()

    eventdisclosure = Event({
        'name': 'Disclosure Tour',
        'date': '2020-06-05',
        'location': 'Moscow',
        'genre': 'UK House, Future garage, Deep house',
        'image': 'https://i.imgur.com/IGZIuW1.png',
        'price': 80,
        'user_id': caro.id
    })
    eventdisclosure.save()

    eventIda = Event({
        'name': 'Ida Engberg + Adam Beyer @Sonar Festival',
        'date': '2019-06-15',
        'location': 'Sonar Fest. | Barcelona',
        'genre': 'Techno',
        'image': 'https://i.imgur.com/InTaTbD.jpg',
        'price': 45,
        'user_id': ida.id
    })
    eventIda.save()

    eventcarlcoxnye = Event({
        'name': 'NYE with House Father Carl Cox',
        'date': '2017-01-01',
        'location': 'Printworks, London',
        'genre': 'Epic Techno',
        'image': 'https://i.imgur.com/E6YuXsj.jpg',
        'price': 75,
        'user_id': carl.id
    })
    eventcarlcoxnye.save()

    eventdfctd = Event({
        'name': 'Closing Party - IBZ 2018',
        'date': '2018-10-1',
        'location': 'Amnesia, Ibiza',
        'genre': 'House',
        'image': 'https://i.imgur.com/U8D28TH.jpg',
        'price': 100,
        'user_id': defectedrecords.id
    })
    eventdfctd.attendees.extend([
        caro,
        ida,
        carl,
        jason,
        richiehawtin,
        djpaulette,
        armandvh,
        spaceibiza,
        defectedrecords
    ])
    eventdfctd.save()

    eventdd = Event({
        'name': 'Duke Dumont',
        'date': '2019-03-18',
        'location': 'XOYO, London',
        'genre': 'House',
        'image': 'https://i.imgur.com/o08OzAs.jpg',
        'price': 45,
        'user_id': defectedrecords.id
    })
    eventdd.save()

    eventcream = Event({
        'name': 'Creamfields 2019',
        'date': '2019-08-22',
        'location': 'Cheshire, UK',
        'genre': 'House',
        'image': 'https://i.imgur.com/mJdUNvt.jpg',
        'price': 45,
        'user_id': jason.id
    })
    eventcream.save()

    eventGGC = Event({
        'name': 'Gorgon City',
        'date': '2018-08-16',
        'location': 'Berghain, Berlin',
        'genre': 'House',
        'image': 'https://i.imgur.com/kosYFcB.png',
        'price': 45,
        'user_id': caro.id
    })
    eventGGC.save()

    eventpt = Event({
        'name': 'Pete Tong | All Gone',
        'date': '2019-02-14',
        'location': 'Amsterdam',
        'genre': 'House',
        'image': 'https://i.imgur.com/awjetQv.jpg',
        'price': 45,
        'user_id': caro.id
    })
    eventpt.save()

    eventsk = Event({
        'name': 'Sander Kleinenberg',
        'date': '2019-02-14',
        'location': 'Twist, Miami',
        'genre': 'House',
        'image': 'https://i.imgur.com/CzoKi64.jpg',
        'price': 45,
        'user_id': caro.id
    })
    eventpt.save()

    # --------- PICS ---------
    pic1 = Photo({
        'event_id': eventdfctd.id,
        'image': 'https://i.imgur.com/s70Tsmr.jpg',
        'user_id': caro.id,
        'caption': 'stage 2'
    })
    pic1.save()

    pic2 = Photo({
        'event_id': eventdfctd.id,
        'image': 'https://i.imgur.com/91Dmfiz.jpg',
        'user_id': caro.id,
        'caption': 'the stage'
    })
    pic2.save()

    pic3 = Photo({
        'event_id': eventdfctd.id,
        'image': 'https://i.imgur.com/GKAj80i.jpg',
        'user_id': jason.id,
        'caption': 'bachelor party'
    })
    pic3.save()

    pic4 = Photo({
        'event_id': eventdfctd.id,
        'image': 'https://i.imgur.com/s70Tsmr.jpg',
        'user_id': jason.id,
        'caption': 'partying hard'
    })
    pic4.save()

    pic5 = Photo({
        'event_id': eventdfctd.id,
        'image': 'https://i.imgur.com/PNYegm3.jpg',
        'user_id': jason.id,
        'caption': 'Zac and Kanye'
    })
    pic5.save()

    pic6 = Photo({
        'event_id': eventdfctd.id,
        'image': 'https://i.imgur.com/LNJAvjg.jpg',
        'user_id': ida.id,
        'caption': 'Carl mixing'
    })
    pic6.save()

    pic7 = Photo({
        'event_id': eventdfctd.id,
        'image': 'https://i.imgur.com/DLL6CB3.jpg',
        'user_id': armandvh.id,
        'caption': 'laser show'
    })
    pic7.save()

    pic8 = Photo({
        'event_id': eventdfctd.id,
        'image': 'https://i.imgur.com/9sTVbDL.jpg',
        'user_id': richiehawtin.id,
        'caption': ''
    })
    pic8.save()

    pic9 = Photo({
        'event_id': eventdfctd.id,
        'image': 'https://i.imgur.com/WdPKKt9.jpg',
        'user_id': ida.id,
        'caption': ''
    })
    pic9.save()

    pic10 = Photo({
        'event_id': eventdfctd.id,
        'image': 'https://i.imgur.com/yLM1Oe9.jpg',
        'user_id': jason.id,
        'caption': 'Big night, Justin and us'
    })
    pic10.save()

    pic11 = Photo({
        'event_id': eventdfctd.id,
        'image': 'https://i.imgur.com/DLL6CB3.jpg',
        'user_id': caro.id,
        'caption': ''
    })
    pic11.save()

    # ------- COMMENTS -----
    comm1 = EventComment({
        'content': 'sick!',
        'user_id': armandvh.id,
        'event_id': eventdfctd.id
    })
    comm1.save()

    comm2 = EventComment({
        'content': 'I was there with Zac and Kanye!',
        'user_id': jason.id,
        'event_id': eventdfctd.id
    })
    comm2.save()

    comm3 = EventComment({
        'content': 'Free drinks tonight @ Space, Ibiza. space@ibiza.com',
        'user_id': spaceibiza.id,
        'event_id': eventdfctd.id
    })
    comm3.save()

    comm4 = EventComment({
        'content': 'Great night, will come back next year',
        'user_id': caro.id,
        'event_id': eventdfctd.id
    })
    comm4.save()

    print('Database successfully seeded')
