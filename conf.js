exports.config = {
	framework: 'jasmine',
	capabilities: {
		browserName: 'chrome',
	},
	
	suites: {
		websiteIsUp: ['tests/website-is-up.js'],
		documentation: ['tests/go-to-documentation.js'],
		all: ['tests/website-is-up.js', 'tests/go-to-documentation.js']
	},
	onPrepare: function(){
		const SpecReporter = require('jasmine-spec-reporter').SpecReporter;
		jasmine.getEnv().addReporter(new SpecReporter({
			spec: {
				displayStacktrace: 'pretty',
				displayFailuresSummary: true,
				displayFailuredSpec: true,
				displaySuiteNumber: true,
				displaySpecDuration: true
			}
		}));
		//configure junit xml report
		var jasmineReporters = require('jasmine-reporters');
		jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
					consolidateAll: true,
					filePrefix: 'guitest-xmloutput',
					savePath: '.'
		}));
		var AllureReporter = require('jasmine-allure-reporter');
		jasmine.getEnv().addReporter(new AllureReporter());
		jasmine.getEnv().afterEach(function(done){
			browser.takeScreenshot().then(function (png) {
				allure.createAttachment('Screenshot', function () {
					return new Buffer(png, 'base64')
				}, 'image/png')();
				done();
			})
		});
	},
	onComplete: function() {
		var browserName, browserVersion;
		var capsPromise = browser.getCapabilities();
   		capsPromise.then(function (caps) {
			browserName = caps.get('browserName');
			browserVersion = caps.get('version');
			platform = caps.get('platform');
   			var HTMLReport = require('protractor-html-reporter-2');
			testConfig = {
				reportTitle: 'Protractor Test Execution Report',
				outputPath: './',
				outputFilename: 'ProtractorTestReport',
				screenshotPath: './screenshots',
				testBrowser: browserName,
				browserVersion: browserVersion,
				modifiedSuiteName: false,
				screenshotsOnlyOnFailure: true,
				testPlatform: platform
			};
			new HTMLReport().from('guitest-xmloutput.xml', testConfig);
		});
	},
	// Options to be passed to Jasmine-node.
	jasmineNodeOpts: {
		showColors: true, // Use colors in the command line report.
	},
};