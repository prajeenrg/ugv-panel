import { Client } from '@jdiamond/mqtt-browser';
import { writable } from 'svelte/store';

// constant variables
const BROKER_URL = 'wss://test.mosquitto.org:8081';

const TOPIC_PREFIX = 'c83929b2-c031-11ed-afa1-0242ac120002';
const TOPIC_INFO_LIDAR = `${TOPIC_PREFIX}/info/lidar`;
const TOPIC_INFO_GPS = `${TOPIC_PREFIX}/info/gps`;
const TOPIC_INFO_MOTOR = `${TOPIC_PREFIX}/info/motor`;
const TOPIC_INFO_GYRO = `${TOPIC_PREFIX}/info/gyro`;
const TOPIC_INFO_ACCEL = `${TOPIC_PREFIX}/info/accel`;
const TOPIC_INFO_NETWORK = `${TOPIC_PREFIX}/info/network`;
const TOPIC_CONTROL = `${TOPIC_PREFIX}/control`;
const TOPIC_CONNECT_READY = `${TOPIC_PREFIX}/connection`;

export const client = new Client({ url: BROKER_URL });

// Data types
type LidarData = {
	front: number;
	back: number;
	left: number;
	right: number;
};

type GpsData = {
	latitude: number;
	longitude: number;
};

type MotorData = {
	leftSpeed: number;
	rightSpeed: number;
};

type GyroData = {
	gyroX: number;
	gyroY: number;
	gyroZ: number;
};

type AccelData = {
	accelX: number;
	accelY: number;
	accelZ: number;
};

type NetworkData = {
	strength: number;
	operator: string;
	localIP: string;
	voltage: number;
};

export const setupClient = async () => {
	await client.connect();
	// subscriptions
	console.info(`Connected to MQTT Broker at ${BROKER_URL} successfully`);
	client.subscribe(TOPIC_INFO_LIDAR);
	client.subscribe(TOPIC_INFO_GPS);
	client.subscribe(TOPIC_INFO_MOTOR);
	client.subscribe(TOPIC_INFO_GYRO);
	client.subscribe(TOPIC_INFO_ACCEL);
	client.subscribe(TOPIC_CONNECT_READY);
	console.info('Subscribed to topics successfully');
	// handle messages
	client.on('message', handleMessages);
};

const handleMessages = (topic: string, message: any) => {
	let msg = String.fromCharCode(...message);
	console.log(`Received ${msg} on topic ${topic}`);
	try {
		switch (topic) {
			case TOPIC_INFO_ACCEL:
				accel.update(() => JSON.parse(msg));
				break;
			case TOPIC_INFO_GPS:
				gps.update(() => JSON.parse(msg));
				break;
			case TOPIC_INFO_GYRO:
				gyro.update(() => JSON.parse(msg));
				break;
			case TOPIC_INFO_LIDAR:
				lidar.update(() => JSON.parse(msg));
				break;
			case TOPIC_INFO_MOTOR:
				motor.update(() => JSON.parse(msg));
				break;
			case TOPIC_INFO_NETWORK:
				network.update(() => JSON.parse(msg));
				break;
			case TOPIC_CONNECT_READY:
				connection.update(() => JSON.parse(msg));
				break;
			default:
				console.info('Unknown topic...');
		}
	} catch (e) {
		console.error(`Error while parsing JSON for topic ${topic}`);
	}
};

export const disconnectClient = async () => {
	if (client.connectionState === 'connected') {
		await client.disconnect();
	}
	console.info('Disconnected from MQTT Broker');
};

export const connection = writable(false);

export const accel = writable(<AccelData>{
	accelX: 0,
	accelY: 0,
	accelZ: 0
});

export const gyro = writable(<GyroData>{
	gyroX: 0,
	gyroY: 0,
	gyroZ: 0
});

export const gps = writable(<GpsData>{
	latitude: 0,
	longitude: 0
});

export const motor = writable(<MotorData>{
	leftSpeed: 0,
	rightSpeed: 0
});

export const lidar = writable(<LidarData>{
	front: 0,
	back: 0,
	left: 0,
	right: 0
});

export const network = writable(<NetworkData>{
	strength: 0,
	operator: '-',
	localIP: '-',
	voltage: 0
});

export const Constants = {
	BROKER_URL,
	TOPIC_PREFIX,
	TOPIC_INFO_GPS,
	TOPIC_INFO_GYRO,
	TOPIC_INFO_ACCEL,
	TOPIC_INFO_LIDAR,
	TOPIC_INFO_MOTOR,
	TOPIC_CONTROL,
	TOPIC_CONNECT_READY
};
