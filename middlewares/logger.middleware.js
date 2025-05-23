import { loggerService } from "../services/logger.service.js"

export function log(req, res, next) {

    loggerService.info('Got request : ' + req._parsedOriginalUrl.pathname)
    next()
}