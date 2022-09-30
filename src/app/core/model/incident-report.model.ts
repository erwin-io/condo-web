import { Tenant } from './tenant.model';

export class IncidentReport {
  date: Date;
  title: string;
  message: string;
  tenant: Tenant;
  incidentsReportId: string;
  incidentStatus: IncidentStatus;
}

export class IncidentStatus {
  incidentStatusId: string;
  name: string;
}
