"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const area_1 = __importDefault(require("./area")); // Ajusta la ruta a tus modelos
const personal_1 = __importDefault(require("./personal"));
class PersonalModel {
    async getAll({ limit, offset = 0, input, estado, area, orderBy = "id", orderDirection = "ASC", }) {
        const where = {};
        if (input) {
            where[sequelize_1.Op.or] = [
                { nombre: { [sequelize_1.Op.like]: `%${input}%` } },
                { apellido: { [sequelize_1.Op.like]: `%${input}%` } },
                { telefono: { [sequelize_1.Op.like]: `%${input}%` } },
                { cargo: { [sequelize_1.Op.like]: `%${input}%` } },
            ];
        }
        if (estado !== undefined) {
            where.estado = estado;
        }
        if (area !== undefined) {
            where.area = area;
        }
        const { count, rows } = await personal_1.default.findAndCountAll({
            where,
            include: [
                {
                    model: area_1.default,
                    attributes: ["id", "title"],
                },
            ],
            order: [[orderBy, orderDirection]],
            limit,
            offset,
        });
        const modifiedRows = rows.map((row) => {
            var _a, _b;
            return (Object.assign(Object.assign({}, row.toJSON()), { area: ((_a = row.Area) === null || _a === void 0 ? void 0 : _a.title) || null, area_id: ((_b = row.Area) === null || _b === void 0 ? void 0 : _b.id) || null }));
        });
        return { data: modifiedRows, total: count };
    }
    async create({ nombre, apellido, telefono, email, cargo, area, }) {
        return await personal_1.default.create({
            nombre,
            apellido,
            telefono,
            email,
            cargo,
            area,
        });
    }
    async setActive({ id, estado }) {
        return await personal_1.default.update({ estado }, { where: { id } });
    }
    async delete({ id }) {
        return await personal_1.default.destroy({ where: { id } });
    }
    async update({ id, nombre, apellido, telefono, email, cargo, area, }) {
        const fieldsToUpdate = { nombre, apellido, cargo, area };
        if (telefono !== undefined)
            fieldsToUpdate.telefono = telefono;
        if (email !== undefined)
            fieldsToUpdate.email = email;
        return await personal_1.default.update(fieldsToUpdate, { where: { id } });
    }
    async getAllByAreas() {
        const data = await area_1.default.findAll({
            where: { estado: { [sequelize_1.Op.ne]: 0 } },
            include: [
                {
                    model: personal_1.default,
                    where: { estado: { [sequelize_1.Op.ne]: 0 } },
                    required: false,
                    attributes: [
                        "id",
                        "nombre",
                        "apellido",
                        "telefono",
                        "email",
                        "cargo",
                    ],
                },
            ],
            order: [
                ["orden", "ASC"],
                [personal_1.default, "id", "ASC"],
            ],
        });
        return { data };
    }
}
exports.default = new PersonalModel();
