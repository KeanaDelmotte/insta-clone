"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customFileName = exports.imageFileFilter = void 0;
const common_1 = require("@nestjs/common");
exports.imageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|mov|avi|wmv|flv|3gp|mp4|mpg)$/)) {
        return callback(new common_1.BadRequestException('Only image and video files allowed. Try uploading a file that ends in: jpg, jpeg, png, gif, mov, avi, wmw, flv, 3gp, mp4 or mpg'), false);
    }
    callback(null, true);
};
exports.customFileName = (req, file, callback) => {
    const name = file.originalname.split('.')[0];
    const fileExtName = file.originalname.split('.')[1];
    const randomName = Array(4)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
    callback(null, `${name}-${randomName}.${fileExtName}`);
};
//# sourceMappingURL=post.utils.js.map