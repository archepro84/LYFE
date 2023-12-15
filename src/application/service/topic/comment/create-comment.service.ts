import { Transactional } from '@infrastructure/common/decorator/transactional.decorator';
import { CreateCommentUsecase } from '@application/port/in/topic/comment/usecase/create-comment.usecase';
import { CreateCommentCommand } from '@application/port/in/topic/comment/command/create-comment.command';
import { TopicRepository } from '@application/port/out/topic/topic.repository';
import { CommentRepository } from '@application/port/out/topic/comment/comment.repository';
import { NotFoundException } from '@domain/common/exception/not-found.exception';
import { User } from '@domain/user/user';
import { TopicUser } from '@domain/topic/topic-user';
import { Comment, CommentFactory } from '@domain/topic/comment/comment';
import { CreateReplyUsecase } from '@application/port/in/topic/comment/usecase/create-reply.usecase';
import { CreateReplyCommand } from '@application/port/in/topic/comment/command/create-reply.command';

export class CreateCommentService implements CreateCommentUsecase {
  constructor(
    private readonly topicRepository: TopicRepository,
    private readonly commentRepository: CommentRepository,
    private readonly createReplyUsecase: CreateReplyUsecase,
  ) {}

  @Transactional()
  async exec(command: CreateCommentCommand): Promise<void> {
    const isExistTopic = await this.topicRepository.findById(command.topicId);
    if (!isExistTopic)
      throw new NotFoundException('해당하는 게시글을 찾을 수 없습니다.');
    if (command.parentId)
      return await this.createReplyUsecase.exec(command as CreateReplyCommand);

    return await this.commentRepository.insert(
      this.createCommentCommand(command),
    );
  }

  private createCommentCommand(command: CreateCommentCommand): Comment {
    return CommentFactory.newInstance({
      ...command,
      user: this.createTopicUserByCommand(command.user),
    });
  }

  private createTopicUserByCommand(user: User): TopicUser {
    return new TopicUser({
      id: user.id,
      nickname: user.getNickname(),
    });
  }
}
