"use strict";
exports.__esModule = true;
exports.IsSameValue = void 0;
var class_validator_1 = require("class-validator");
function IsSameValue(property, validationOptions) {
    return function (target, propertyName) {
        class_validator_1.registerDecorator({
            name: 'isSameValue',
            target: target.constructor,
            propertyName: propertyName,
            constraints: [property],
            options: validationOptions,
            validator: {
                validate: function (value, validationArguments) {
                    // 第一个参数指定的属性对应的值
                    var relatedValue = validationArguments && validationArguments.object[property];
                    // value：是当前装饰器属性对应的值
                    return relatedValue === value;
                }
            }
        });
    };
}
exports.IsSameValue = IsSameValue;
