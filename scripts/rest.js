const http = require('k6/http');

export const options = {
    setupTimeout: '10m',
    teardownTimeout: '10m',
    scenarios: {
        addObject_ramp_rate_sc: {
            exec: 'addObject',
            executor: 'ramping-arrival-rate',
            startRate: 5,
            timeUnit: '10s',
            preAllocatedVUs: 5,
            maxVus: 20,
            stages: [
                {target: 5, duration: '10s'},
                {target: 5, duration: '20s'},
                {target: 1, duration: '10s'},
            ],
        },
        getObject_ramp_vus_sc: {
            exec: 'getObjectById',
            startVUs: 0,
            executor: 'ramping-vus',
            stages: [
                {target: 5, duration: '10s',},
                {target: 5, duration: '30s',},
            ]
        },
    },
    ext: {
        loadimpact: {
            projectID: 123,
            name: 'Interview test',
            distribution: {},
        },
    },
};

const endpointUrl = 'https://api.restful-api.dev/objects';


export function addObject() {
    http.post(endpointUrl,
        JSON.stringify({
            "name": "Apple MacBook Pro 16",
            "data": {
                "year": 2019,
                "price": 1849.99,
                "CPU model": "Intel Core i9",
                "Hard disk size": "1 TB"
            }
        }),
        {
            headers: {
                'content-type': 'application/json',
                "Authorization": `Bearer dfdfdgth34`
            }
        });
}

export function getObjectById() {
    http.get(`${endpointUrl}/1`,
        {
            headers: {
                'content-type': 'application/json',
                "Authorization": `Bearer dfdfdgth34`
            }
        });
}
