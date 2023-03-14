import { Client } from '@jdiamond/mqtt-browser';
import { writable } from 'svelte/store';

// constant variables
const BROKER_URL = 'wss://test.mosquitto.org:8081';

const TOPIC_PREFIX = 'c83929b2-c031-11ed-afa1-0242ac120002';
const TOPIC_INFO_LIDAR = `${TOPIC_PREFIX}/info/lidar`;
const TOPIC_INFO_GPS = `${TOPIC_PREFIX}/info/gps`;
const TOPIC_INFO_MOTOR = `${TOPIC_PREFIX}/info/motor`;
const TOPIC_INFO_GYRO = `${TOPIC_PREFIX}/info/gyro`;
const TOPIC_CONTROL = `${TOPIC_PREFIX}/control`;
const TOPIC_CONNECT_READY = `${TOPIC_PREFIX}/connection/ready`;

export const client = new Client({ url: BROKER_URL });

// Data interface
interface LidarData {
	front: number;
	back: number;
	left: number;
	right: number;
}

interface GpsData {
	latitude: number;
	longitude: number;
}

interface MotorData {
	leftSpeed: number;
	rightSpeed: number;
}

interface GyroData {
	xAxis: number;
	yAxis: number;
	zAxis: number;
	accel: number;
}

export const setupClient = async () => {
	await client.connect();
	// subscriptions
	console.info(`Connected to MQTT Broker at ${BROKER_URL} successfully`);
	client.subscribe(TOPIC_INFO_LIDAR);
	client.subscribe(TOPIC_INFO_GPS);
	client.subscribe(TOPIC_INFO_MOTOR);
	client.subscribe(TOPIC_INFO_GYRO);
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
			case TOPIC_INFO_GPS:
				update((curr) => {
					curr.gps = JSON.parse(msg);
					return curr;
				});
				break;
			case TOPIC_INFO_GYRO:
				update((curr) => {
					curr.gyro = JSON.parse(msg);
					return curr;
				});
				break;
			case TOPIC_INFO_LIDAR:
				update((curr) => {
					curr.lidar = JSON.parse(msg);
					return curr;
				});
				break;
			case TOPIC_INFO_MOTOR:
				update((curr) => {
					curr.motor = JSON.parse(msg);
					return curr;
				});
				break;
			case TOPIC_CONNECT_READY:
				update((curr) => {
					curr.connected = JSON.parse(msg).connected;
					return curr;
				});
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

let defaultData = {
	connected: true
	lidar: <LidarData>{
		front: 0,
		back: 0,
		left: 0,
		right: 0
	},
	gps: <GpsData>{
		latitude: 0,
		longitude: 0
	},
	motor: <MotorData>{
		leftSpeed: 0,
		rightSpeed: 0
	},
	gyro: <GyroData>{
		xAxis: 0,
		yAxis: 0,
		zAxis: 0,
		accel: 0
	}
};

const { set, update, subscribe } = writable(defaultData);

export const data = { subscribe };

export const Constants = {
	BROKER_URL,
	TOPIC_PREFIX,
	TOPIC_INFO_GPS,
	TOPIC_INFO_GYRO,
	TOPIC_INFO_LIDAR,
	TOPIC_INFO_MOTOR,
	TOPIC_CONTROL,
	TOPIC_CONNECT_READY
};
