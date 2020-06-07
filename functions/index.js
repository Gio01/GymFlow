const functions = require("firebase-functions");
const admin = require("firebase-admin");
const fetch = require("node-fetch");
const rest = require('restler');
const crypto = require('crypto');
const cors = require('cors');

const corsOptions = {
  origin: ['http://localhost:5000']
}


// Initialize
var serviceAccount = require("./adminsdk");

admin.initializeApp({ credential: admin.credential.cert(serviceAccount), databaseURL: "https://gymflow-47c9b.firebaseio.com" });

const express = require("express");
const app = express();
const path = require("path");

app.use(express.urlencoded());
app.use(express.static(path.join(__dirname + "public")));
app.use(cors(corsOptions));

app.set("views", "/Users/giovanniordonez/Desktop/GymFlow1/public");
//app.set("views", "./public");
app.set("view engine", "ejs");

// GET my workouts
app.get("/myWorkouts", (req, res) => {
    admin.firestore().collection("workouts").get().then(data => {
        let workouts = [];
        data.forEach(doc => {
            workouts.push({
                workoutId: doc.id,
                exercise: doc.data().exercise,
                reps: doc.data().reps,
                sets: doc.data().sets,
                weight: doc.data().weight
            });
        });
        return res.json(workouts);
    }).catch(err => console.error(err));
});


app.get("/", (req, res) => {
    res.render("index");
});



app.get("/fitness", (req, res) => {

    res.render("fitness");
});

app.get("/contact", (req, res) => {
    res.render("contact");
});


app.post("/fitness-form", (req, res) => {
  console.log(req.body)
    const newWorkout = {
        createdAt: admin.firestore.Timestamp.fromDate(new Date()),
        exercise: req.body.ExerciseName,
        sets: req.body.NumSets,
        reps: req.body.NumReps,
        weight: req.body.WeightUsed
    };

    admin.firestore().collection("workouts").add(newWorkout).then(doc => {
        res.json({
            message: `document ${doc.id} created successfully`
        });
        return doc;
    }).catch(err => {
        res.status(500).json({ error: "something went wrong!" });
        console.error(err);
    });
    res.render("fitness");
});



app.get("/workouts/:exercise", (req, res) => {
    const exercise = req.params.exercise;
    const liste = admin.firestore().collection("workouts");
    const query = liste.where("exercise", "==", exercise).get().then(data => {
        if (data.empty) {
            console.log("No matching exercises");
            return;
        }
        let e = [];
        data.forEach(doc => {
            e.push(doc.data());
        });
        return res.json(e);
    }).catch(err => {
        console.log("Error with retrieving exercises!", err);
    });

    return query;
});

app.get("/login", (req, res) => {
    res.render("login");
});

//Login Users
//Fix the authentication because it is not being equalled properly!



app.get("/register", (req, res) => {
    res.render("register");
});

//-----------------------------------Fat Secret Nutrional Data Get from API
const url = "https://platform.fatsecret.com/rest/server.api";
const uuid = require('uuid');
const oauth_nonce = uuid.v1();
//-------------------------------------------->
const apiKey = '';
const fatSecretRestUrl = 'http://platform.fatsecret.com/rest/server.api';
var sharedSecret = '';
const date = new Date();

// Note that the keys are in alphabetical order
//to create a user we need to pass the user_id to the method profile.create
//profile.request_script_session_key
var reqObj = {
  method: 'profile.request_script_session_key',
  oauth_consumer_key: apiKey,
  oauth_nonce: Math.random().toString(36).replace(/[^a-z]/, '').substr(2),
  oauth_signature_method: 'HMAC-SHA1',
  oauth_timestamp: Math.floor(date.getTime() / 1000),
  oauth_version: '1.0',
  search_expression: '', // test query
  user_id: "9MeLvMZUz0ZwX6cBGoaXTGg9Cy53"
};
//mario@att.net == R41ndy7hvwU3yQnU3tfnuoA69jv1
//tom@gmail.com == 1M53F8I9tASvYL2pibYyb2l0JKY2

// construct a param=value& string and uriEncode
var paramsStr = '';
for (var i in reqObj) {
  paramsStr += "&" + i + "=" + reqObj[i];
}

// yank off that first "&"
paramsStr = paramsStr.substr(1);

var sigBaseStr = "POST&"
                 + encodeURIComponent(fatSecretRestUrl)
                 + "&"
                 + encodeURIComponent(paramsStr);

// no  Access Token token (there's no user .. we're just calling foods.search)
sharedSecret += "&";

var hashedBaseStr  = crypto.createHmac('sha1', sharedSecret).update(sigBaseStr).digest('base64');

// Add oauth_signature to the request object
reqObj.oauth_signature = hashedBaseStr;


const parseString = require("xml2js").parseString;

var util = require('util');

const json = require('circular-json');

app.get("/profile", async (req, res) => {
    //console.log(json.stringify(session_key));
   await rest.post(fatSecretRestUrl, {
        data: reqObj,
      }).on('complete', function(data, response) {
        //console.log(response);
       // console.log("DATA: " + data + "\n");
        var xml = data;
       parseString(xml, function (err, result) {

          res.render("profile", {sk: result.profile.session_key[0]});
          //return result.profile.session_key[0];
      });
      });

})

app.get("/fatstorage", async (req, res) => {
    var fatsecret_session_key = '';
    var clientSecret = '';
    const api_url = `https://platform.fatsecret.com/js?fatsecret_session_key=${fatsecret_session_key}`;
    const json = await res.json();
    console.log(json);
})

// Login users with their respective login info

// synchroizing fatsecret's profile authentication with my users info for automcatic profile sync!
exports.api = functions.https.onRequest(app);
