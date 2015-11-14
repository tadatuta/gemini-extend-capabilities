var fs = require('fs'),
    yaml = require('yamljs'),
    env = process.env,
    geminiConfFile = env.GEMINI_CONFIG_FILE || '.gemini.yml',
    geminiConf = yaml.parse(fs.readFileSync(geminiConfFile, 'utf8')),
    browsers = geminiConf.browsers;

Object.keys(browsers).forEach(function(browserName) {
    var browser = browsers[browserName],
        desiredCapabilities = browser.desiredCapabilities;

    if (!desiredCapabilities) {
        desiredCapabilities = browser.desiredCapabilities = {};
    };

    desiredCapabilities['tunnel-identifier'] = env.TRAVIS_JOB_NUMBER;
    desiredCapabilities.build = env.TRAVIS_JOB_NUMBER;
    desiredCapabilities.tags = ['CI'];
});

fs.writeFileSync(geminiConfFile, yaml.stringify(geminiConf));
