const db = require('../database/db.js');

const upsertData = async (data) => {
    try {
        const {
            source,
            date,
            chartData: {
                warningSteps, totalFeatures, failedFeatures, totalScenarios,
                passedScenarios, totalSteps, infoSteps, failedScenarios,
                passedFeatures, skippedSteps, passedSteps, failedSteps
            }
        } = data;

        const query = `
            INSERT INTO teams_data (
                source, date, warning_steps, total_features, failed_features,
                total_scenarios, passed_scenarios, total_steps, info_steps,
                failed_scenarios, passed_features, skipped_steps, passed_steps, failed_steps
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
                warning_steps = VALUES(warning_steps),
                total_features = VALUES(total_features),
                failed_features = VALUES(failed_features),
                total_scenarios = VALUES(total_scenarios),
                passed_scenarios = VALUES(passed_scenarios),
                total_steps = VALUES(total_steps),
                info_steps = VALUES(info_steps),
                failed_scenarios = VALUES(failed_scenarios),
                passed_features = VALUES(passed_features),
                skipped_steps = VALUES(skipped_steps),
                passed_steps = VALUES(passed_steps),
                failed_steps = VALUES(failed_steps)
        `;

        const values = [
            source, date, warningSteps, totalFeatures, failedFeatures,
            totalScenarios, passedScenarios, totalSteps, infoSteps,
            failedScenarios, passedFeatures, skippedSteps, passedSteps, failedSteps,
        ];

        const result = await db.query(query, values);
        console.log("Upsert completed:", result);
        return result;
    } catch (error) {
        console.error("Error in upsertData:", error.message);
        throw error;
    }
};

module.exports = { upsertData };