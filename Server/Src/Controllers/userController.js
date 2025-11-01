import User from "../Models/User.js";

export const fetchProfile = async (req, res, next) => {
  try {
    res.status(201).json({
      success: true,
      data: req.user,
    });
  } catch (err) {
    next(err);
  }
};

export const updateProfile = async (req, res) => {

  try {
    const { emailId, contact } = req.body;
    if (emailId) return res.status(400).json({
      message:'Email is immutable'
    });

    if (contact)
      return res.status(400).json({
        message: 'Contact is immutable'
      });

    const user = await User.findByIdAndUpdate(req.user?._id, req.body, {
      runValidators: true,
      new: true,
    });

    if (!user)
      return res.status(404).json({
        message: 'User not found',
      });

    res.status(200).json({
      firstName: user.firstName,
      lastName: user.lastName,
      emailId: user.emailId,
      contact: user.contact,
      role: user.role,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export const deleteProfile = async (req, res) => {
  try {
    const { Token } = req.cookies;

    if (!Token) {
      return res.status(401).json({
        message: 'Authentication token missing',
      });
    }

    const user = await User.findById(req.user?._id);
    if (!user) {
        return res.status(404).json({
          message: 'User not found',
        });
    }

    await User.findByIdAndDelete(req.user._id);

    const payload = jwt.decode(Token);
    await redisClient.set(`Token: ${Token}`, 'Blocked');
      await redisClient.expireAt(`Token: ${Token}`, payload.exp);

      res.clearCookie('Token');
      return res.status(200).json({
         message: 'User deleted successfully',
      });
  } catch (error) {
      return res.status(500).json({
         message: 'Failed to delete user',
         error: error.message,
      });
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

