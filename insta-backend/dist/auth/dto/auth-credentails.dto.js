"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthCredentialsDto = void 0;
const class_validator_1 = require("class-validator");
class AuthCredentialsDto {
}
__decorate([
    class_validator_1.IsString(),
    class_validator_1.MinLength(4),
    class_validator_1.MaxLength(20),
    __metadata("design:type", String)
], AuthCredentialsDto.prototype, "username", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.MinLength(8),
    class_validator_1.MaxLength(100),
    class_validator_1.Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'password too weak. must include at least one capital letter, one lower case letter and one special charachter or number and be equal to or longer than 8 characters to 100 characters',
    }),
    __metadata("design:type", String)
], AuthCredentialsDto.prototype, "password", void 0);
exports.AuthCredentialsDto = AuthCredentialsDto;
//# sourceMappingURL=auth-credentails.dto.js.map