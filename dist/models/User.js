"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);
var _database = require('../config/database');

 class User extends _sequelize.Model {
  static init(sequelize) {
    super.init({

      nome: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 255],
            msg: 'Campo nome deve ter entre 3 e 255 caracteres.',
          },
        },
      },

      email: {
        type: _sequelize2.default.STRING,
        defaultValue: '',
        unique: {
          msg: 'E-mail já existente em nosso servidor, por favor tente outro.',
        },
        validate: {
          isEmail: {
            msg: 'E-mail inválido.',
          },
        },
      },

      password_hash: { // Esse campo n/ precisa ser validado, pq o user n/ vai enviar ele
        type: _sequelize2.default.STRING,
        defaultValue: '',
      },

      password: {
        type: _sequelize2.default.VIRTUAL,
        defaultValue: '',
        validate: {
          len: {
            args: [6, 50],
            msg: 'Campo senha precisa ter entre 6 e 50 caracteres.',
          },
        },
      }, // esse campo não existe no Banco de dados
    }, { sequelize });

    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await _bcryptjs2.default.hash(user.password, 8);
      }
    });

    return this;
  }

  passwordIsValid(sentPassword) {
    return _bcryptjs2.default.compare(sentPassword, this.password_hash); // Isso retorna uma promise
    // Vamos checar essa promise no controller
  }
} exports.default = User;
