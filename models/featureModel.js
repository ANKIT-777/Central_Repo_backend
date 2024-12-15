const db = require('../database/db');




async function getSummaryTableData(id) {
    try {
        const query = `
            SELECT 
                source, date, warning_steps, total_features, failed_features,
                total_scenarios, passed_scenarios, total_steps, info_steps,
                failed_scenarios, passed_features, skipped_steps, passed_steps, failed_steps
            FROM teams_data
            WHERE (source, date) IN (
                SELECT source, MAX(date)
                FROM teams_data
                GROUP BY source
            )
        `;

        const rows = await db.query(query);

        const chartData = {
            warningSteps: 0,
            totalFeatures: 0,
            failedFeatures: 0,
            totalScenarios: 0,
            passedScenarios: 0,
            totalSteps: 0,
            infoSteps: 0,
            failedScenarios: 0,
            passedFeatures: 0,
            skippedSteps: 0,
            passedSteps: 0,
            failedSteps: 0,
        };

        // Aggregate the values from the fetched rows
        rows.forEach(row => {
            chartData.warningSteps += row.warning_steps;
            chartData.totalFeatures += row.total_features;
            chartData.failedFeatures += row.failed_features;
            chartData.totalScenarios += row.total_scenarios;
            chartData.passedScenarios += row.passed_scenarios;
            chartData.totalSteps += row.total_steps;
            chartData.infoSteps += row.info_steps;
            chartData.failedScenarios += row.failed_scenarios;
            chartData.passedFeatures += row.passed_features;
            chartData.skippedSteps += row.skipped_steps;
            chartData.passedSteps += row.passed_steps;
            chartData.failedSteps += row.failed_steps;
        });

        return chartData;
    } catch (error) {
        console.error("Error in getSummaryTableData:", error.message);
        throw error;
    }
}

module.exports = { getSummaryTableData };