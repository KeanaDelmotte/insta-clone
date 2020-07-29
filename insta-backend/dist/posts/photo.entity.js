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
exports.Photo = void 0;
const typeorm_1 = require("typeorm");
const post_entity_1 = require("./post.entity");
const class_transformer_1 = require("class-transformer");
let Photo = class Photo extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Photo.prototype, "url", void 0);
__decorate([
    class_transformer_1.Exclude(),
    typeorm_1.ManyToOne(type => post_entity_1.Post, post => post.photos, { onDelete: 'CASCADE' }),
    __metadata("design:type", post_entity_1.Post)
], Photo.prototype, "post", void 0);
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Photo.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Photo.prototype, "filename", void 0);
Photo = __decorate([
    typeorm_1.Entity()
], Photo);
exports.Photo = Photo;
//# sourceMappingURL=photo.entity.js.map