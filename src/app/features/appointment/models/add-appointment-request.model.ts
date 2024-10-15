export interface AddAppointmentRequest{
    startTime: Date;
    duration: number;
    worker: string;
    serviceId: string;
    userId: string;
}