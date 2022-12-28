import { Notification } from '../entities/notification';

export abstract class NotificationsRepository {
  abstract create(notification: Notification): Promise<void>;
  abstract findById(notificationId: string): Promise<Notification> | null;
  abstract save(notification: Notification): Promise<void>;
  abstract countNotficationsByRecipient(recipientId: string): Promise<number>;
  abstract getNotficationsByRecipient(
    recipientId: string,
  ): Promise<Notification> | null;
}
