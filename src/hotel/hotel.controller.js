import Hotel from "../hotel/hotel.model.js";

export const createHotel = async (req, res) => {
    try {
        const { name, address, phone, description } = req.body;
        let image = req.file ? req.file.filename : null;

        const hotel = new Hotel({
            name,
            address,
            phone,
            description,
            image
        });

        await hotel.save();

        res.status(201).json({
            success: true,
            msg: "Hotel creado",
            hotel
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Error creando hotel",
            error: error.message
        });
    }
};


export const getHotels = async (req, res) => {
    try {
        const hotels = await Hotel.find();
        res.status(200).json({
            success: true,
            msg: "Listado de Hoteles:",
            hotels
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Error recibiendo hoteles",
            error: error.message
        });
    }
};

export const getHotelById = async (req, res) => {
    try {
        const { hid } = req.params;
        const hotel = await Hotel.findById(hid);
        if (!hotel) {
            return res.status(404).json({
                success: false,
                msg: "Hotel not found"
            });
        }
        res.status(200).json({
            success: true,
            hotel
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Error recibiendo hotel",
            error: error.message
        });
    }
};

export const updateHotel = async (req, res) => {
    try {
        const { hid } = req.params;
        const data = req.body;

        const updatedHotel = await Hotel.findByIdAndUpdate(hid, data, { new: true });

        if (!updatedHotel) {
            return res.status(404).json({
                success: false,
                msg: "Hotel not found"
            });
        }

        res.status(200).json({
            success: true,
            msg: "Hotel Actualizado",
            hotel: updatedHotel
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Error actualizando hotel",
            error: error.message
        });
    }
};

export const deleteHotel = async (req, res) => {
    try {
        const { hid } = req.params;

        const deletedHotel = await Hotel.findByIdAndDelete(hid);

        if (!deletedHotel) {
            return res.status(404).json({
                success: false,
                msg: "Hotel not found"
            });
        }

        res.status(200).json({
            success: true,
            msg: "Hotel Eliminado",
            hotel: deletedHotel
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Error eliminando hotel",
            error: error.message
        });
    }
};

export const getReservations = async (req, res) => {
    try {
        const hotels = await Hotel.find().sort({ reservation: -1 });
        res.status(200).json({
            success: true,
            msg: "Listado de hotel con más reservaciones:",
            hotels
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Error recibiendo hoteles",
            error: error.message
        });
    }
};