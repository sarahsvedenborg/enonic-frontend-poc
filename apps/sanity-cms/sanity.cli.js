// sanity.cli.js
import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
    api: {
        projectId: 'mtewzn7e', // replace value with your own
        dataset: 'production', // replace value with your own
    },
    project: {
        basePath: '/studio',
    },
    studioHost: 'rk-poc'
    /*   mediaLibrary: {
      
        aspectsPath: 'aspects',
      }, */
});
