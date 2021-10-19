const uuid = require("uuid");
const { Image } = require("../models/models");
const path = require("path");
const ApiError = require("../error/ApiError");
const messages = require("../message/databaseRelated");
const fs = require("fs");
const { Op } = require("sequelize");

class ImageController {
    async create(req, res, next) {
        try {
            const { tankId } = req.body;
            const { file } = req.files;
            let fileName = uuid.v4() + ".jpg";

            file.mv(path.resolve(__dirname, "..", "static", fileName));
            const img = await Image.create({
                tankId: tankId,
                title: fileName,
            });

            return res.status(201).json(img);
        } catch (err) {
            return next(err);
        }
    }

    async createMultiple(req, res, next) {
        try {
            const { tankId } = req.body;
            const { files } = req.files;
            let message = "";

            if (files.length !== 0 && files.length <= 15) {
                for (let file of files) {
                    if (file.size <= 26214400) {
                        try {
                            let fileName = uuid.v4() + ".jpg";
                            file.mv(
                                path.resolve(
                                    __dirname,
                                    "..",
                                    "static",
                                    fileName
                                )
                            );
                            const img = await Image.create({
                                tankId,
                                title: fileName,
                            });
                        } catch (err) {
                            console.log(err.message);
                            message +=
                                `Error while uploading ${file.name}` + "\n";
                        }
                    } else {
                        message += `Image ${file.name} surpass size limit(25 MB).\n`;
                    }
                }
            }
            return res.status(200).json({ Message: message });
        } catch (err) {
            return next(err);
        }
    }

    async getAllById(req, res, next) {
        try {
            const { tankId } = req.params;
            const images = await Image.findAll({
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
            const image = await Image.findOne({
                where: {
                    id: id,
                },
            });

            if (image === null) {
                return next(ApiError.badRequest(messages.NOT_IN_DATABASE));
            } else {
                try {
                    fs.unlink(
                        path.resolve(__dirname, "..", "static", image.title),
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

    async deleteMultiple(req, res, next) {
        try {
            const { idArray } = req.body;
            const images = await Image.findAll({
                attributes: ["id", "title"],
                where: {
                    id: {
                        [Op.or]: idArray,
                    },
                },
            });

            if (images.length === null) {
                return next(ApiError.badRequest(messages.NOT_IN_DATABASE));
            } else {
                images.forEach(async (image) => {
                    try {
                        fs.unlink(
                            path.resolve(
                                __dirname,
                                "..",
                                "static",
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
                    } catch (err) {
                        console.log(err.message);
                    }
                });
                return res.json({ message: "success" });
            }
        } catch (err) {
            return next(err);
        }
    }
}

module.exports = new ImageController();
