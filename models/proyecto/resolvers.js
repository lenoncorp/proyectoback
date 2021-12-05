import { InscriptionModel } from '../inscripcion/inscripcion.js';
import { UserModel } from '../usuario/usuario.js';
import { ProjectModel } from './proyecto.js';

const resolversProyecto = {
    Proyecto: {
        lider: async (parent, args, context) => {
            const usr = await UserModel.findOne({
                _id: parent.lider.toString(),
            });
            return usr;
        },
    },
    // Query: {
    //     Proyectos: async (parent, args, context) => {
    //         const proyectos = await ProjectModel.find();
    //         return proyectos;
    //     },
    // },

    //QUERY H013 sin restricciones
    // Query: {
    //     Proyectos: async (parent, args, context) => {
    //         console.log(args);
    //         const proyectos = await ProjectModel.find({ ...args.filtroP });
    //         return proyectos;
    //     },
    //     ProyectoLider: async (parent, args) => {
    //         const proyectoLider = await ProjectModel.findOne({ _id: args._id });
    //         return proyectoLider;
    //     },
    // },
    
   
    Query:{
        //H013
        Proyectos: async (parent, args, context) => {
            if (context.userData.rol === 'LIDER') {
                console.log("mensaje de entrada");
                console.log(context.userData);
                
                const proyectos = await ProjectModel.find({ lider: context.userData._id})
                    .populate("inscripciones")
                    // .populate("avances")
                    
                    // {
                    //     path: 'inscripciones',
                    //     populate: {
                    //     path: 'avances',
                    //     populate: [{path: 'proyecto'},{ path: 'lider' }, { path: 'avances' }],
                    //     },
                    // }
                return proyectos;
            }
            //H006
            else if(context.userData.rol === 'ADMINISTRADOR'){
                const proyectos = await ProjectModel.find();
                return proyectos;
            }        
            else{
                return null;
            }
        } 
    },



    Mutation: {
        crearProyecto: async (parent, args, context) => {
            if(context.userData.rol === 'LIDER'){
                const proyectoCreado = await ProjectModel.create({
                    nombre: args.nombre,
                    estado: args.estado,
                    fase: args.fase,
                    fechaInicio: args.fechaInicio,
                    fechaFin: args.fechaFin,
                    presupuesto: args.presupuesto,
                    lider: args.lider,
                    objetivos: args.objetivos,
                })
                return proyectoCreado;
            }else{
                return null;
            }
        },

        editarProyecto: async (parent, args) => {
            const proyectoEditado = await ProjectModel.findByIdAndUpdate(
                args._id,
                { ...args.campos },
                { new: true }
            );
            return proyectoEditado;
        },

        editarProyectoAdmin: async (parent, args, context) => {
            if(context.userData.rol === 'ADMINISTRADOR'){
                const proyectoEditadoAdmin = await ProjectModel.findByIdAndUpdate( 
                args._id,
                { ...args.campos },
                { new: true }
                )
                return proyectoEditadoAdmin;
            // }else if(context.userData.rol === 'LIDER'){
            //     const proyectoEditadoAdmin = await ProjectModel.findByIdAndUpdate( 
            //         args._id, {
            //             nombre: args.nombre,
            //             objetivos: args.objetivos,
            //             presupuesto: args.presupuesto,
            //         })
            //     return proyectoEditadoAdmin;
            }else{
                return null;
            }
        },

        crearObjetivo: async (parent, args) => {
            const proyectoConObjetivo = await ProjectModel.findByIdAndUpdate(
                args.idProyecto,
                {
                    $addToSet: {
                        objetivos: { ...args.campos, },
                    },
                },
                { new: true }
            );
            return proyectoConObjetivo;
        },
        editarObjetivo: async (parent, args) => {
            const proyectoEditado = await ProjectModel.findByIdAndUpdate(
                args.idProyecto,
                {
                    $set: {
                        [`objetivos.${args.indexObjetivo}.descripcion`]: args.campos.descripcion,
                        [`objetivos.${args.indexObjetivo}.tipo`]: args.campos.tipo,
                    },
                },
                { new: true }
            );
            return proyectoEditado;
        },
        eliminarObjetivo: async (parent, args) => {
            const proyectoObjetivo = await ProjectModel.findByIdAndUpdate(
                { _id: args.idProyecto },
                {
                    $pull: {
                        objetivos: {
                            _id: args.idObjetivo,
                        },
                    },
                },
                { new: true }
            );
            return proyectoObjetivo;
        },
    },

};

export { resolversProyecto };