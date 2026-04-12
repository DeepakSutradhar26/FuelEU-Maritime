import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import routeRoutes from '../../adapters/inbound/http/routes/routeRoutes';
import complianceRoutes from '../../adapters/inbound/http/routes/complianceRoutes';
import bankingRoutes from '../../adapters/inbound/http/routes/bankingRoutes';
import poolingRoutes from '../../adapters/inbound/http/routes/poolingRoutes';

const app: Application = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'FuelEU API running' });
});

app.use('/routes', routeRoutes);
app.use('/compliance', complianceRoutes);
app.use('/banking', bankingRoutes);
app.use('/pools', poolingRoutes);

export default app;