/**
 * 
 * @On(event = { "CREATE" }, entity = "loyaltyProgramSrv.Redemptions")
 * @param {Object} req - User information, tenant-specific CDS model, headers and query parameters
*/
module.exports = async function(req) {
  const { redeemedAmount, customer } = req.data;

  // Fetch the customer's current reward points and redeemed points
  const [{ totalRewardPoints, totalRedeemedRewardPoints }] = await SELECT.from('loyaltyProgramSrv.Customers')
    .where({ ID: customer })
    .columns('totalRewardPoints', 'totalRedeemedRewardPoints');

  // Check if the customer has enough reward points to redeem
  if (totalRewardPoints < redeemedAmount) {
    req.reject(400, 'Not enough reward points to redeem');
    return;
  }

  // Deduct the redeemed amount from the customer's total reward points
  // Add the redeemed amount to the customer's total redeemed reward points
  await UPDATE('loyaltyProgramSrv.Customers')
    .set({
      totalRewardPoints: totalRewardPoints - redeemedAmount,
      totalRedeemedRewardPoints: totalRedeemedRewardPoints + redeemedAmount
    })
    .where({ ID: customer });
};