import { Client } from '@jdiamond/mqtt-browser';
import { writable, get } from 'svelte/store';

// constant variables
const BROKER_URL = 'wss://test.mosquitto.org:8081';

const TOPIC_PREFIX = 'c83929b2-c031-11ed-afa1-0242ac120002';
const TOPIC_INFO_LIDAR = `${TOPIC_PREFIX}/info/lidar`;
const TOPIC_INFO_GPS = `${TOPIC_PREFIX}/info/gps`;
const TOPIC_INFO_GYRO = `${TOPIC_PREFIX}/info/gyro`;
const TOPIC_INFO_ACCEL = `${TOPIC_PREFIX}/info/accel`;
const TOPIC_INFO_NETWORK = `${TOPIC_PREFIX}/info/network`;
const TOPIC_INFO_DHT = `${TOPIC_PREFIX}/info/dht`;
const TOPIC_CONTROL = `${TOPIC_PREFIX}/control`;
const TOPIC_CONNECT_READY = `${TOPIC_PREFIX}/connection/status`;
const TOPIC_PING = `${TOPIC_PREFIX}/connection/ping`;

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

type GyroData = {
	x: number;
	y: number;
	z: number;
};

type AccelData = {
	x: number;
	y: number;
	z: number;
};

type DhtData = {
	temperature: number;
	humidity: number;
};

type NetworkData = {
	strength: number;
	operator: string;
	ipaddr: string;
	imei: string;
};

type VelocityData = {
	x: number;
	y: number;
	z: number;
};

type AngleData = {
	x: number;
	y: number;
	z: number;
}

const gyroTime = writable(0);
const accelTime = writable(0);

export const setupClient = async () => {
	await client.connect();
	// subscriptions
	console.info(`Connected to MQTT Broker at ${BROKER_URL} successfully`);
	client.subscribe(TOPIC_INFO_LIDAR);
	client.subscribe(TOPIC_INFO_GPS);
	client.subscribe(TOPIC_INFO_GYRO);
	client.subscribe(TOPIC_INFO_ACCEL);
	client.subscribe(TOPIC_INFO_DHT);
	client.subscribe(TOPIC_CONNECT_READY);
	console.info('Subscribed to topics successfully');
	// handle messages
	client.on('message', handleMessages);
};

const handleMessages = (topic: string, message: any) => {
	const curr = Date.now();
	let delta: number;
	let msg = String.fromCharCode(...message);
	console.log(`Received ${msg} on topic ${topic}`);
	try {
		switch (topic) {
			case TOPIC_INFO_ACCEL:
				accel.update(() => {
					let c = JSON.parse(msg);
					return <AccelData>{
						x: c.accelX * 981,
						y: c.accelY * 981,
						z: c.accelZ * 981
					};
				});
				if (get(accelTime) == 0) {
					accelTime.update(() => curr);
					return;
				}
				delta = (curr - get(accelTime)) / 1000;
				let currAccel = get(accel);
				velocity.update(() => <VelocityData>{
					x: (currAccel.x * delta),
					y: (currAccel.y * delta),
					z: (currAccel.z * delta)
				});
				break;
			case TOPIC_INFO_GPS:
				gps.update(() => JSON.parse(msg));
				break;
			case TOPIC_INFO_GYRO:
				gyro.update(() => {
					let c = JSON.parse(msg);
					return <GyroData>{
						x: c.gyroX,
						y: c.gyroY,
						z: c.gyroZ
					};
				});
				if (get(gyroTime) == 0) {
					gyroTime.update(() => curr);
					return;
				}
				delta = (curr - get(gyroTime)) / 1000;
				let currGyro = get(gyro);
				angle.update(data => <AngleData>{
					x: (data.x + (delta * currGyro.x)),
					y: (data.y + (delta * currGyro.y)),
					z: (data.z + (delta * currGyro.z))
				});
				break;
			case TOPIC_INFO_LIDAR:
				lidar.update(() => JSON.parse(msg));
				break;
			case TOPIC_INFO_NETWORK:
				network.update(() => JSON.parse(msg));
				break;
			case TOPIC_INFO_DHT:
				dht.update(() => JSON.parse(msg));
			case TOPIC_CONNECT_READY:
				status.update(() => msg);
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

export const status = writable("");

export const accel = writable(<AccelData>{
	x: 0,
	y: 0,
	z: 0
});

export const gyro = writable(<GyroData>{
	x: 0,
	y: 0,
	z: 0
});

export const gps = writable(<GpsData>{
	latitude: 0,
	longitude: 0
});

export const lidar = writable(<LidarData>{
	front: 0,
	back: 0,
	left: 0,
	right: 0
});

export const dht = writable(<DhtData>{
	temperature: 0,
	humidity: 0
});

export const network = writable(<NetworkData>{
	strength: 0,
	operator: '-',
	ipaddr: '-',
	imei: '-'
});

export const velocity = writable(<VelocityData>{
	x: 0,
	y: 0,
	z: 0
});

export const angle = writable(<AngleData>{
	x: 0,
	y: 0,
	z: 0
});

export const Constants = {
	BROKER_URL,
	TOPIC_PREFIX,
	TOPIC_INFO_GPS,
	TOPIC_INFO_GYRO,
	TOPIC_INFO_ACCEL,
	TOPIC_INFO_LIDAR,
	TOPIC_INFO_DHT,
	TOPIC_PING,
	TOPIC_CONTROL,
	TOPIC_CONNECT_READY
};
