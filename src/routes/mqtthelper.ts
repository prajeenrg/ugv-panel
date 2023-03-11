import { connect, MqttClient } from "mqtt";

// constant variables
const BROKER_URL = "ws://broker.emqx.io:8083/mqtt";
const TOPIC_PREFIX = "c83929b2-c031-11ed-afa1-0242ac120002";

const TOPIC_INFO_LIDAR_FRONT = "info/lidar/front";
const TOPIC_INFO_LIDAR_BACK = "info/lidar/back";
const TOPIC_INFO_LIDAR_LEFT = "info/lidar/left";
const TOPIC_INFO_LIDAR_RIGHT = "info/lidar/right";

const TOPIC_INFO_GPS = "info/gps";

const TOPIC_INFO_MOTOR_LEFT = "info/motor/left";
const TOPIC_INFO_MOTOR_RIGHT = "info/motor/right";

const TOPIC_INFO_GYRO_X = "info/gyro/x";
const TOPIC_INFO_GYRO_Y = "info/gyro/y";
const TOPIC_INFO_GYRO_Z = "info/gyro/z";
const TOPIC_INFO_GYRO_ACCEL = "info/gyro/accel";

let client: MqttClient = connect(BROKER_URL);

// Data interface
interface UgvData {
    lidar: LidarData
    gps: GpsData
    motor: MotorData
    gyro: GyroData
}

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

const setupClient = () => {
    client = connect(BROKER_URL);
    // subscriptions
    client.on("connect", () => {
        console.info(`Connected to MQTT Broker at ${BROKER_URL} successfully`);
        client.subscribe(`${TOPIC_PREFIX}/${TOPIC_INFO_LIDAR_FRONT}`);
        client.subscribe(`${TOPIC_PREFIX}/${TOPIC_INFO_LIDAR_BACK}`);
        client.subscribe(`${TOPIC_PREFIX}/${TOPIC_INFO_LIDAR_LEFT}`);
        client.subscribe(`${TOPIC_PREFIX}/${TOPIC_INFO_LIDAR_RIGHT}`);
        client.subscribe(`${TOPIC_PREFIX}/${TOPIC_INFO_GPS}`);
        client.subscribe(`${TOPIC_PREFIX}/${TOPIC_INFO_MOTOR_LEFT}`);
        client.subscribe(`${TOPIC_PREFIX}/${TOPIC_INFO_MOTOR_RIGHT}`);
        client.subscribe(`${TOPIC_PREFIX}/${TOPIC_INFO_GYRO_X}`);
        client.subscribe(`${TOPIC_PREFIX}/${TOPIC_INFO_GYRO_Y}`);
        client.subscribe(`${TOPIC_PREFIX}/${TOPIC_INFO_GYRO_Z}`);
        client.subscribe(`${TOPIC_PREFIX}/${TOPIC_INFO_GYRO_ACCEL}`);
        console.info("Subscribed to topics successfully");
    });
    // message handler
    client.on("message", (topic, message) => {
        console.info(topic, String.fromCharCode(...message));
        if (topic.includes(TOPIC_INFO_GPS)) {
            console.log("matched");
            data.gps.coordinates = parseInt(message.toString());
        }
    });
};

let data: UgvData = {
    lidar: {
        front: 0,
        back: 0,
        left: 0,
        right: 0
    },
    gps: {
        coordinates: 0
    },
    motor: {
        leftSpeed: 0,
        rightSpeed: 0
    },
    gyro: {
        xAxis: 0,
        yAxis: 0,
        zAxis: 0,
        accel: 0
    }
};

const publish = (topic: string, message: any) => client.publish(`${TOPIC_PREFIX}/${topic}`, message);

export default { client, data, setupClient, publish };