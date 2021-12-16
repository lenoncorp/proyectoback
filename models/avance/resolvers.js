
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
                }
            else if(context.userData.rol === 'ESTUDIANTE'){
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
        //
        // filtrarAvance: async (parents, args, context) => {

        //         if (context.userData.rol === 'ESTUDIANTE') {
        //             const avanceFiltrado = await ModeloAvance.find({
        //                 proyecto: args._id
        //             })
        //                 .populate('proyecto')
        //                 .populate('creadoPor');
        //             return avanceFiltrado;
        //         }
        // },
    },
    Mutation: {
        //H022
        crearAvance: async (parents, args, context) => {
            if(context.userData){
                if (context.userData.rol === 'ESTUDIANTE') {
                    const avanceCreado = ModeloAvance.create({
                        fecha: args.fecha,
                        descripcion: args.descripcion,
                        proyecto: args.proyecto,
                        creadoPor: args.creadoPor,
                    });
                    return avanceCreado;
                }
            }else{
                return null;
            }
        },
        //H018
        editarAvance: async (parents, args, context) => {
            if(context.userData){
                if (context.userData.rol === 'LIDER') {
                    const avanceEditado = ModeloAvance.findByIdAndUpdate(
                        args._id, {
                            observaciones: args.observaciones, 
                        },
                        { new: true }
                    );
                    return avanceEditado;
                    //H023
                }else if(context.userData.rol === 'ESTUDIANTE'){
                    const avanceEditado = ModeloAvance.findByIdAndUpdate(
                        args._id, {
                            descripcion: args.descripcion, 
                        },
                        { new: true }
                    );
                    return avanceEditado;
                }
            }else{
                return null;
            }
        },
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
