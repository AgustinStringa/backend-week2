import {Router} from 'restify-router'; //npm install restify-router
import ProfileRouter from './profile.route';

const RouteManager = new Router();
RouteManager.add('./profiles', ProfileRouter);
export default RouteManager;
