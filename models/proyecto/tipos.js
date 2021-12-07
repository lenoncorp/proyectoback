import { gql } from 'apollo-server-express';

const tiposProyecto = gql`

    type Objetivo {
        _id: ID!
        descripcion: String!
        tipo: Enum_TipoObjetivo!
    }

    input crearObjetivo {
        descripcion: String!
        tipo: Enum_TipoObjetivo!
    }

    input camposObjetivo {
        descripcion: String!
        tipo: Enum_TipoObjetivo!
    }

    input camposProyecto {
        nombre: String
        presupuesto: Float
        fechaInicio: Date
        fechaFin: Date
        estado: Enum_EstadoProyecto
        fase: Enum_FaseProyecto
        lider: String
    }

    type Proyecto {
        _id: ID!
        nombre: String!
        presupuesto: Float!
        fechaInicio: Date!
        fechaFin: Date!
        estado: Enum_EstadoProyecto!
        fase: Enum_FaseProyecto!
        lider: Usuario!
        objetivos: [Objetivo]
        avances: [Avance]
        inscripciones: [Inscripcion]
    }



    input FiltroProyectos {
        estado: Enum_EstadoProyecto
        fase: Enum_FaseProyecto
        lider: String

    }

    type Query {
        Proyectos(filtroP: FiltroProyectos): [Proyecto]
        
     }

    type Mutation {
        crearProyecto(
            nombre: String!
            presupuesto: Float!
            fechaInicio: Date!
            fechaFin: Date!
            lider: String!
            objetivos: [crearObjetivo]
        ): Proyecto

        editarProyecto(_id: String!, campos: camposProyecto): Proyecto
        
        editarProyectoAdmin(   
            _id: String!,
            campos: camposProyecto
        ): Proyecto

        editarProyectoLider(
            _id: String!,
            nombre: String
            objetivos: [String]
            presupuesto: Float
        ): Proyecto
        
        crearObjetivo(idProyecto: String!, campos: camposObjetivo!): Proyecto
    
        editarObjetivo(idProyecto: String!, indexObjetivo: Int!, campos: camposObjetivo): Proyecto
    
        eliminarObjetivo(idProyecto: String!, idObjetivo: String!): Proyecto
    }

`;

export { tiposProyecto };