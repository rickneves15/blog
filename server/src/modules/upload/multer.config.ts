import { diskStorage } from 'multer'
import * as path from 'node:path'
import { v4 as uuidv4 } from 'uuid'

export const DESTINATION_UPLOAD = `${process.cwd()}/uploads`

type validMimeType = 'image/png' | 'image/jpg' | 'image/jpeg'

const validMimeTypes: validMimeType[] = ['image/png', 'image/jpg', 'image/jpeg']

export const multerConfig = {
  storage: diskStorage({
    destination: DESTINATION_UPLOAD,
    filename: (_, file, cb) => {
      const fileName =
        path.parse(file.originalname).name.replace(/\s/g, '') + '-' + uuidv4()

      const extension = path.parse(file.originalname).ext
      cb(null, `${fileName}${extension}`)
    },
  }),

  fileFilter: (_, file, cb) => {
    const allowedMimeTypes: validMimeType[] = validMimeTypes
    allowedMimeTypes.includes(file.mimetype) ? cb(null, true) : cb(null, false)
  },
}
