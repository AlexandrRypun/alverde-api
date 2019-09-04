const models = require('../models');
const serializers = require('../serializers');
const { ValidationError } = require('sequelize');

class BasicController {
    constructor(modelName) {
        this.model = modelName ? models[modelName] : null;
        this.serializer = modelName ? serializers[modelName] : null;
        this.perPage = 5;
        this.paramsMap = {};
        this.order = [this.model.primaryKeyAttribute];
    }

    async list(req, res) {
        try {
            const params = this.generateParams(req);

            let list = await this.model.findAll(params);

            if (this.serializer) {
                list = this.serializer.serialize(list);
            }

            res.status(200).json(list);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    async item(req, res) {
        try {
            const params = this.generateParams(req);

            let record = await this.model.findOne(params);
            if (this.serializer) {
                record = this.serializer.serialize(record);
            }

            res.status(200).json(record);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    async create(req, res) {
        try {
            const newRecord = await this.model.create(req.body);
            res.status(200).json(newRecord);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    async validate(req, res) {
        try {
            const validationErrors = [];
            const data = await this.serializer.deserialize(req.body);
            data.price = 'we';
            const recordsToValidate = [this.model.build(data)];
            Object.keys(data).filter(property => this.model.associations[property] !== undefined).forEach(relation => {
                if (Array.isArray(data[relation])) {
                    data[relation].forEach(recordData => {
                        recordsToValidate.push(this.model.associations[relation].target.build(recordData));
                    });
                } else if (data[relation]) {
                    recordsToValidate.push(this.model.associations[relation].target.build(data[relation]));
                }
            });

            await Promise.all(recordsToValidate.map(record => {
                return record.validate().catch(error => {
                    if (error instanceof ValidationError) {
                        error.errors.forEach(e => {
                            e.message = `${this.model.name}.${error.errors[0].path}.${error.errors[0].validatorKey}`;
                            e.model = this.model.name;
                        });
                        validationErrors.push(...error.errors);
                    }
                })
            }));

            if (validationErrors.length > 0) {
                res.status(422).json({errors: validationErrors});
            } else {
                res.status(200).json({});
            }
        } catch (error) {
            res.status(400).json(error);
        }
    }

    generateParams(req) {
        const params = { where: {}, order: this.order };
        const query = req.query;
        params.include = query.include || [];
        Object.keys(query).forEach(param => {
            if (param === 'page') {
                const page = Number(query.page);
                params.limit = this.perPage;
                params.offset = page ? (page - 1) * this.perPage : 0;
            } else if (this.paramsMap[param] !== undefined && query[param]) {
                params.where[this.paramsMap[param]] = query[param];
            } else if (this.model.rawAttributes[param] !== undefined) {
                params.where[param] = query[param];
            }
        });
        if (req.params[this.model.primaryKeyAttribute]) {
            params.where[this.model.primaryKeyAttribute] = req.params[this.model.primaryKeyAttribute];
        }

        return params;
    }
}

module.exports = BasicController;
