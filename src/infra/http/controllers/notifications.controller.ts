import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CancelNotification } from 'src/app/use-cases/cancel-notification';
import { CountRecipientNotification } from 'src/app/use-cases/count-notifications';
import { GetRecipientNotification } from 'src/app/use-cases/get-recipient-notifications';
import { ReadNotification } from 'src/app/use-cases/read-notification';
import { SendNotification } from 'src/app/use-cases/send-notification';
import { UnreadNotification } from 'src/app/use-cases/unread-notification';
import { CreateNotificationBody } from '../dto/create-notification-body';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
    private getNotificationRecipient: GetRecipientNotification,
    private countNotificationRecipient: CountRecipientNotification,
  ) {}

  @Patch(':id/unread')
  async unred(@Param('id') id: string) {
    await this.unreadNotification.execute({
      notificationId: id,
    });
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotification.execute({
      notificationId: id,
    });
  }

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({
      notificationId: id,
    });
  }

  @Get('list/:recipientId')
  async getFromRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.getNotificationRecipient.execute({
      recipientId,
    });

    return { notifications };
  }

  @Get('count/:recipientId')
  async countFromRecipient(@Param('recipientId') recipientId: string) {
    const { count } = await this.countNotificationRecipient.execute({
      recipientId,
    });

    return { count };
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body;

    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category,
    });

    return {
      notification: {
        id: randomUUID(),
        content: notification.content.value,
        category: notification.category,
        recipientId: notification.recipientId,
      },
    };
  }
}
