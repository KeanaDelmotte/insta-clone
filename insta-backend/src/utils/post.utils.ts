import { BadRequestException } from '@nestjs/common';

export const imageFileFilter = (req, file, callback) => {
  if (
    !file.originalname.match(
      /\.(jpg|jpeg|png|gif|mov|avi|wmv|flv|3gp|mp4|jfif|mpg)$/,
    )
  ) {
    return callback(
      new BadRequestException(
        'Only image and video files allowed. Try uploading a file that ends in: jpg, jpeg, png, gif, mov, avi, wmw, flv, 3gp, mp4 or mpg',
      ),
      false,
    );
  }

  callback(null, true);
};

export const customFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = file.originalname.split('.')[1];

  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${name}-${randomName}.${fileExtName}`);
};
