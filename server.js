
var express = require("express");
const bodyParser = require('body-parser');
var restaurantController = require('./controllers/restaurantController');
var commentController = require('./controllers/commentController');
var memberController = require('./controllers/memberController');
var favouriteController = require('./controllers/favouriteController');
const bodyParserErrorHandler = require('express-body-parser-error-handler');
const res = require("express/lib/response");

var app = express();
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParserErrorHandler());
app.set('view engine','ejs')

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var flash = require('express-flash');
var session = require('express-session');



app.use(express.static("./public"));
app.use(express.json());


app.route('/restaurant').get(restaurantController.getAllRestaurant);
app.route('/filter').post(restaurantController.filterRestaurant);
app.route('/restaurant/:id').get(restaurantController.getAllRestaurant);
app.route('/comments').get(commentController.getAllComments);
app.route('/comments').post(commentController.addComment);
app.route('/comments/:id').put(commentController.updateComment);
app.route('/comments/:id').delete(commentController.deleteComment);
app.route('/search').post(restaurantController.searchRestaurant);
app.route('/restaurantASC').get(restaurantController.getAllRestaurantASC);
app.route('/restaurantDESC').get(restaurantController.getAllRestaurantDESC);
app.route('/restaurantAVG').get(restaurantController.avgRestaurant);
app.route('/result').post(restaurantController.getAllRestaurant);
app.route('/checkEmail').post(memberController.checkEmail);
//route for members
app.route('/search').get(restaurantController.searchRestaurant);
app.route('/members').get(memberController.getAllMembers);
app.route('/members').post(memberController.addMember);
app.route('/members').put(memberController.updateMember);

app.route('/login').post(memberController.loginMember);
app.route('/email').post(restaurantController.sendEmail1);
app.route('/user').post(memberController.getMembers);

app.route('/deleteUser/:id').delete(memberController.deleteMember);
app.route('/favourite').get(favouriteController.getAllFavourites);
app.route('/addFavourite').post(favouriteController.addFavourites);
app.route('/deleteFavourite/:id').delete(favouriteController.deleteFavourites);
app.route('/favourite/user_id1').post(favouriteController.getSelectedFavourites1);
app.route('/favourite/:user_id').post(favouriteController.getSelectedFavourites);
app.route('/deleteFavouriteSub/:id').delete(favouriteController.deleteFavouriteSub);


var usersRouter = require('./routes/users');
 
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
 
app.use(session({ 
    secret: '123458cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))
 
app.use(flash());
 

app.use('/', usersRouter);
 

 




app.listen(5500,"127.0.0.1");
console.log("web server running @ http://127.0.0.1:5500");

