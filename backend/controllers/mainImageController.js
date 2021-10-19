const uuid = require("uuid");
const { MainImage } = require("../models/models");
const path = require("path");
const ApiError = require("../error/ApiError");
const messages = require("../message/databaseRelated");
const fs = require("fs");
//const { Op } = require("sequelize");

class MainImageController {
    async create(req, res, next) {
        try {
            const { tankId } = req.body;
            const { file } = req.files;
            let fileName = uuid.v4() + ".jpg";

            file.mv(path.resolve(__dirname, "..", "static", "main", fileName));

            const img = await MainImage.create({
                title: fileName,
                tankId: tankId,
            });

            return res.status(201).json(img);
        } catch (err) {
            return next(err);
        }
    }

    async getById(req, res, next) {
        try {
            const { tankId } = req.params;
            const images = await MainImage.findOne({
                attributes: ["id", "title", "tankId"],
                where: {
                    tankId: tankId,
                },
            });

            return res.json(images);
        } catch (err) {
            return next(err);
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.body;
            const image = await MainImage.findOne({
                where: {
                    id: id,
                },
            });

            if (image === null) {
                return next(ApiError.badRequest(messages.NOT_IN_DATABASE));
            } else {
                try {
                    fs.unlink(
                        path.resolve(
                            __dirname,
                            "..",
                            "static",
                            "main",
                            image.title
                        ),
                        (errs) => {
                            if (errs) {
                                return res.json({ message: errs.message });
                            }
                            console.log(`Image ${image.title} deleted`);
                        }
                    );
                    await image.destroy();
                    return res.json({ message: messages.DELETION_SUCCESS });
                } catch (err) {
                    return res.json({ message: err.message });
                }
            }
        } catch {
            return next(err);
        }
    }
}

module.exports = new MainImageController();
