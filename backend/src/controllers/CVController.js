"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CVController = void 0;
const typeorm_1 = require("typeorm");
const CV_1 = require("../entities/CV");
class CVController {
    createCV(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const cvRepository = (0, typeorm_1.getRepository)(CV_1.CV);
            const newCV = cvRepository.create(req.body);
            yield cvRepository.save(newCV);
            return res.json(newCV);
        });
    }
    getCV(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const cvRepository = (0, typeorm_1.getRepository)(CV_1.CV);
            const cvs = yield cvRepository.find();
            return res.json(cvs);
        });
    }
}
exports.CVController = CVController;
