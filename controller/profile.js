const signupModel = require('../models/user');
let msg = require('../Services/responseMSG');

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
    },
    updateProfile: async (req, res) => {
        let defaultMsg = req.headers.defaultLang ? req.headers.defaultLang : 'en';
        try {
            const { name ,email,password,userType} = req.body;
            const userId = req.userData.reid; // Assuming `reid` is the user ID in your token payload

            // Find and update the user's wishlist item
            const wishlistItem = await signupModel.findOneAndUpdate({ _id: req.params._id, user: userId }, { name,email,password,userType }, { new: true });

            if (!wishlistItem) {
                return res.status(404).json({ success: false, msg: 'Profile item not found' });
            }

            res.status(200).json({ success: true, msg: msg[defaultMsg].Update, wishlistItem });
        } catch (err) {
            res.status(500).json({ success: false, msg: msg[defaultMsg].Something_Went_Wrong, Error: err.message, language: defaultMsg });
        }
    },
};
