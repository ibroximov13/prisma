async function uploadImage(req, res) {
    try {
        if (!req.file) {
            logger.warn("Image upload attempted without file");
            return res.status(400).json({ error: "Rasm yuklanishi kerak" });
        }

        const imageUrl = `${req.protocol}://${req.get("host")}/image/${req.file.filename}`;
        logger.info(`Image uploaded successfully: ${imageUrl}`);
        res.status(200).json({ url: imageUrl });
    } catch (error) {
        logger.error(`uploadImage error: ${error.message}`);
        res.status(500).json({ error: error.message || "Serverda xatolik yuz berdi" });
    };
};

module.exports = uploadImage