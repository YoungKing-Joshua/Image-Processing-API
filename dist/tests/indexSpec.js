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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const __1 = __importDefault(require(".."));
const request = (0, supertest_1.default)(__1.default).get;
describe('Evaluate endpoints output', () => {
    describe('endpoint: /', () => {
        it('gets /', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request('/');
            expect(response.status).toBe(200);
        }));
    });
    describe('endpoint: /api/imageprocess', () => {
        it('gets /api/imageprocess?filename=fjord (valid args)', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request('/api/imageprocess?filename=fjord');
            expect(response.status).toBe(200);
        }));
        it('gets /api/imageprocess?filename=fjord&width=199&height=199 (valid args)', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request('/api/imageprocess?filename=fjord&width=199&height=199');
            expect(response.status).toBe(200);
        }));
        it('gets /api/imageprocess?filename=fjord&width=-200&height=200 (invalid args)', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request('/api/imageprocess?filename=fjord&width=-200&height=200');
            expect(response.status).toBe(200);
        }));
        it('gets /api/imageprocess (no arguments)', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request('/api/imageprocess');
            expect(response.status).toBe(200);
        }));
    });
    describe('endpoint: /tot', () => {
        it('returns 404 for invalid endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request('/tot');
            expect(response.status).toBe(404);
        }));
    });
});
