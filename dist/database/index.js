"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _sequelize = _interopRequireDefault(require("sequelize"));
var _database = _interopRequireDefault(require("../config/database"));
var _Alunos = _interopRequireDefault(require("../models/Alunos"));
var _User = _interopRequireDefault(require("../models/User"));
var _Fotos = _interopRequireDefault(require("../models/Fotos"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// Nosso model

var models = [_Alunos["default"], _User["default"], _Fotos["default"]]; // Array contendo todos nossos models.

var connection = new _sequelize["default"](_database["default"]); // Nossa conexão

models.forEach(function (model) {
  return model.init(connection);
});
models.forEach(function (model) {
  return model.associate && model.associate(connection.models);
});
var _default = exports["default"] = connection;