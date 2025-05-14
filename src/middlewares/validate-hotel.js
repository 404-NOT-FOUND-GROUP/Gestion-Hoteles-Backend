import Hotel from "../hotel/hotel.model.js";

export const validateHotel = async (req, res, next) => {
    try {
        const { hotel } = req.body; 

        if (!hotel) {
            return res.status(400).json({
                success: false,
                msg: "Hotel ID is required"
            });
        }

        const hotelExists = await Hotel.findById(hotel);
        if (!hotelExists) {
            return res.status(404).json({
                success: false,
                msg: "Hotel not found"
            });
        }

        req.hotel = hotelExists;
        next();
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Error validating hotel",
            error: error.message
        });
    }
};