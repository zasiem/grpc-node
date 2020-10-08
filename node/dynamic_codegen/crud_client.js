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

function main() {
  var client = new crud_database.CrudDatabase('localhost:50051',
    grpc.credentials.createInsecure());

  if (process.argv.length >= 3) {
    nim = process.argv[2];
  } else {
    nim = 1
  }

  client.getData({ nim: nim }, function (err, response) {
    let json = JSON.parse(response.message);
    if (json[0] == null){
      console.log('Mahasiswa Tidak Ditemukan');
    }else{
      console.log('Mahasiswa: ', json[0].name);
    }
    
  });

}

main();
