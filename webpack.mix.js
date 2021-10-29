const path = require('path')
const fs = require('fs')
const mix = require('laravel-mix')

const PUB = 'public/local/templates/.default';

const ENTRY_JS = 'script.js';
const ENTRY_SASS = 'style.scss';

const bundles = {
    'assets/components/bitrix/form.result.new/ajax/': PUB + '/components/bitrix/form.result.new/ajax/',
    'assets/components/bitrix/system.auth.form/.default/': PUB + '/components/bitrix/system.auth.form/.default/',
}

let pipe = mix
    // sets public path for manifest
    .setPublicPath(PUB)

for (const [sourceDir, destDir] of Object.entries(bundles))
{
    const jsSource = sourceDir + ENTRY_JS
    if (fs.existsSync(jsSource)) {
        pipe = mix.inProduction()
            ? pipe.minify(destDir + ENTRY_JS)
            : pipe.js(jsSource, destDir)
    }

    const sassSource = sourceDir + ENTRY_SASS
    if (fs.existsSync(sassSource)) {
        pipe = mix.inProduction()
            ? pipe.minify(destDir + ENTRY_SASS.replace(/\.[^/.]+$/, 'css'))
            : pipe.sass(sassSource, destDir)
    }
}
