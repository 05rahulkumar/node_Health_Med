const signupModel = require('../models/user');

module.exports = {
    profile: async (req, res) => {
        try {
            let user = await signupModel.findById(req.userData.reid);
            if (!user) {
                return res.status(404).json({ success: false, msg: "User not found" });
            }
            res.status(200).json({ success: true, user });
        } catch (error) {
            res.status(500).json({ success: false, msg: "Something went wrong", error: error.message });
        }
    }
};
