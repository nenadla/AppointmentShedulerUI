export interface UpdateAppointmentRequest{
    userId: string;
    serviceId: string;
    startTime: Date;
    duration: number;
    worker: string;
}