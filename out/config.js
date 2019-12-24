"use strict";
//FIXME REVERT PREFIX AND DB SETTINGS BACK TO DEFAULT BEFORE UPLOADING
Object.defineProperty(exports, "__esModule", { value: true });
exports.prefix = ".";
var dev_token = "NTk2MTA3NjEyODE5NTU0MzA1.XcHipg.Z1cfJe50Jri3aRygD5CXwwc8PSI";
var mikaela_token = "NTg1ODc0MzM3NjE4NDYwNjcy.XcYrHw.mw0EsNQAAZ3KkZfWXLSSvF9UBso";
exports.token = mikaela_token;
exports.youTubeKey = "AIzaSyAQBRTOfd9yTAL6uP-9wab_h3GnuUklk-g";
exports.coders_club_id = "585850878532124672";
exports.perms = [
    {
        name: "admin", users: [
            "177016697117474816"
        ]
    }
];
//Mongodb Config    
var user = "mikaela";
var pass = "7Xh9T0KUGjgHmi6b";
var prodDB = "mongodb+srv://" + user + ":" + pass + "@cluster0-jcxl4.gcp.mongodb.net/mikaela";
var testDB = "mongodb://127.0.0.1:27017/local";
exports.dbURI = prodDB;
