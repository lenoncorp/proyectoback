
import { ModeloAvance } from "./avance.js";

const resolversAvance = {
    Query: {
        Avances: async (parent, args, context) => {
            if (context.userData.rol === 'ESTUDIANTE') {
                const avances = await ModeloAvance.find()
                .populate('proyecto')
                .populate('creadoPor');
                return avances;
            }else{
                return null;
            }
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

        editarAvance: async (parents, args, context) => {
            if (context.userData.rol === 'LIDER') {
                const avanceEditado = ModeloAvance.findByIdAndUpdate(
                    args._id, {
                        observaciones: args.observaciones, 
            },
                { new: true }
            );
                return avanceEditado;
            }else{
                return null;
            }
        },
    },

};

export { resolversAvance };
