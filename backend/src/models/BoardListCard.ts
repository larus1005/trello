import {
    AutoIncrement,
    Column,
    CreatedAt,
    DataType,
    ForeignKey, HasMany,
    Model,
    PrimaryKey,
    Table,
    UpdatedAt
} from "sequelize-typescript";
import {BoardList} from "./BoardList";
import {User} from "./User";
import {CardAttachment} from "./CardAttachment";
import {Comment} from "./Comment";

@Table({
    tableName: 'BoardListCard'
})
export class BoardListCard extends Model<BoardListCard> {

    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER.UNSIGNED,
        allowNull: false
    })
    userId: number;
    // 表与表之间的关联关系
    @ForeignKey(() => BoardList)
    @Column({
        type: DataType.INTEGER.UNSIGNED,
        allowNull: false
    })
    boardListId: number;

    @Column({
        type: DataType.STRING(255),
        allowNull: false
    })
    name: string;

    @Column({
        type: DataType.STRING(2000),
        allowNull: false,
        defaultValue: ''
    })
    description: string;

    @Column({
        type: DataType.FLOAT,
        allowNull: false,
        defaultValue: 0
    })
    order: number;
    // Boardlistcard数据库中不存在
    @HasMany(() => CardAttachment)
    attachments: CardAttachment[];

    @HasMany(() => Comment)
    comments: Comment[];

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;

}