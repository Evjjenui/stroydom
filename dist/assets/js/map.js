ymaps.ready(function () {
    ymaps.option.presetStorage
        .add('game#houseIcon', {
            iconLayout: 'default#image',
            iconImageHref: 'assets/images/map_pin.png',
            iconImageSize: [30, 40],
        });

    var myMap = new ymaps.Map('map', {
            center: [59.939095, 30.315868],
            zoom: 11
        }, {
            searchControlProvider: 'yandex#search'
        }),

        MyCollection = new ymaps.GeoObjectCollection(null, {
            preset: 'game#houseIcon'
        }),
        
        MyCollectionCoords = [[59.879444, 30.320689], [60.000029, 30.460764], [60.034401, 30.775248]];

    for (var i = 0, l = MyCollectionCoords.length; i < l; i++) {
        MyCollection.add(new ymaps.Placemark(MyCollectionCoords[i]));
    }

    myMap.geoObjects.add(MyCollection)
});
