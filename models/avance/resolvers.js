
import { ModeloAvance } from "./avance.js";
import { ProjectModel } from "../proyecto/proyecto.js";
import { InscriptionModel } from "../inscripcion/inscripcion.js";

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
                }else if(context.userData.rol === 'ESTUDIANTE'){
                    const inscripciones = await InscriptionModel.find({estudiante: context.userData._id});
                    const proyectos = inscripciones.map((inscripcion)=>{return inscripcion.proyecto})
                    console.log("-----------")
                    console.log(inscripciones)
                    console.log("-----------")
                    console.log(proyectos)
                    //  const proyectos = await ProjectModel.find({lider: context.userData._id})
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

        //observacion
        agregarObservacion: async (parents, args)=>{
            console.log('hola')
            console.log(args._id)
            console.log(args.observacion)
            const avanceEditado = await ModeloAvance.findOneAndUpdate({_id: args._id}, {$push: {observaciones:args.observacion}})
               
            return avanceEditado;
        }
    },

};

export { resolversAvance };
