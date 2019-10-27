//back-end
const express = require('express');
const socket = require('socket.io');
const bodyParser = require('body-parser');
const app = express();

//middleware
app.use(bodyParser.json());
app.use(express.static('public'));
const urlencodedParser = bodyParser.urlencoded({ extended: false });

//view engine
app.set('view engine', 'ejs');

//server setup
const server = app.listen(process.env.port || 5000, () => {
    console.log('now listening to port 5000');
})

//websockets
const io = socket(server);

//requests
app.get('/', (request, response) => {
    Answer.find().then(data => response.render('index', { data: data }));
})

app.get('/post', (request, response) => {
    response.render('post');
    if(request.query.question && request.query.answer){
        Answer.create({ question: request.query.question, answer: request.query.answer });
    }
})

app.post('/', urlencodedParser, (request, response) => {
    let user = request.body.user;
    let question = request.body.question;

    io.sockets.emit('message', { user: user, question: question });
    if(user && question != 'Select the question you want to ask'){
        Answer.findOne({ question: question }).then(data => io.sockets.emit('question', data));
    }

    //Answer.find().then(data => response.render('index', { data: data }));
})

//mongo
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/chatbot');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    user: String,
    question: String
})

const AnswerSchema = new Schema({
    question: String,
    answer: String
})

const Answer = mongoose.model('answer', AnswerSchema);