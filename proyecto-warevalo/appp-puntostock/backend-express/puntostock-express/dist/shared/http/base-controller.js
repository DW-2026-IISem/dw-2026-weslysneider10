"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
const app_error_1 = require("../errors/app-error");
const error_response_1 = require("./error-response");
/**
 * Base de los controllers HTTP.
 *
 * Aísla las tres responsabilidades puramente HTTP que, si no, se repetirían
 * en cada método de cada controller:
 *  - run:         ejecuta el cuerpo del handler y traduce el error a HTTP.
 *  - paramId:     lee y valida el :id de la URL.
 *  - handleError: mapea AppError a su status y lo demás a 500.
 *
 * La capa de negocio (service) no conoce req/res.
 */
class BaseController {
    async run(res, work) {
        try {
            await work();
        }
        catch (error) {
            this.handleError(res, error);
        }
    }
    paramId(req) {
        const raw = req.params.id;
        const value = Array.isArray(raw) ? raw[0] : raw;
        if (!value || !/^\d+$/.test(value) || Number(value) < 1) {
            throw new app_error_1.AppError(400, "Invalid id: must be a positive integer");
        }
        return Number(value);
    }
    /**
     * Mapea errores: AppError -> su status; cualquier otro -> 500.
     *
     * La traducción vive en sendError porque los middlewares de acceso
     * también la necesitan: un único punto decide el mapeo error -> HTTP.
     */
    handleError(res, error) {
        (0, error_response_1.sendError)(res, error);
    }
}
exports.BaseController = BaseController;
//# sourceMappingURL=base-controller.js.map