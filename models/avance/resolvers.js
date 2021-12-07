
import { ModeloAvance } from "./avance.js";
import {InscriptionModel} from "../inscripcion/inscripcion.js"; 

const resolversAvance = {
    Query: {
        //H021
        Avances: async (parent, args, context) => {
            if(context.userData){
                if (context.userData.rol === 'ESTUDIANTE') {
                    const inscription =await InscriptionModel.findOne({estudiante: context.userData._id})
                    const avances = await ModeloAvance.find({proyecto: inscription.proyecto})
                    
                    return avances;
                }
            }else{
                return null;
            }
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
    },

};

export { resolversAvance };
