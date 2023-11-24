// подключение фреймворка
let express = require('express');
const path = require('path');
let app = express();

// обрабатываемые маршруты
// на остальных будет 404 ошибка
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname,'/index.html'));
});

app.use(express.static(__dirname + '/assets'));
app.use(express.static(__dirname + '/public'));


// прослушка порта 
app.listen(8080, function () {
   console.log('Example app listening on port 8080!');
});