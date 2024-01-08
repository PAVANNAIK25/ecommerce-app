import winston from 'winston';
import fs from 'fs';

const fsPromise = fs.promises;

// async function log (data) {
//     const logData = `\n ${new Date().toString()} - ${data}`;

//     try{
//         await fsPromise.appendFile('log.txt', logData)
//     }catch(error){
//         console.log(error);
//     }
// }

const logger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    defaultMeta: {service: 'request Logging'},
    transports:[new winston.transports.File({filename: 'logs.txt', level: 'info'})]
})

const loggerMiddleware = async (req, res, next)=>{

    const logData = `Log Url: ${req.url} - Log Data: ${JSON.stringify(req.body)}`;
    logger.info(logData);
    next();
}

export default loggerMiddleware;