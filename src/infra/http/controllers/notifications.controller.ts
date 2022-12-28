import { Body, Controller, Post } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { SendNotification } from 'src/app/use-cases/send-notification';
import { CreateNotificationBody } from '../dto/create-notification-body';

@Controller('notifications')
export class NotificationsController {
  constructor(private sendNotification: SendNotification) {}

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
