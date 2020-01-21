// tslint:disable-next-line: no-reference
/// <reference path='./node_modules/cypress/types/cypress-npm-api.d.ts'/>
import * as CypressNpmApi from 'cypress';
import { slackRunner } from 'cypress-slack-reporter/bin/slack/slack-alert';
// tslint:disable: no-var-requires
const marge = require('mochawesome-report-generator');
const { merge } = require('mochawesome-merge');
// tslint:disable: no-var-requires

CypressNpmApi.run({
    reporter: 'cypress-multi-reporters',
    reporterOptions: {
        reporterEnabled: 'mocha-junit-reporters, mochawesome',
        mochaJunitReportersReporterOptions: {
            mochaFile: 'cypress/reports/junit/test_results[hash].xml',
            toConsole: false,
        },
        mochawesomeReporterOptions: {
            reportDir: 'cypress/reports/mocha',
            quiet: true,
            overwrite: true,
            html: false,
            json: true,
        },
    },
})
    .then(async () => {
        const generatedReport = await Promise.resolve(generateReport({
            reportDir: 'cypress/reports/mocha',
            inline: true,
            saveJson: true,
        }));
        // tslint:disable-next-line: no-console
        console.log('Merged report available here:-', generatedReport);
        return generatedReport;
    })
    .then(() => {
        const base = process.env.PWD || '.';
        const program: any = {
            ciProvider: 'bitbucket',
            videoDir: `${base}/cypress/videos`,
            vcsProvider: 'bitbucket',
            screenshotDir: `${base}/cypress/screenshots`,
            verbose: true,
            reportDir: `${base}/cypress/reports/mocha`,
        };
        const ciProvider: string = program.ciProvider;
        const vcsProvider: string = program.vcsProvider;
        const reportDirectory: string = program.reportDir;
        const videoDirectory: string = program.videoDir;
        const screenshotDirectory: string = program.screenshotDir;
        const verbose: boolean = program.verbose;
        // tslint:disable-next-line: no-console
        console.log('Constructing Slack message with the following options', {
            ciProvider,
            vcsProvider,
            reportDirectory,
            videoDirectory,
            screenshotDirectory,
            verbose,
        });
        const slack = slackRunner(
            ciProvider,
            vcsProvider,
            reportDirectory,
            videoDirectory,
            screenshotDirectory,
            verbose,
        );
        // tslint:disable-next-line: no-console
        console.log('Finished slack upload');

    })
    .catch((err: any) => {
        // tslint:disable-next-line: no-console
        console.log(err);
    });

function generateReport(options: any) {
    return merge(options).then((report: any) =>
        marge.create(report, options),
    );
}