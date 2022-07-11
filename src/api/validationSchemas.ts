
import { IDrone } from "interfaces/Idrone";
import Joi from "joi";

export const DroneValidationSchema = Joi.object().keys(<IDrone>{
    serial_number: Joi.string().required(),
    model: Joi.string().required(),
    weight_limit: Joi.number().max(500).required(),
    battery_capacity: Joi.number().max(100).required(),
    state: Joi.string()
});

let medication = Joi.object().keys({
    name: Joi.string().required(),
    weight: Joi.number().required(),
    code: Joi.string().required(),
    image: Joi.string().required(),
})

export const MedicationValidationSchema = Joi.object().keys({
    medications: Joi.array().items(medication)
})