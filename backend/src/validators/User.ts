import { IsNotEmpty, Length } from 'class-validator'
import {IsSameValue} from './CustomValidationDecorartors'
class UserBody{
    @Length(1,50,{
        message:'用户名不能为空，或大于50字符'
    })
    name:string;
    @IsNotEmpty({
        message: '面板名称不能为空'
    })
    password:string;
}
export class RegisterBody extends UserBody{
    // // 需要和password进行比较，必须相同
    // 自定义验证装饰器，自行实现
    @IsSameValue('password',{
        message:"两次输入密码必须相同"
    })
    rePassword:string;
}
export class LoginBody extends UserBody{
    
}