/**
 * Countries GraphQL API
 * https://studio.apollographql.com/public/countries
 */
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    setupTimeout: '10m',
    teardownTimeout: '10m',
    scenarios: {
        fetchCountryByCode: {
            exec: 'fetchCountryByCode',
            executor: 'shared-iterations',
            vus: 1,
            iterations: 1,
            maxDuration: '30s',
        },
    },
    ext: {
        loadimpact: {
            projectID: 2,
            name: 'Interview test',
            distribution: {},
        },
    },
};

const endpointUrl = 'https://countries.trevorblades.com/graphql';

export function fetchCountryByCode() {
    const res = http.post(endpointUrl,
        JSON.stringify({
            'query': 'query Query{country(code:"US"){name native capital emoji currency languages{code name}}}',
        }),
        {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Basic dGVzdDp0ZXN0`
            }
        });
    check(res, { 'status was 200': (r) => r.status == 200 });
    sleep(1);
}
