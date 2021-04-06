import { 
    IsNumberString,
    Min, ValidateIf,
    IsNumber, 
   IsNotEmpty,
    validate,IS_NOT_EMPTY,isNotEmptyObject} from 'class-validator'
import { BoardList as BoardListModel } from '../models/BoardList'
import Boom from '@hapi/boom'
export class PostAddListBody{
    @Min(1,{
        message:'面板ID不能为空且为正数'
    })
    boardId: number;
    @IsNotEmpty({
        message:'列表名称不能为空'
    })
    name:string
}
export class GetListQuery{
    @IsNumberString()
    boardId: number;

}
export class PutUpdateListBody{
    @ValidateIf(o=>o.boardId !== undefined)
    @Min(1,{
        message:'面板ID不能为空且为正数'
    })
    boardId: number;
    @ValidateIf(o=>o.name !== undefined)
    @IsNotEmpty({
        message:'列表名称不能为空'
    })
    name:string
    @ValidateIf(o=>o.order !== undefined)
    @IsNumber({},{
        message:'列表名称不能为空'
    })
    order:number
}
export async function getAndValidateBoardList(id: number, userId: number): Promise<BoardListModel> {
    let list = await BoardListModel.findByPk(id);

    if (!list) {
        throw Boom.notFound('指定列表不存在');
    }

    if (list.userId !== userId) {
        throw Boom.forbidden('禁止访问该列表');
    }

    return list;
}