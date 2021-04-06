import {
    Controller,
    Ctx,
    Post,
    Get,
    Put,
    Delete,
    Flow,
    Params,
    Query,
    Body
} from 'koa-ts-controllers'
import authorization from '../middlewares/authorization'
import { Context } from 'koa'
import { getAndValidateBoardList } from '../validators/BoardList'
import { PostAddCardBody, GetCardsQuery, PutUpdateCardBody, getAndValidateBoardListCard } from '../validators/BoardListCard'
import { BoardListCard as BoardListCardModel } from '../models/BoardListCard'
import { Comment as CommentModel } from '../models/Comment'
import { CardAttachment as CardAttachmentModel } from '../models/CardAttachment'
import { Attachment as AttachmentModel } from '../models/Attachment'
import configs from '../configs'
@Controller('/card')
@Flow([authorization])
export class BoardListCardController {
    // 创建新卡片
    @Post('')
    public async addCard(
        @Ctx() ctx: Context,
        @Body() body: PostAddCardBody
    ) {
        let { boardListId, name, description } = body
        getAndValidateBoardList(boardListId, ctx.userInfo.id)
        let BoardListCard = new BoardListCardModel()
        BoardListCard.userId = ctx.userInfo.id
        BoardListCard.boardListId = boardListId
        BoardListCard.name = name
        BoardListCard.description = description || ''
        await BoardListCard.save();

        ctx.status = 201;
        return BoardListCard;

    }
    // 获取指定列表下的卡片集合
    @Get('')
    public async getCards(
        @Ctx() ctx: Context,
        @Query() query: GetCardsQuery
    ) {
        let { boardListId } = query
        await getAndValidateBoardList(boardListId, ctx.userInfo.id)
        let boardListCards = await BoardListCardModel.findAll({
            where: {
                boardListId
            },
            order: [['id', 'asc']],
            // 连表查询-ORM,关联另外一张表的信息
            include: [
                {
                    model: CommentModel,
                    attributes: ['id']
                },
                {
                    // 中间件
                    model: CardAttachmentModel,
                    include: [
                        { model: AttachmentModel }
                    ]

                }
            ]

        })
        let boardListCardsData = boardListCards.map((card: BoardListCardModel) => {
            // 处理附件的路径和封面
            let coverPath = ''
            let attachment = card.attachments.map(attachment => {
                let data = attachment.toJSON() as CardAttachmentModel &{path:string}
                // 
                data.path = configs.storage.prefix + '/' + data.detail.name
                if(data.isCover){
                    coverPath = data.path
                }
                return data
            })
            return {
                id: card.id,
                userId: card.userId,
                boardListId: card.boardListId,
                name: card.name,
                description: card.description,
                order: card.order,
                createdAt: card.createdAt,
                updatedAt: card.updatedAt,
                attachment: attachment,
                coverPath: coverPath,
                commentCount: card.comments.length

            }
        })
        return boardListCardsData
    }
// 获取一个卡片信息
@Get('/:id(\\d+)')
public async getCard(
        @Ctx() ctx: Context,
        @Params('id') id: number
    ) {
    let boardListCard = await getAndValidateBoardListCard(id, ctx.userInfo.id)
    return boardListCard
}
// 更新一个卡片信息
@Put('/:id(\\d+)')
public async putCard(
        @Ctx() ctx: Context,
        @Params('id') id: number,
        @Body() body: PutUpdateCardBody
    ) {
    let { boardListId, name, description, order } = body
    let boardListCard = await getAndValidateBoardListCard(id, ctx.userInfo.id)
    boardListCard.boardListId = boardListId || boardListCard.boardListId
    boardListCard.name = name || boardListCard.name
    boardListCard.description = description || boardListCard.description
    boardListCard.order = order || boardListCard.order

    await boardListCard.save()
    ctx.status = 204
    return boardListCard


}
// 删除一个卡片信息
@Delete('/:id(\\d+)')
public async delectCard(
        @Ctx() ctx: Context,
        @Params('id') id: number
    ) {
    let boardListCard = await getAndValidateBoardListCard(id, ctx.userInfo.id)
    await boardListCard.destroy()
    ctx.status = 204
    return


}

}
