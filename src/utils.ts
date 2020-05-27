import * as packageConfig from '../package.json';

export default 'utils module';

const { version: v, name: n } = packageConfig;
export const version = `${n} version: ${v}`;
