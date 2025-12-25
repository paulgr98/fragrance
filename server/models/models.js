import sequelize from "../config/sequelize.js";

import Accord from "./Accord.js";
import Brand from "./Brand.js";
import Note from "./Note.js";
import Perfume from "./Perfume.js";
import PerfumeNotes from "./PerfumeNotes.js";

Brand.hasMany(Perfume, {
    foreignKey: "brand_id"
});

Perfume.belongsTo(Brand, {
    foreignKey: "brand_id"
});

Perfume.belongsToMany(Accord, {
    through: "perfume_accords",
    foreignKey: "perfume_id",
});

Accord.belongsToMany(Perfume, {
    through: "perfume_accords",
    foreignKey: "accord_id",
});

Perfume.belongsToMany(Note, {
    through: PerfumeNotes,
    foreignKey: "perfume_id",
});

Note.belongsToMany(Perfume, {
    through: PerfumeNotes,
    foreignKey: "note_id",
});

export {
    sequelize,
    Accord,
    Brand,
    Note,
    Perfume,
    PerfumeNotes
}