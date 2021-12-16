
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
        
    }
    type Mutation {
        crearAvance(
            fecha: Date!,
            descripcion: String!,
            proyecto: String!,
            creadoPor: String!
        ): Avance

        editarAvance(
            _id: String!
            observaciones: [String]
            descripcion: String
        ): Avance
        agregarObservacion(_id: String!, observacion:String!): Avance

    }
    
`;

export { tiposAvance };
