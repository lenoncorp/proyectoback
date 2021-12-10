import { UserModel } from './usuario.js';
import bcrypt from 'bcrypt';
import { InscriptionModel } from '../inscripcion/inscripcion.js';


const resolversUsuario = {

    //Query: {
    //Usuarios: async (parent, args, context) => {
    //if (context.userData.rol === 'LIDER') {
    //  const usuarios = await UserModel.find({ rol: 'ESTUDIANTE' }).populate([
    //    {
    //      path: 'inscripciones',
    //    populate: {
    //      path: 'proyecto',
    //    populate: [{ path: 'lider' }, { path: 'avances' }],
    //},
    //},
    //{
    //  path: 'proyectosLiderados',
    //},
    //]);
    //return usuarios;
    //} else {
    //  const usuarios = await UserModel.find().populate([
    //    {
    // path: 'inscripciones',
    // populate: {
    //path: 'proyecto',
    //populate: [{ path: 'lider' }, { path: 'avances' }],
    // },
    // },
    // {
    //path: 'proyectosLiderados',
    // },
    // ]);
    Usuario: {
        inscripciones: async (parent, args, context) => {
            return InscriptionModel.find({ estudiante: parent._id });
        },
    },
    Query: {
        Usuarios: async (parent, args, context) => {
            if(context.userData){
                if(context.userData.rol === 'ESTUDIANTE'){
                    console.log(args);
                    const usuarios = await UserModel.find({ _id: context.userData._id });
                    return usuarios;
                }else if(context.userData.rol === 'ADMINISTRADOR'){
                    const usuarios = await UserModel.find({ ...args.filtro });
                    return usuarios;
                }else if(context.userData.rol === 'LIDER'){
                    const usuarios = await UserModel.find({ rol: 'ESTUDIANTE' });
                    return usuarios;
                }
            }else{
                return null;
            }
        },
        Usuario: async (parent, args) => {
            const usuario = await UserModel.findOne({ _id: args._id });
            return usuario;
        },
    },
    Mutation: {
        crearUsuario: async (parent, args) => {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(args.password, salt);
            const usuarioCreado = await UserModel.create({
                nombre: args.nombre,
                apellido: args.apellido,
                identificacion: args.identificacion,
                correo: args.correo,
                rol: args.rol,
                password: hashedPassword,
            });

            if (Object.keys(args).includes('estado')) {
                usuarioCreado.estado = args.estado;
            }

            return usuarioCreado;
        },
        editarUsuario: async (parent, args) => {
            const usuarioEditado = await UserModel.findByIdAndUpdate(args._id, {
                nombre: args.nombre,
                apellido: args.apellido,
                identificacion: args.identificacion,
                correo: args.correo,
                estado: args.estado,
            },
                { new: true }
            );

            return usuarioEditado;
        },
        eliminarUsuario: async (parent, args) => {
            if (Object.keys(args).includes('_id')) {
                const usuarioEliminado = await UserModel.findOneAndDelete({ _id: args._id });
                return usuarioEliminado;
            } else if (Object.keys(args).includes('correo')) {
                const usuarioEliminado = await UserModel.findOneAndDelete({ correo: args.correo });
                return usuarioEliminado;
            }
        },
    },
};

export { resolversUsuario };