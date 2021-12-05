import { InscriptionModel } from './inscripcion.js';

const resolverInscripciones = {

    Query: {
        Inscripciones: async (parent, args) => {
            const inscripciones = await InscriptionModel.find();
            return inscripciones;
        },

        InscripcionesLider: async (parent,args,context) => {
            if (context.userData.rol === 'LIDER') {
                    const inscripcionesLider = await InscriptionModel.find({ lider: context.userData._id})
                return inscripcionesLider;
            }else{
                return null;
            }
        }
    },

    Mutation: {
        crearInscripcion: async (parent, args) => {
            const inscripcionCreada = await InscriptionModel.create({
                estado: args.estado,
                proyecto: args.proyecto,
                estudiante: args.estudiante,
            });
            return inscripcionCreada;
        },
        aprobarInscripcion: async (parent, args) => {
            const inscripcionAprobada = await InscriptionModel.findByIdAndUpdate(args.id, {
                estado: 'ACEPTADO',
                fechaIngreso: Date.now(),
            },
            {new:true}
            );
            return inscripcionAprobada;
        },

        //H016
        aprobarInscripcionLider: async (parent, args, context) => {
            if (context.userData.rol === 'LIDER') {
                const inscripcionAprobadaLider = await InscriptionModel.findByIdAndUpdate(args.id, {
                    estado: args.estado,
                    fechaIngreso: Date.now(),
                },
                    {new:true}
                );
                return inscripcionAprobadaLider;
            }else{
                return null;
            }
        },
    },
};

export { resolverInscripciones };