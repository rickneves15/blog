import { Injectable } from '@nestjs/common'
import { Request } from 'express'

import { PrismaService } from '@/lib/database/prisma.service'

@Injectable()
export class UploadService {
  constructor(private readonly prisma: PrismaService) {}

  async send(file: Express.Multer.File, req: Request) {
    return await this.prisma.file.create({
      data: {
        name: file.filename,
        contentLength: file.size,
        contentType: file.mimetype,
        url: `${req.protocol}://${req.get('host')}/uploads/${file.filename}`,
      },
    })
  }
}
