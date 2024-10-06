const RSS_PREFIX = 'RSS_';
const VARS_SEPARATOR = '=';
const PAIR_SEPARATOR = ', ';

const parseEnv = () => {
    const parsedVars = Object
        .entries(process.env)
        .filter(([key, value]) => key.startsWith(RSS_PREFIX))
        .map(item => item.join(VARS_SEPARATOR))
        .join(PAIR_SEPARATOR);

    process.stdout.write(parsedVars);
};

parseEnv();