export interface Appointment{
    appointmentId: string;
    startTime: Date;
    endTime: Date;
    worker: string;
    userId: string;
    username: string;
    phone: string;
    email: string;
    counter: number;
    edited: number;
    cancelled: number;
    serviceId: string;
    serviceName: string;
    duration: number;
    price: number;
}