
import { gql } from "apollo-server-express";

const tiposAvance = gql`
    type Avance {
        _id: ID!
        fecha: Date!
        descripcion: String!
        observaciones: [String]
        proyecto: Proyecto!
        creadoPor: Usuario!
    }
    type Query {
        Avances: [Avance]
        AvancesEstudiante(project: String): [Avance]
        filtrarAvance(_id: String!): [Avance]
    }
    type Mutation {
        crearAvance(
        fecha: Date!,
        descripcion: String!,
        proyecto: String!,
        creadoPor: String!
        ): Avance
        agregarObservacion(_id: String!, observacion:String!): Avance

        editarAvance(
            _id: String!
            observaciones: [String]
            descripcion: String
        ): Avance

    }
    
`;

export { tiposAvance };
