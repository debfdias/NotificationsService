import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notification-repository';
import { Notification } from '../entities/notification';

interface GetRecipientNotificationRequest {
  recipientId: string;
}

interface GetRecipientNotificationResponse {
  notifications: Notification;
}

@Injectable()
export class GetRecipientNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}
  async execute(
    request: GetRecipientNotificationRequest,
  ): Promise<GetRecipientNotificationResponse> {
    const { recipientId } = request;

    const notifications =
      await this.notificationsRepository.getNotficationsByRecipient(
        recipientId,
      );

    return { notifications };
  }
}
