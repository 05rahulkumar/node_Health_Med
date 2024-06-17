// controller/banner.js
const Banner = require('../models/banner');
const upload = require('../middleWare/multer-config');

module.exports = {
    createBanner: (req, res) => {
        upload(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ success: false, message: err });
            }
            if (!req.file) {
                return res.status(400).json({ success: false, message: 'No file uploaded' });
            }
            try {
                const { title } = req.body;
                const img = req.file.path;
                const newBanner = new Banner({ img, title });
                const savedBanner = await newBanner.save();
                res.status(201).json({ success: true, message: "Banner created successfully", banner: savedBanner });
            } catch (error) {
                res.status(500).json({ success: false, message: "Something went wrong", error: error.message });
            }
        });
    },

    getBanners: async (req, res) => {
        try {
            const banners = await Banner.find();
            res.status(200).json({ success: true, banners });
        } catch (error) {
            res.status(500).json({ success: false, message: "Something went wrong", error: error.message });
        }
    },

    getBannerById: async (req, res) => {
        try {
            const banner = await Banner.findById(req.params.id);
            if (!banner) {
                return res.status(404).json({ success: false, message: "Banner not found" });
            }
            res.status(200).json({ success: true, banner });
        } catch (error) {
            res.status(500).json({ success: false, message: "Something went wrong", error: error.message });
        }
    },

    updateBanner: async (req, res) => {
        try {
            const { img, title } = req.body;
            const updatedBanner = await Banner.findByIdAndUpdate(req.params.id, { img, title }, { new: true });
            if (!updatedBanner) {
                return res.status(404).json({ success: false, message: "Banner not found" });
            }
            res.status(200).json({ success: true, message: "Banner updated successfully", banner: updatedBanner });
        } catch (error) {
            res.status(500).json({ success: false, message: "Something went wrong", error: error.message });
        }
    },

    deleteBanner: async (req, res) => {
        try {
            const deletedBanner = await Banner.findByIdAndDelete(req.params.id);
            if (!deletedBanner) {
                return res.status(404).json({ success: false, message: "Banner not found" });
            }
            res.status(200).json({ success: true, message: "Banner deleted successfully" });
        } catch (error) {
            res.status(500).json({ success: false, message: "Something went wrong", error: error.message });
        }
    }
};
