import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ItemsService {
  constructor(private prisma: PrismaService) {}

  // Fetch all items
  async findAll() {
    return this.prisma.item.findMany();
  }

  // Create a new item with quantity
  async create(data: { name: string; price: number; quantity: number }) {
    return this.prisma.item.create({
      data,
    });
  }

  // Update item by ID
  async update(id: number, data: { name?: string; price?: number; quantity?: number }) {
    try {
      return await this.prisma.item.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw new Error(`Item with ID ${id} not found.`);
    }
  }

  // Delete item by ID
  async delete(id: number) {
    try {
      return await this.prisma.item.delete({
        where: { id },
      });
    } catch (error) {
      throw new Error(`Item with ID ${id} not found.`);
    }
  }
}
