"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

exports.__esModule = true;
exports.RegisterBody = void 0;

var class_validator_1 = require("class-validator");

var CustomValidationDecorartors_1 = require("./CustomValidationDecorartors");

var RegisterBody =
/** @class */
function () {
  function RegisterBody() {}

  __decorate([class_validator_1.Length(1, 50, {
    message: '用户名不能为空，或大于50字符'
  })], RegisterBody.prototype, "name");

  __decorate([class_validator_1.IsNotEmpty({
    message: '密码不能为空'
  })], RegisterBody.prototype, "password");

  __decorate([CustomValidationDecorartors_1.IsSameValue('password', {
    message: "两次输入密码必须相同"
  })], RegisterBody.prototype, "rePassword");

  return RegisterBody;
}();

exports.RegisterBody = RegisterBody;