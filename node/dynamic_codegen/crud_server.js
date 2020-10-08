/*
 *
 * Copyright 2015 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

var PROTO_PATH = __dirname + '/../../protos/crud.proto';

var grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
  PROTO_PATH,
  {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
  });
var crud_database = grpc.loadPackageDefinition(packageDefinition).CrudDatabase;

//connect to mysql
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_kemahasiswaan"
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

/**
 * Implements the SayHello RPC method.
 */
function getData(call, callback) {

  let nim = call.request.nim;
  var data = "NIM tidak ditemukan";
  let query = "SELECT name FROM atlantis where nim=" + nim;

  con.query(query, function (err, result, fields) {
    if (err) throw err;
    var string = JSON.stringify(result);
    console.log(string);
    callback(null, { message: string });
  });
}

/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
function main() {
  var server = new grpc.Server();

  server.addService(crud_database.CrudDatabase.service, {
    getData: getData,
  });

  server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
  server.start();
}

main();
