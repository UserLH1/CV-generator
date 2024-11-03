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
const express_1 = require("express");
const CVController_1 = require("../controllers/CVController");
const router = (0, express_1.Router)();
const cvController = new CVController_1.CVController();
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield cvController.createCV(req, res);
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
}));
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield cvController.getCV(req, res);
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
}));
exports.default = router;
