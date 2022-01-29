const functions = require("firebase-functions");


const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");


require("dotenv").config();


// Import the functions you need from the SDKs you need
const admin=require( "firebase-admin");

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAzWT11192Mg8vJDd4iX3-waPAQwCudZa0",
  authDomain: "cyph-264010.firebaseapp.com",
  databaseURL: "https://cyph-264010.firebaseio.com",
  projectId: "cyph-264010",
  storageBucket: "cyph-264010.appspot.com",
  messagingSenderId: "715724709778",
  appId: "1:715724709778:web:e8166b57ce2a56c6e9ab4b",
  measurementId: "G-T17PWDDYQ6",
};


const middlewares = require("./middlewares");
const api = require("./api");


const adm = admin.initializeApp(firebaseConfig);


const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  functions.logger.debug(req, {structuredData: true});
  res.json({
    message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄",
  });
});


app.post("/report", (req, res) => {
  functions.logger.debug(req, {structuredData: true});
  if (req.body.price.trim() == "") {
    return res.status(400).json({body: "Price must not be empty"});
  } else if (req.body.paidFor == []) {
    return res.status(400).json({body: "paidFor must not be empty"});
  } else if (req.body.paidBy.trim() == "") {
    return res.status(400).json({body: "paidBy must not be empty"});
  }

  const newReport={
    price: req.body.price,
    paidFor: req.body.paidFor,
    paidBy: req.body.paidBy,
    paidAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  };
  adm.firestore().collection("reports")
      .add(newReport)
      .then(
          (doc)=>{
            res.json({message: `document ${doc.id} created successfully`});
          }
      ).catch((err)=>{
        res.status(500).json({error: "something went wrong"});
        console.error(err);
      });
});

app.get("/reports", (req, res)=>{
  adm.firestore().collection("reports").orderBy("createdAt", "desc")
      .get()
      .then((doc)=>{
        const reports=[];
        doc.forEach((data)=>{
          reports.push({
            reportId: data.id,
            price: data.data().price,
            paidFor: data.data().paidFor,
            paidAt: data.data().paidAt,
            createdAt: data.data().createdAt,
          });
        });
        return res.json(reports);
      }).catch((err)=>{
        res.status(500).json({error: "something went wrong"});
        console.error(err);
      });
});

app.get("/debt", (req, res)=>{
  adm.firestore().collection("reports").orderBy("createdAt", "desc")
      .get()
      .then((doc)=>{
        const reports={};
        doc.forEach((data)=>{
          console.debug(reports);
          const count=data.data().paidFor.length+1;
          const amari= data.data().price % count;
          // arrayの個数カウント＋１
          const base_price=(data.data().price-amari)/count;
          // 金額を個数で割る
          if (data.data().paidBy in reports) {
            reports[data.data().paidBy] += (base_price*(count -1 )+amari);
          } else {
            reports[data.data().paidBy] = base_price*(count-1)+amari;
          }
          data.data().paidFor.forEach((user)=>{
            if (user in reports) {
              reports[user] -= (base_price);
            } else {
              reports[user] = 0- base_price;
            }
          });
        });
        return res.json(reports);
      }).catch((err)=>{
        res.status(500).json({error: "something went wrong"});
        console.error(err);
      });
});

app.delete("/reports", (req, res)=>{
  adm.firestore().collection("reports").listDocuments().then((doc)=>{
    doc.map((doc)=>{
      doc.delete();
    });
    res.json({message: "deleted documents successfully"});
  }).catch((err)=>{
    res.status(500).json({error: "something went wrong"});
    console.error(err);
  });
});
app.use("/v1", api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);
// app.use('/api-doc/',)
exports.api = functions.region("asia-northeast1").https.onRequest(app);
