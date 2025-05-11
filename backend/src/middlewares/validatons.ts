import { celebrate, Joi } from 'celebrate';

export const validateProduct = celebrate({
  body: Joi.object().keys({
    title: Joi.string().required().min(2).max(30),
    image: Joi.object({
      fileName: Joi.string(),
      originalName: Joi.string(),
    }),
    category: Joi.string().required(),
    description: Joi.string(),
    price: Joi.number(),
  })
})

export const validateOrder = celebrate({
  body: Joi.object().keys({
      items: Joi.array().items(Joi.string().required()).min(1),
      total: Joi.number().required(),
      payment: Joi.string().valid('card', 'online').required(),
      email: Joi.string().email().required(),
      phone: Joi.string().required(),
      address: Joi.string().required(),
  })
})


