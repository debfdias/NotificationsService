import { Notification } from '../../../../app/entities/notification';
import { NotificationsRepository } from '../../../../app/repositories/notification-repository';
import { PrismaService } from '../prisma.service';
import { randomUUID } from 'crypto';
import { Injectable } from '@nestjs/common';
import { Content } from 'src/app/entities/content';

@Injectable()
export class PrismaNotificationRepository implements NotificationsRepository {
  constructor(private prismaService: PrismaService) {}

  async getNotficationsByRecipient(recipientId: string): Promise<any> {
    const notifications = await this.prismaService.notification.findMany({
      where: {
        recipientId,
      },
    });

    return notifications;
  }

  async countNotficationsByRecipient(recipientId: string): Promise<number> {
    const count = await this.prismaService.notification.count({
      where: { recipientId },
    });

    return count;
  }

  async findById(notificationId: string): Promise<Notification> {
    const notification = await this.prismaService.notification.findUnique({
      where: {
        id: notificationId,
      },
    });

    return new Notification(
      {
        category: notification.category,
        content: new Content(notification.content),
        recipientId: notification.recipientId,
        readAt: notification.readAt,
        canceledAt: notification.canceledAt,
        createdAt: notification.cratedAt,
      },
      notification.id,
    );
  }

  async save(notification: Notification): Promise<void> {
    await this.prismaService.notification.update({
      where: {
        id: notification._id,
      },
      data: {
        category: notification.category,
        recipientId: notification.recipientId,
        readAt: notification.readAt,
        canceledAt: notification.canceledAt,
        cratedAt: notification.createdAt,
      },
    });
  }

  async create(notification: Notification): Promise<void> {
    await this.prismaService.notification.create({
      data: {
        id: randomUUID(),
        recipientId: notification.recipientId,
        category: notification.category,
        content: notification.content.value,
        readAt: notification.readAt,
        cratedAt: notification.createdAt,
      },
    });
  }
}
