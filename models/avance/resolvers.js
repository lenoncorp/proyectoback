
import { ModeloAvance } from "./avance.js";
import { ProjectModel } from "../proyecto/proyecto.js";

const resolversAvance = {

    Query: {
        Avances: async (parent, args, context) => {
            if (context.userData) {
                if (context.userData.rol === 'LIDER') {
                    const proyectos = await ProjectModel.find({lider: context.userData._id})
                    const avances = await ModeloAvance.find({proyecto: proyectos})
                        .populate('proyecto')
                        .populate('creadoPor');
                    return avances;
                }
            }return null;
        },
        filtrarAvance: async (parents, args) => {
            const avanceFiltrado = await ModeloAvance.find({
                proyecto: args._id
            })
                .populate('proyecto')
                .populate('creadoPor');
            return avanceFiltrado;
        },
    },
    Mutation: {
        crearAvance: async (parents, args) => {
            const avanceCreado = ModeloAvance.create({
                fecha: args.fecha,
                descripcion: args.descripcion,
                proyecto: args.proyecto,
                creadoPor: args.creadoPor,
            });
            return avanceCreado;
        },
    },

};

export { resolversAvance };
