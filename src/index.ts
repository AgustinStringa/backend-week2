// const restify = require('restify');
import restify from "restify"
import RouteManager from './routes'
import {Router} from 'restify-router' //npm install restify-router

import logger from 'morgan';

const router = new Router()
const server = restify.createServer();
//agregando queryParser para tomar parametros en req.query
//req.query--> la url que se tipea
server.use(restify.plugins.queryParser());

//agregando body parser para agregar usuarios
server.use(restify.plugins.bodyParser({maxBodySize: 1000,}));

//agregando logger para registrar peticiones
server.use(logger('dev'));

router.add('/api/v1', RouteManager);
router.applyRoutes(server);

function respond(req, res, next) {
    res.send('holaa como estás? ' + req.params.name);
    //req.paras.name es el /:name de la ruta
    next();
}

server.get('/hello/:name', respond); 
server.head('/hello/:name', respond);
server.listen(process.env.PORT, function () {
    console.log('%s listening at %s', server.name, server.url);
    //console.log(server);
});