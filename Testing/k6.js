import http from 'k6/http';
// import { Trend } from 'k6/metrics';

// const myTrend = new Trend('waiting_time');

export const options = {
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 100,
      timeUnit: '1s', // 1000 iterations per second, i.e. 1000 RPS
      duration: '300s',
      preAllocatedVUs: 200, // how large the initial pool of VUs would be
      maxVUs: 200, // if the preAllocatedVUs are not enough, we can initialize more
    },
  },
};

export default function () {
  const BASE_URL = "http://localhost:3033"; // make sure this is not production
  const req1 = {
    method: 'GET',
    url: `${BASE_URL}/products/1000/styles`,
  };
  const req2 = {
    method: 'GET',
    url: `${BASE_URL}/products/100000/styles`,
  };
  const req3 = {
    method: 'GET',
    url: `${BASE_URL}/products/1000000/styles`,
  };

  const req4 = {
      method: 'GET',
      url: `${BASE_URL}/products/190000/styles`,
    };


  var payload5 = JSON.stringify({
    sku_id: 1,
  });
  const headers = { 'Content-Type': 'application/json' };
  const req5 = http.post(`${BASE_URL}/add_cart`, payload5, { headers });


  var payload6 = JSON.stringify({
    sku_id: 2,
  });
  const req6 = http.post(`${BASE_URL}/add_cart`, payload6, { headers });


  var payload7 = JSON.stringify({
    sku_id: 4,
  });
  const req7 = http.post(`${BASE_URL}/add_cart`, payload7, { headers });


  var payload8 = JSON.stringify({
    sku_id: 5,
  });
  const req8 = http.post(`${BASE_URL}/add_cart`, payload8, { headers });


  //const responses = http.batch([req1, req2, req3]);
  //const responses = http.batch([req4, req5, req6]);
  const responses = http.batch([req5, req6, req7, req8]);


}