const { getSummaryTableData } = require('../models/featureModel.js');

const getSummaryTable = async (req, res) => {
    try {
        const chartData = await getSummaryTableData();
        res.status(200).json({
            success: true,
            data: chartData,
        });
    } catch (error) {
        console.error("Error in getSummaryTable:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

module.exports = { getSummaryTable };
