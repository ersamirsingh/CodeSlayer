import User from "../Models/User";

export const getMe = async (req, res, next) => {
  try {
    res.json({
      success: true,
      data: req.user,
    });
  } catch (err) {
    next(err);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const updates = req.body;
    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    });
    res.json({
      success: true,
      data: updatedUser,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const userId = req.user._id;
    await User.findByIdAndDelete(userId);
    res.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const updateLocation = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { lat, lng } = req.body;
    if (typeof lat !== "number" || typeof lng !== "number") {
      return res.status(400).json({
        success: false,
        message: "invalid coordinates",
      });
    }
    const user = await User.findByIdAndUpdate(
      userId,
      {
        location: {
          type: "Point",
          coordinates: [lng, lat],
        },
      },
      { new: true }
    ).select("-password");
    res.json({
      success: true,
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

export const getNearbyUsers = async (req, res, next) => {
  try {
    const { lat, lng, distance } = req.query;
    if (
      typeof lat === "undefined" ||
      typeof lng === "undefined" ||
      typeof distance === "undefined"
    ) {
      return res.status(400).json({
        success: false,
        message: "lat, lng and distance are required",
      });
    }
    const users = await User.find({
      location: {
        $geoWithin: {
          $centerSphere: [
            [parseFloat(lng), parseFloat(lat)],
            parseFloat(distance) / 6378.1,
          ],
        },
      },
    }).select("-password");
    res.json({
      success: true,
      data: users,
    });
  } catch (err) {
    next(err);
  }
};

export const getUserById = async (req, res, next) => {
    try{
        const userId = req.params.id;
        const user = await User.findById(userId).select('-password');
        if(!user){
            return res.status(404).json({
                success: false,
                message: "user not found"
            })
        }
        res.json({
            success: true,
            data: user
        })
    }catch(err){
        next(err);
    }
}

export const rateUser = async (req, res, next) => {
    try{
        const userId = req.paras.id;
        const { rating } = req.body;
        if(typeof rating !== 'number' || rating < 1 || rating > 5){
            return res.status(400).json({
                success: false,
                message: "rating must be a number between 1 and 5"
            })
        }
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({
                success: false,
                message: "user not found"
            })
        }
        user.rating = ((user.rating * user.ratingCount) + rating) / (user.ratingCount + 1);
        user.ratingCount += 1;
        await user.save();
        res.json({
            success: true,
            data: {
                rating: user.rating,
                ratingCount: user.ratingCount
            }
        })
    }catch(err){
        next(err);
    }
}

