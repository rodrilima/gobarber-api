import { Router } from 'express';

import ProvidersController from '../controllers/ProvidersController'
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController'
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController'
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

const providersController = new ProvidersController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();

const providersRouter = Router();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersController.index);
providersRouter.get('/:provider_id/month-availability', providerDayAvailabilityController.index);
providersRouter.get('/:provider_id/day-availability', providerMonthAvailabilityController.index);

export default providersRouter;
