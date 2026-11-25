"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const password_hasher_interface_js_1 = require("./hashing/password-hasher.interface.js");
const bcrypt_password_hasher_service_js_1 = require("./hashing/bcrypt-password-hasher.service.js");
const token_interface_js_1 = require("./tokens/token.interface.js");
const token_service_js_1 = require("./tokens/token.service.js");
let SecurityModule = class SecurityModule {
};
exports.SecurityModule = SecurityModule;
exports.SecurityModule = SecurityModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                inject: [config_1.ConfigService],
                useFactory: (configService) => ({
                    secret: configService.get('environment.jwt.secret') ?? '',
                    signOptions: {
                        expiresIn: (configService.get('environment.jwt.expiresIn') ?? '1d'),
                    },
                }),
            }),
        ],
        providers: [
            bcrypt_password_hasher_service_js_1.BcryptPasswordHasherService,
            {
                provide: password_hasher_interface_js_1.PASSWORD_HASHER,
                useExisting: bcrypt_password_hasher_service_js_1.BcryptPasswordHasherService,
            },
            token_service_js_1.TokenService,
            {
                provide: token_interface_js_1.TOKEN_SERVICE,
                useExisting: token_service_js_1.TokenService,
            },
        ],
        exports: [
            jwt_1.JwtModule,
            bcrypt_password_hasher_service_js_1.BcryptPasswordHasherService,
            password_hasher_interface_js_1.PASSWORD_HASHER,
            token_service_js_1.TokenService,
            token_interface_js_1.TOKEN_SERVICE,
        ],
    })
], SecurityModule);
//# sourceMappingURL=security.module.js.map