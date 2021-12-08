// const restify = require('restify');
import restify from "restify"
import RouteManager from './routes'
import {Router} from 'restify-router' //npm install restify-router

const router = new Router()
const server = restify.createServer();


router.add('api/v1', RouteManager);
router.applyRoutes(server);

function respond(req, res, next) {
    res.send('holaa como estás? ' + req.params.name);
    
    //req.paras.name es el /:name de la ruta
    next();
}

server.get('/hello/:name', respond); //antes estaba en server.get en lugar de router.get
server.head('/hello/:name', respond);//antes estaba en server.head en  lugar de router.head

server.listen(8080, function () {
    console.log('%s listening at %s', server.name, server.url);
    
    //console.log(server);
});