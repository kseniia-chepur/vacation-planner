export type TripPeriodType = 'month' | 'dateRange';

export interface Trip {
  _id: string;
  destination: string;
  name?: string;
  notes?: string;
  periodType?: TripPeriodType;
  month?: number;
  year?: number;
  startDate?: string;
  endDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTripRequest {
  destination: string;
  name?: string;
  notes?: string;
  periodType?: TripPeriodType;
  month?: number;
  year?: number;
  startDate?: string;
  endDate?: string;
}

export type UpdateTripRequest = Partial<CreateTripRequest>;
