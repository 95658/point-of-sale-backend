import { BadRequestException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { diskStorage } from 'multer';

export const uploadsDirectory = join(process.cwd(), 'uploads');
export const uploadsRoute = '/uploads/';

const imageExtensions: Record<string, string> = {
  'image/avif': '.avif',
  'image/gif': '.gif',
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
};

export const imageUploadOptions = {
  storage: diskStorage({
    destination: (_request, _file, callback) => {
      void mkdir(uploadsDirectory, { recursive: true })
        .then(() => callback(null, uploadsDirectory))
        .catch((error: Error) => callback(error, uploadsDirectory));
    },
    filename: (_request, file, callback) => {
      callback(null, `${randomUUID()}${imageExtensions[file.mimetype]}`);
    },
  }),
  fileFilter: (
    _request: unknown,
    file: Express.Multer.File,
    callback: (error: Error | null, acceptFile: boolean) => void,
  ) => {
    if (!imageExtensions[file.mimetype]) {
      callback(new BadRequestException('Only AVIF, GIF, JPEG, PNG, and WebP images are allowed'), false);
      return;
    }

    callback(null, true);
  },
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 1,
  },
};
