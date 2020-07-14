const functions = require("firebase-functions");
const admin = require("firebase-admin");
const fetch = require("node-fetch");
const rest = require('restler');
const crypto = require('crypto');
const cors = require('cors');
const express = require("express");
const app = express();
const path = require("path");

const corsOptions = {
  origin: [
  'http://localhost',
  'http://localhost:8080',
  'http://localhost:8100',
  'http://localhost:3000',
  'http://localhost:5000',
  'http://localhost:4000',
  'http://localhost:4001'],
  allowedHeaders: ["Content-Type", "Authorization", "Access-Control-Allow-Methods", "Access-Control-Request-Headers"],
  credentials: true,
  enablePreflight: true
}

app.use(cors(corsOptions));
app.options('*', cors(corsOptions))
// Initialize
var serviceAccount = require("./adminsdk");

admin.initializeApp({ credential: admin.credential.cert(serviceAccount), databaseURL: "https://gymflow-47c9b.firebaseio.com" });


app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname + "public")));

app.set("views", "/Users/giovanniordonez/Desktop/GymFlow1/public");
//app.set("views", "./public");
app.set("view engine", "ejs");

const db = admin.firestore();

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


app.post("/fitness-form", async (req, res) => {

  var user;
  await admin.auth().getUserByEmail(req.body.Email).
  then((userRecord) => {
    user = userRecord.uid;
  }).catch(err => {
    console.log(err)
  });
console.log(req.body.ExerciseName)
db.collection('users').doc(`${user}`).collection('exercises').add({
    createdAt: admin.firestore.Timestamp.now(),
    exercise: req.body.ExerciseName,
    sets: Number(req.body.Sets),
    reps: Number(req.body.Reps),
    weight: Number(req.body.Weight)
  }).then(doc => {
  console.log(doc.id);
  }).catch((err) => {
  console.log(err)
});
/*
exerciseRef.get().then(data => {
  data.forEach(doc => {
    
    if(new Date (doc.data().createdAt * 1000).setHours(0,0,0,0) == new Date(admin.firestore.Timestamp.now()).setHours(0,0,0,0))
      {
          console.log("Entry has been made for this day");
          res.send({message: "Entry for today has already been made"}); 
      }
      else {
        */
      //}  
    //})
  //})
  
  res.status(200).send({message: 'POST Successful'})
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

var registerObj ={
  method: 'profile.create',
  oauth_consumer_key: apiKey,
  oauth_nonce: Math.random().toString(36).replace(/[^a-z]/, '').substr(2),
  oauth_signature_method: 'HMAC-SHA1',
  oauth_timestamp: Math.floor(date.getTime() / 1000),
  oauth_version: '1.0',
  search_expression: '', // test query
  user_id: '' // here I need to pass the same uid from when the user registers
}
//Ex: we would pass tom@gmail.com == 1M53F8I9tASvYL2pibYyb2l0JKY2 for tom.

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


//create an object to pass to FatSecret at the moment that a user
//registers. That way it is done all at once and there is no
//second process needed to create the user. Then I can call that
//user via their uid when the user loads the fitness page.
app.get("/register", (req, res) => {
    res.render("register");
});

app.post("/register-fatsecret", (req, res) => {

  console.log(req.body);

})

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

//------------------------------------------->
//RESTful API
/**
 * Changing user data 
 */
app.post('/updateUser', async (req, res) => {

  var user;
  await admin.auth().getUserByEmail(req.body.user).
  then((userRecord) => {
    user = userRecord.uid;
  }).catch(err => {
    console.log(err)
  });

//NOTE: We cannot have two queries running at the same time if only one update is being made

if( req.body.bio != null){
  db.collection('users').doc(`${user}`).collection('userInfo').doc('info').update({
       bio: req.body.bio
    }).then(doc => {
    console.log(doc.id);
  }).catch((err) => {
    console.log(err)
  });
} if ((req.body.userName != null && req.body.image == null)){
    db.collection('users').doc(`${user}`).collection('userInfo').doc('info').update({
        userName: req.body.userName
    }).then(doc => {
    console.log(doc.id);
    }).catch((err) => {
    console.log(err)
    });
} else if ((req.body.userName == null && req.body.image != null))  {
      db.collection('users').doc(`${user}`).collection('userInfo').doc('info').update({
        imageLink: req.body.image
    }).then(doc => {
    console.log(doc.id);
    }).catch((err) => {
    console.log(err)
    });
} else if ((req.body.userName != null && req.body.image != null)){
      db.collection('users').doc(`${user}`).collection('userInfo').doc('info').update({
        imageLink: req.body.image,
        userName: req.body.userName
    }).then(doc => {
    console.log(doc.id);
    }).catch((err) => {
    console.log(err)
    });
} else if ((req.body.userName == null && req.body.image == null)){
    console.log("Nothing was inputted ")
}

else {
  var w = req.body.Weight;
  var h = req.body.Height;
  var g = req.body.Goals;

    if(w != null && h != null && g != null) {
          db.collection('users').doc(`${user}`).collection('userInfo').doc('info').update({
              Weight: req.body.Weight,
              Height: req.body.Height,
              Goals: req.body.Goals
            }).then(doc => {
            console.log(doc.id);
            }).catch((err) => {
            console.log(err)
        });
      } else if (w == null && h != null && g != null) {
        //Only when Weight is empty
        db.collection('users').doc(`${user}`).collection('userInfo').doc('info').update({
              Height: req.body.Height,
              Goals: req.body.Goals
            }).then(doc => {
            console.log(doc.id);
            }).catch((err) => {
            console.log(err)
        });
      } else if (w != null && h == null && g != null) {
        //Only when Height is empty
        db.collection('users').doc(`${user}`).collection('userInfo').doc('info').update({
              Weight: req.body.Weight,
              Goals: req.body.Goals
            }).then(doc => {
            console.log(doc.id);
            }).catch((err) => {
            console.log(err)
        });
      } else if (w != null && h != null && g == null) {
        //Only when Goals is empty
        db.collection('users').doc(`${user}`).collection('userInfo').doc('info').update({
              Weight: req.body.Weight,
              Height: req.body.Height
            }).then(doc => {
            console.log(doc.id);
            }).catch((err) => {
            console.log(err)
        });
      }
      ///
      else if (w == null && h == null && g != null) {
        //Only G is not empty
        db.collection('users').doc(`${user}`).collection('userInfo').doc('info').update({
              Weight: req.body.Weight,
              Height: req.body.Height
            }).then(doc => {
            console.log(doc.id);
            }).catch((err) => {
            console.log(err)
        });
      }
      else if (w == null && h != null && g == null) {
        //Only h is not empty
        db.collection('users').doc(`${user}`).collection('userInfo').doc('info').update({
              Weight: req.body.Weight,
              Height: req.body.Height
            }).then(doc => {
            console.log(doc.id);
            }).catch((err) => {
            console.log(err)
        });
      }
      else if (w != null && h == null && g == null) {
        //Only w is not empty
        db.collection('users').doc(`${user}`).collection('userInfo').doc('info').update({
              Weight: req.body.Weight,
              Height: req.body.Height
            }).then(doc => {
            console.log(doc.id);
            }).catch((err) => {
            console.log(err)
        });
      } else {
        console.log('Nothing was Submitted')
      }

  }

  res.status(200).send({message: "Request was Successfully Run"})
})

// synchroizing fatsecret's profile authentication with my users info for automcatic profile sync!
exports.api = functions.https.onRequest(app);
