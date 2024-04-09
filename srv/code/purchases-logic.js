/**
 * 
 * @On(event = { "CREATE" }, entity = "loyaltyProgramSrv.Purchases")
 * @param {Object} request - User information, tenant-specific CDS model, headers and query parameters
*/
module.exports = async function(request) {
    const { data } = request;
    const { customer_ID } = data;
    
    // Calculate reward points based on purchase value
    data.rewardPoints = Math.floor(data.purchaseValue / 10);

    // Update total purchase value and total reward points of the related customer
    const customerToUpdate = await SELECT.one.from('loyaltyProgramSrv.Customers').where({ ID: customer_ID });
    if (customerToUpdate) {
        const updatedTotalPurchaseValue = customerToUpdate.totalPurchaseValue + data.purchaseValue;
        const updatedTotalRewardPoints = customerToUpdate.totalRewardPoints + data.rewardPoints;

        await UPDATE('loyaltyProgramSrv.Customers')
            .set({
                totalPurchaseValue: updatedTotalPurchaseValue,
                totalRewardPoints: updatedTotalRewardPoints
            })
            .where({ ID: customer_ID });
    }
}