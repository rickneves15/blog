import { diskStorage } from 'multer'
import * as path from 'node:path'
import { v4 as uuidv4 } from 'uuid'

export const DESTINATION_UPLOAD = `${process.cwd()}/uploads`

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
}
