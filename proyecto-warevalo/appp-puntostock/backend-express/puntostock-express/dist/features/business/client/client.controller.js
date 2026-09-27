"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientController = void 0;
const client_model_1 = require("./client.model");
function paramId(req) {
    const raw = req.params.id;
    const value = Array.isArray(raw) ? raw[0] : raw;
    return Number(value);
}
class ClientController {
    // ================== READ ==================
    async getAll(req, res) {
        try {
            const clients = await client_model_1.Client.findAll({
                where: { status: "active" },
                attributes: { exclude: ["password"] },
            });
            res.status(200).json({ clients });
        }
        catch (error) {
            res.status(500).json({
                error: "Error fetching clients",
                detail: String(error),
            });
        }
    }
    async getOne(req, res) {
        try {
            const id = paramId(req);
            const client = await client_model_1.Client.findByPk(id, {
                attributes: { exclude: ["password"] },
            });
            if (!client) {
                res.status(404).json({ error: "Client not found" });
                return;
            }
            res.status(200).json({ client });
        }
        catch (error) {
            res.status(500).json({
                error: "Error fetching client",
                detail: String(error),
            });
        }
    }
    // ================== CREATE ==================
    async create(req, res) {
        try {
            const body = req.body;
            const client = await client_model_1.Client.create({
                name: body.name,
                address: body.address,
                phone: body.phone,
                email: body.email,
                password: body.password,
                status: body.status ?? "active",
            });
            const { password, ...safe } = client.toJSON();
            res.status(201).json({ client: safe });
        }
        catch (error) {
            res.status(500).json({
                error: "Error creating client",
                detail: String(error),
            });
        }
    }
    // ================== UPDATE ==================
    async updatePut(req, res) {
        try {
            const id = paramId(req);
            const body = req.body;
            const client = await client_model_1.Client.findByPk(id);
            if (!client) {
                res.status(404).json({ error: "Client not found" });
                return;
            }
            await client.update({
                name: body.name,
                address: body.address,
                phone: body.phone,
                email: body.email,
                password: body.password ?? client.password,
                status: body.status ?? client.status,
            });
            const { password, ...safe } = client.toJSON();
            res.status(200).json({ client: safe });
        }
        catch (error) {
            res.status(500).json({
                error: "Error updating client (PUT)",
                detail: String(error),
            });
        }
    }
    async updatePatch(req, res) {
        try {
            const id = paramId(req);
            const body = req.body;
            const client = await client_model_1.Client.findByPk(id);
            if (!client) {
                res.status(404).json({ error: "Client not found" });
                return;
            }
            await client.update(body);
            const { password, ...safe } = client.toJSON();
            res.status(200).json({ client: safe });
        }
        catch (error) {
            res.status(500).json({
                error: "Error updating client (PATCH)",
                detail: String(error),
            });
        }
    }
}
exports.ClientController = ClientController;
//# sourceMappingURL=client.controller.js.map