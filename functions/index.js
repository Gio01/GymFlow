const functions = require("firebase-functions");
const admin = require("firebase-admin");
const fetch = require("node-fetch");
const rest = require('restler');
const crypto = require('crypto');



// Initialize
var serviceAccount = {
    type: "service_account",
    project_id: "gymflow-47c9b",
    private_key_id: "2950deafa713752e8632b876f9a2bdeeae303213",
    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDAatgfk01eX7eE\nuQW99JP7AJdVh7He5ywh19N0QKCcfb4t55nwT5Gu3YNGgbGAx3RuCavWqfqpNsV2\nlL5IEIKzi2AOnrpdb9XXtjMLyl0EjLjC89yFut7j7YdT+SZ7MD4EE+Y4gzsNyHAY\n08OYu+CDzdmulpQG8lwJrxocYQnUmWUcDPRK2Z6CQoj1yc/GwsCf2STH1859hZa1\n4G7/KsSGxVpDcke+1ib8HInJ5vDW9f6oGvEXd7c6BOaxmLTdXl6Q43r7Nabd5puN\nF3dvgWKQrNsGu1cTeeRLuVCQAG38/0Eu3dHpzRUcSzoMWrQx75T6W4Nxk7wijI3p\nritZojUhAgMBAAECggEAGt8A6h3v1NFgp1YQZXfxr4CkYbMmxaZ6fQpvMwGwfFI6\nHB6HGq59/ZHdOpwzjfSsv441s29+/CEUP+xjS1yU6B57bmc/xvsufaap58hdp5xA\nVCdqoTlY1bNO7gzyEQuKaZbe1H8NIO5gKzNtkheQsc9uSimop/SyIj8UEikCDrCT\n7aKGajjbID6a+hQ64xY5jMaUltiEvPqj5791mnztZGKwqx2Mw48HZdwEriD71ftj\nY5Ahn/kkpNyYUk5pn5QpCMlCJ4s3vxh/bN3p/JLhy3QOP71uT2Cg5o2oY7If+Pic\nVmHLcwsRGnw4y1Uu7MLOtjHJsDtFB2YhwbqrYNFEzQKBgQD5CuWk0gsBSJUdGdpr\n2qaGJIS342xbcKEIPgZo256aPljrl5Mtn0OZJDh65nGSR8jpEIkfqXrYbEk/yLhK\n/6B4HApw3Ba5FR7vY6HipaA+T5fWxN9kNEm6xytpnTQ9TWWcK0DI979Vw568zL0b\noIM3nFp1CWV9PxaHY1rT9152HQKBgQDFyvmXCx/KgD/b0qu8W8vgjdtrIAmW8AQP\n+KRi4Qm5euNvPkRY789y4AoyJGVrdHpvfG/ZRcyvwX7zAFLv1bTDsldoi0oNawNy\nTqM6N82fERENk9Ei7MGDmeUOIh4bNx5d2TLDSaGbP32Uo1AUlIkc6hPFt1HL/ekN\njm6qkFJ71QKBgGuten05E+kKKO7cLsRTVYzKXVfkzQT8PaQCrWLJElo+etPiRZCE\nPAYK0yDQYmqM/yFGNQOrk6HfsAwUDRrgS9GiziDeCDUeHLIEsgn88rv+TfheRvhc\nY0SOuQaBIgUfYb+UM/6wn9nFKu0W2O0JCbMRt0rDNU5h6KvBGZRscDtBAoGAIoLe\n987WFjQ4cDebBXuS4DSAQ3nMkoyAePTuYd5YHwflJSTdMhNtw+J5hPQ6yfwB3O/+\naA+4vjXp26aD0hsctkSo4bHkEuFIMaqs6lyQQR/uNMtE424h+b9hawzi6ea9Iqzi\nIZb4Xqk+VTAFqgGcxvHEz2vEFu7PujDO+G3EJp0CgYEAlBfzwqY0123KEnwbwQ0N\nBEI/TS0Rh6Hi5rZ+Gjc2KIYqBKvj7ly1Ke8KcENxM6UHkm/NabJyBSH+2usIX6/S\nZXxw+9uZb8YYoA93c004TUav/nzyXxDH6kr3QN3u+aDwz3fKxiMlCLwAwW+12waC\nK2hfy7woCsqHjim5sTLcv3g=\n-----END PRIVATE KEY-----\n",
    client_email: "firebase-adminsdk-d9c1h@gymflow-47c9b.iam.gserviceaccount.com",
    client_id: "100190534801057623115",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-d9c1h%40gymflow-47c9b.iam.gserviceaccount.com"
};

admin.initializeApp({ credential: admin.credential.cert(serviceAccount), databaseURL: "https://gymflow-47c9b.firebaseio.com" });

const express = require("express");
const app = express();
const path = require("path");

app.use(express.urlencoded());
app.use(express.static(path.join(__dirname + "public")));


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
const apiKey = '6fde3dcb6dcf46c589985a16555a5f8e';
const fatSecretRestUrl = 'http://platform.fatsecret.com/rest/server.api';
var sharedSecret = '9b8971b8248c4e33aec7d4b2db24fa09';
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
    var fatsecret_session_key = '6fde3dcb6dcf46c589985a16555a5f8e';
    var clientSecret = '9b8971b8248c4e33aec7d4b2db24fa09';
    const api_url = `https://platform.fatsecret.com/js?fatsecret_session_key=${fatsecret_session_key}`;
    const json = await res.json();
    console.log(json);
})

// Login users with their respective login info

// synchroizing fatsecret's profile authentication with my users info for automcatic profile sync!
exports.api = functions.https.onRequest(app);
