import { Client } from "@jdiamond/mqtt-browser";
import { writable } from "svelte/store";

// constant variables
const BROKER_URL = "wss://test.mosquitto.org:8081";
const TOPIC_PREFIX = "c83929b2-c031-11ed-afa1-0242ac120002";

const TOPIC_INFO_LIDAR_FRONT = `${TOPIC_PREFIX}/info/lidar/front`;
const TOPIC_INFO_LIDAR_BACK = `${TOPIC_PREFIX}/info/lidar/back`;
const TOPIC_INFO_LIDAR_LEFT = `${TOPIC_PREFIX}/info/lidar/left`;
const TOPIC_INFO_LIDAR_RIGHT = `${TOPIC_PREFIX}/info/lidar/right`;

const TOPIC_INFO_GPS = `${TOPIC_PREFIX}/info/gps`;

const TOPIC_INFO_MOTOR_LEFT = `${TOPIC_PREFIX}/info/motor/left`;
const TOPIC_INFO_MOTOR_RIGHT = `${TOPIC_PREFIX}info/motor/right`;

const TOPIC_INFO_GYRO_X = `${TOPIC_PREFIX}/info/gyro/x`;
const TOPIC_INFO_GYRO_Y = `${TOPIC_PREFIX}/info/gyro/y`;
const TOPIC_INFO_GYRO_Z = `${TOPIC_PREFIX}/info/gyro/z`;
const TOPIC_INFO_GYRO_ACCEL = `${TOPIC_PREFIX}/info/gyro/accel`;

export const client = new Client({ url: BROKER_URL });

// Data interface
interface LidarData {
    front: number
    back: number
    left: number
    right: number
}

interface GpsData {
    coordinates: number
}

interface MotorData {
    leftSpeed: number
    rightSpeed: number
}

interface GyroData {
    xAxis: number
    yAxis: number
    zAxis: number
    accel: number
}

export const setupClient = async () => {
    await client.connect();
    console.info("Connected to MQTT Broker successfully");
    // subscriptions
    console.info(`Connected to MQTT Broker at ${BROKER_URL} successfully`);
    client.subscribe(TOPIC_INFO_LIDAR_FRONT);
    client.subscribe(TOPIC_INFO_LIDAR_BACK);
    client.subscribe(TOPIC_INFO_LIDAR_LEFT);
    client.subscribe(TOPIC_INFO_LIDAR_RIGHT);
    client.subscribe(TOPIC_INFO_GPS);
    client.subscribe(TOPIC_INFO_MOTOR_LEFT);
    client.subscribe(TOPIC_INFO_MOTOR_RIGHT);
    client.subscribe(TOPIC_INFO_GYRO_X);
    client.subscribe(TOPIC_INFO_GYRO_Y);
    client.subscribe(TOPIC_INFO_GYRO_Z);
    client.subscribe(TOPIC_INFO_GYRO_ACCEL);
    console.info("Subscribed to topics successfully");
    // handle messages
    client.on("message", (topic: string, message: any) => {
        console.log(`Received message on topic ${topic}`);
        let msg = String.fromCharCode(...message);
        switch (topic) {
            case TOPIC_INFO_GPS:
                update(curr => {
                    curr.gps.coordinates = parseInt(msg);
                    return curr;
                });
                break;
            default:
                console.info("Unknown topic...");
        }
    })
};

export const disconnectClient = async () => {
    if (client.connectionState === "connected") {
        await client.disconnect();
    }
    console.info("Disconnected from MQTT Broker");
};

let defaultData = {
    lidar: <LidarData> {
        front: 0,
        back: 0,
        left: 0,
        right: 0
    },
    gps: <GpsData> {
        coordinates: 0
    },
    motor: <MotorData> {
        leftSpeed: 0,
        rightSpeed: 0
    },
    gyro: <GyroData> {
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
    TOPIC_INFO_GYRO_ACCEL,
    TOPIC_INFO_GYRO_X,
    TOPIC_INFO_GYRO_Y,
    TOPIC_INFO_GYRO_Z
};