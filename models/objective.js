//import { Enum_TipoObjetivo } from './enums/enums.js';
//import { ProjectModel } from './proyecto/proyecto.js';
import mongoose from 'mongoose';

const {Schema, model} = mongoose;

//interface Objective {
  //descripcion: string;
  //tipo: Enum_TipoObjetivo;
//}

const objectiveSchema = new Schema({
  descripcion: {
    type: String,
    required: true,
  },
  tipo: {
    type: String,
    enum: ['GENERAL', 'ESPECIFICO'],
    required: true,
  },
});

const ObjectiveModel = model('Objetivo', objectiveSchema);

export { ObjectiveModel };
