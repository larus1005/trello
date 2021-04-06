import { IsNotEmpty, IsNumberString, MaxLength, Min, ValidateIf} from 'class-validator'
import {BoardListCard as BoardListCardModel} from '../models/BoardListCard'
import Boom from '@hapi/Boom'


export class GetCardsQuery{
    @IsNumberString()
    boardListId: number
}
export class PostAddCardBody{
    @Min(1,{
        message:'boardListId不能为空且必须大于1'
    })
    boardListId: number
    @IsNotEmpty()
    @MaxLength(255,{
        message:'卡片名称不能大于255字符'
    })
    name:string
    @ValidateIf(o=>o.description!==undefined)
    @MaxLength(2000,{
        message:'卡片描述不能大于2000字符'
    })
    description:string
}
export class PutUpdateCardBody{
    @ValidateIf(o=>o.boardListId!==undefined)
    @Min(1,{
        message:'boardListId不能为空且必须大于1'
    })
    boardListId?: number
    @ValidateIf(o=>o.name!==undefined)
    @MaxLength(255,{
        message:'卡片名称不能大于255字符'
    })
    name?:string
    @ValidateIf(o=>o.description!==undefined)
    @MaxLength(2000,{
        message:'卡片描述不能大于2000字符'
    })
    description?:string
    @ValidateIf(o=>o.order!==undefined)
    @IsNumberString()
    order?:number
}
export async function getAndValidateBoardListCard(id: number, userId: number): Promise<BoardListCardModel> {
    let card = await BoardListCardModel.findByPk(id);

    if (!card) {
        throw Boom.notFound('指定卡片不存在');
    }

    if (card.userId !== userId) {
        throw Boom.forbidden('禁止访问该卡片');
    }

    return card;
}