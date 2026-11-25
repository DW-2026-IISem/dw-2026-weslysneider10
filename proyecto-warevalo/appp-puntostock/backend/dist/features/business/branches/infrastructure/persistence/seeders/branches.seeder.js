"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedBranches = seedBranches;
const branch_model_1 = require("../models/branch.model");
const status_enum_1 = require("../../../../../../common/enums/status.enum");
async function seedBranches() {
    const count = await branch_model_1.BranchModel.count();
    if (count > 0) {
        return;
    }
    await branch_model_1.BranchModel.bulkCreate([
        {
            name: 'Sucursal Centro',
            description: 'Sede principal',
            status: status_enum_1.Status.ACTIVE,
        },
        {
            name: 'Sucursal Norte',
            description: 'Sede secundaria',
            status: status_enum_1.Status.ACTIVE,
        },
    ]);
}
//# sourceMappingURL=branches.seeder.js.map