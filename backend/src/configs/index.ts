import databaseConfig from './database.json';
interface IDatabaseConfig{
    username:string;
    password:string;
    database:string;
    host:string;
    dialect:'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql';
    timezone:string
}
const configs = {
    development: {
        server: {
            host: 'localhost',
            port: 8080
        },
        database:databaseConfig.development as IDatabaseConfig,
        jwt:{
            privateKey:'wym'
        },
        storage:{
            prefix:'/public/attachment'
        }
    },
    
    test: {
        server: {
            host: 'localhost',
            port: 8080
        },
        database:databaseConfig.development as IDatabaseConfig,
        jwt:{
            privateKey:'wym'
        },
        storage:{
            prefix:'/public/attachment'
        }
    },
    production: {
        server: {
            host: 'localhost',
            port: 8080
        },
        database:databaseConfig.development as IDatabaseConfig,
        jwt:{
            privateKey:'wym'
        },
        storage:{
            prefix:'/public/attachment'
        }
    }
}

type configs = typeof configs;
type configKeys = keyof configs;

const NODE_ENV = process.env.NODE_ENV as configKeys || 'development';

export default configs[NODE_ENV];