const START_USER_ARGS_INDEX = 2;
const ARGS_PREFIX = '--';
const ARGS_SEPARATOR = ', ';

const parceArgPair = (key, value) => `${key} is ${value}`;

const parseArgs = () => {
    const args = process.argv;

    let parcedArgs = [];

    for (let i = START_USER_ARGS_INDEX; i < args.length; i += 2) {
        const key = args[i].replace(ARGS_PREFIX, '');
        const value = args[i + 1];

        const parcedArgPair = parceArgPair(key, value);

        parcedArgs.push(parcedArgPair);
    }

    process.stdout.write(parcedArgs.join(ARGS_SEPARATOR));
};

parseArgs();