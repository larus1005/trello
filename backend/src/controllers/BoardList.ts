import {
    Controller,
    Ctx,
    Post,
    Get,
    Put,
    Delete,
    Flow,
    Params,
    Body,
    Query
} from 'koa-ts-controllers';
import { Context } from 'koa';
import authorization from '../middlewares/authorization'
import { PostAddListBody, GetListQuery, PutUpdateListBody, getAndValidateBoardList } from '../validators/BoardList'
import { BoardList as BoardListModel } from '../models/BoardList'
import { getAndValidateBoard } from '../validators/Board'

@Controller('/list')
@Flow([authorization])
export class BoardlistController {
    // 创建列表
    @Post('')
    public async addList(
        @Ctx() ctx: Context,
        @Body() body: PostAddListBody
    ) {
        let { boardId, name } = body
        await getAndValidateBoard(boardId, ctx.userInfo.id)
        // 获取列表order值最大的一个,并将列表降序排列
        let maxOrderBoardList = await BoardListModel.findOne({
            where:{
                boardId
            },
            order:[['order','desc']]
        })
        let boardlist = new BoardListModel()
        boardlist.userId = ctx.userInfo.id
        boardlist.name = name
        boardlist.boardId = boardId
        boardlist.order =maxOrderBoardList?maxOrderBoardList.order+65535:65535
        await boardlist.save()
        ctx.status = 201
        return boardlist
    }
    // 获取当前用户指定看板下的列表集合,list？boardId
    @Get('')
    public async getLists(
        @Ctx() ctx: Context,
        @Query() query: GetListQuery
    ) {
        let { boardId } = query
        await getAndValidateBoard(boardId, ctx.userInfo.id)
        let boardlist = await BoardListModel.findAll({
            where: {
                boardId
            },
            // order值越小，升序
            order: [['order', 'asc']]
        })
        return boardlist
    }
    // 获取指定的列表详情 list/:id
    @Get('/:id(\\d+)')
    public async getList(
        @Ctx() ctx: Context,
        @Params('id') id: number
    ) {
        let boardlist = await getAndValidateBoardList(id, ctx.userInfo.id)
        return boardlist;
    }
    // 更新列表
    @Put('/:id(\\d+)')
    public async updateList(
        @Ctx() ctx: Context,
        @Params('id') id: number,
        @Body() body: PutUpdateListBody
    ) {
        let { boardId, name, order } = body
        let boardlist = await getAndValidateBoardList(id, ctx.userInfo.id)
        boardlist.boardId = boardId || boardlist.boardId
        boardlist.name = name || boardlist.name
        boardlist.order = order || boardlist.order
        await boardlist.save()
        ctx.status = 204
        return
    }
    // 删除列表
    @Delete('/:id(\\d+)')
    public async deleteList(
        @Ctx() ctx: Context,
        @Params('id') id: number
    ) {

        let boardList = await getAndValidateBoardList(id, ctx.userInfo.id);

        boardList.destroy();
        ctx.status = 204;
        return;

    }
}
