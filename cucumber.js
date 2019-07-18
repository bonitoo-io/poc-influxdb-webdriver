var common = '--require "step_definitions/**/*.js" --require-module babel-core/register ';

module.exports = {
    'default': common + '--format summary --format json:report/cucumber_report.json',
    dry: common + '--dry-run',
    progress: common + '--format progress'
};
