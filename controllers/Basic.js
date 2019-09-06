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
            const data = await this.serializer.deserialize(req.body);
            const validationErrors = await this.getValidationErrors(data);
            if (validationErrors.length > 0) {
                return res.status(422).json({errors: validationErrors});
            }

            const include = [];
            const internalRelIds = {};

            Object.keys(data).filter(property => this.model.associations[property] !== undefined).forEach(relation => {
                internalRelIds[relation] = [];
                const pk = this.model.associations[relation].target.primaryKeyAttribute;
                if (Array.isArray(data[relation])) {
                    data[relation].forEach(recordData => {
                        if (recordData[pk] && String(recordData[pk]).startsWith('new_')) {
                            delete recordData[pk];
                            internalRelIds[relation].push(recordData.__id__);
                        }
                    });
                } else if (data[relation] && data[relation][pk] && String(data[relation][pk]).startsWith('new_')) {
                    delete data[relation][pk];
                    internalRelIds[relation].push(data[relation].__id__);
                }
                include.push({
                    model: this.model.associations[relation].target,
                    as: this.model.associations[relation].as
                });
            });

            let newRecord = await this.model.create(data, { include });
            Object.entries(internalRelIds).forEach(([relation, ids]) => {
                if (Array.isArray(newRecord[relation])) {
                    newRecord[relation].forEach((record, index) => {
                        record.__id__ = ids[index];
                    });
                } else if (newRecord[relation] !== undefined) {
                    newRecord[relation].__id__ = ids[0];
                }
            });
            if (this.serializer) {
                newRecord = this.serializer.serialize(newRecord);
            }
            res.status(200).json(newRecord);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    async validate(req, res) {
        try {
            const data = await this.serializer.deserialize(req.body);
            const validationErrors = await this.getValidationErrors(data);

            if (validationErrors.length > 0) {
                res.status(422).json({errors: validationErrors, code: 422});
            } else {
                res.status(200).json({});
            }
        } catch (error) {
            res.status(400).json(error);
        }
    }

    async getValidationErrors(data) {
        const validationErrors = [];
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
                        e.message = `${this.model.name}.${e.path}.${e.validatorKey}`;
                        e.model = this.model.name;
                        validationErrors.push({
                            detail: `${this.model.name}.${e.path}.${e.validatorKey}`,
                            source: {
                                pointer: `data/attributes/${e.path}`
                            }
                        });
                    });
                }
            })
        }));

        return validationErrors;
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
