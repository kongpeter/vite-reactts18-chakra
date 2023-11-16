export type Shipment = {
  // Shipment id.
  id: string;

  // Tracking code, used to get tracking information.
  trackingId: string;

  // Status of shipment.
  status: string;

  // Styling indicator for status.
  statusSeverity: string;

  // Time of delivery in ISO format.
  deliveredTime: string;

  // Date of last update in ISO format.
  lastUpdate: string;

  // Address the shipment is being delivered to.
  deliveryAddress: string;

  // Descriptive amount of time in transit.
  totalTransit: string;
};

export type TrackingEvent = {
  // Shipment id.
  id: string;

  // Tracking code, used to get tracking information.
  trackingId: string;

  // Status of shipment.
  status: string;

  // Styling indicator for status.
  statusSeverity: string;

  // Time of delivery in ISO format.
  timestamp: string;

  // Address the shipment is being delivered to.
  location: string;
};

export type Query = {
  shipments: [Shipment];
  trackingEvents(trackingId: string): [TrackingEvent];
};
