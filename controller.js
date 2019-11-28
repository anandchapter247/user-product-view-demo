const UserViewModel = require("./models/userView");
const ProductModel = require("./models/product");
/**
|--------------------------------------------------
| Get Unique Users and Total Viewers
|--------------------------------------------------
*/
const getProductViews = async (req, res) => {
  try {
    let startDate = req.query.startDate;
    let endDate = req.query.endDate;
    const totalUniqueUsers = await UserViewModel.aggregate([
      {
        $match: {
          viewDate: {
            $gte: new Date(new Date(startDate).setUTCHours(00, 00, 00, 000)),
            $lte: new Date(new Date(endDate).setUTCHours(59, 59, 59, 999))
          }
        }
      },
      {
        $group: {
          _id: "$productId",
          totalViews: { $sum: 1 },
          userId: {
            $addToSet: "$userId"
          }
        }
      },
      {
        $unwind: "$userId"
      },
      {
        $group: {
          _id: "$_id",
          totalViews: { $first: "$totalViews" },
          totalUniqueUsers: {
            $sum: 1
          }
        }
      }
    ]);

    await UserViewModel.populate(totalUniqueUsers, {
      path: "_id",
      model: ProductModel
    });

    return res.status(200).json({
      data: totalUniqueUsers,
      success: true
    });
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
  }
};
/**
 *
 */
module.exports = {
  getProductViews
};
