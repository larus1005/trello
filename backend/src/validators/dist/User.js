"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoginBody = exports.RegisterBody = void 0;
var class_validator_1 = require("class-validator");
var CustomValidationDecorartors_1 = require("./CustomValidationDecorartors");
var UserBody = /** @class */ (function () {
    function UserBody() {
    }
    __decorate([
        class_validator_1.Length(1, 50, {
            message: '用户名不能为空，或大于50字符'
        })
    ], UserBody.prototype, "name");
    __decorate([
        class_validator_1.IsNotEmpty({
            message: '面板名称不能为空'
        })
    ], UserBody.prototype, "password");
    return UserBody;
}());
var RegisterBody = /** @class */ (function (_super) {
    __extends(RegisterBody, _super);
    function RegisterBody() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        CustomValidationDecorartors_1.IsSameValue('password', {
            message: "两次输入密码必须相同"
        })
    ], RegisterBody.prototype, "rePassword");
    return RegisterBody;
}(UserBody));
exports.RegisterBody = RegisterBody;
var LoginBody = /** @class */ (function (_super) {
    __extends(LoginBody, _super);
    function LoginBody() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return LoginBody;
}(UserBody));
exports.LoginBody = LoginBody;
